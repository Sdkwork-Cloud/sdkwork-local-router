import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import {
  frameworkPackageName,
  resolveFrameworkSourcePathForSubpath,
} from '../build/package-contract';
import {
  collectFrameworkCodeSnippets,
  getGovernedDocumentationPaths,
} from './test-support/docs-governance';

const documentedFiles = getGovernedDocumentationPaths({ typecheckPackageSnippets: true });

function getCompilerOptions() {
  const tsConfigPath = ts.findConfigFile(process.cwd(), ts.sys.fileExists, 'tsconfig.json');

  if (!tsConfigPath) {
    throw new Error('Unable to locate tsconfig.json for docs snippet typecheck contract.');
  }

  const tsConfigFile = ts.readConfigFile(tsConfigPath, ts.sys.readFile);
  const tsConfig = ts.parseJsonConfigFileContent(tsConfigFile.config, ts.sys, process.cwd());

  return tsConfig.options;
}

function toPackageSubpath(packageSpecifier: string) {
  return packageSpecifier === frameworkPackageName
    ? '.'
    : `./${packageSpecifier.slice(frameworkPackageName.length + 1)}`;
}

function toRelativeModuleSpecifier(fromFilePath: string, toSourcePath: string) {
  const relativePath = relative(dirname(fromFilePath), resolve(toSourcePath))
    .replace(/\\/g, '/')
    .replace(/\.(ts|tsx)$/, '');

  return relativePath.startsWith('.') ? relativePath : `./${relativePath}`;
}

function rewriteFrameworkPackageImports(code: string, snippetPath: string, stylesheetStubPath: string) {
  const sourceFile = ts.createSourceFile(
    snippetPath,
    code,
    ts.ScriptTarget.Latest,
    true,
    snippetPath.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  const replacements: Array<{ end: number; start: number; value: string }> = [];

  sourceFile.forEachChild((node) => {
    if (!ts.isImportDeclaration(node) || !ts.isStringLiteral(node.moduleSpecifier)) {
      return;
    }

    const packageSpecifier = node.moduleSpecifier.text;

    if (!packageSpecifier.startsWith(frameworkPackageName)) {
      return;
    }

    const subpath = toPackageSubpath(packageSpecifier);
    const rewrittenSourcePath = subpath === './styles.css'
      ? stylesheetStubPath
      : resolveFrameworkSourcePathForSubpath(subpath);

    if (!rewrittenSourcePath) {
      throw new Error(`Unable to resolve framework source path for ${packageSpecifier} in ${snippetPath}`);
    }

    replacements.push({
      end: node.moduleSpecifier.end - 1,
      start: node.moduleSpecifier.getStart(sourceFile) + 1,
      value: toRelativeModuleSpecifier(snippetPath, rewrittenSourcePath),
    });
  });

  return replacements
    .sort((left, right) => right.start - left.start)
    .reduce(
      (output, replacement) =>
        `${output.slice(0, replacement.start)}${replacement.value}${output.slice(replacement.end)}`,
      code,
    );
}

function formatDiagnostic(diagnostic: ts.Diagnostic) {
  const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');

  if (!diagnostic.file || diagnostic.start === undefined) {
    return message;
  }

  const position = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
  return `${diagnostic.file.fileName}:${position.line + 1}:${position.character + 1} ${message}`;
}

describe('documentation snippet typecheck contract', () => {
  it('typechecks framework-backed TypeScript documentation snippets', () => {
    const snippets = documentedFiles.flatMap(collectFrameworkCodeSnippets);
    const tempCacheRoot = resolve('node_modules/.cache');
    mkdirSync(tempCacheRoot, { recursive: true });
    const tempRoot = mkdtempSync(join(tempCacheRoot, 'sdkwork-ui-doc-snippets-'));

    try {
      const stylesheetStubPath = join(tempRoot, 'framework-stylesheet-side-effect.ts');
      writeFileSync(stylesheetStubPath, 'export {};\n');

      const snippetPaths = snippets.map((snippet) => {
        const snippetDirectory = join(tempRoot, snippet.filePath.replace(/[\\/]/g, '__'));
        mkdirSync(snippetDirectory, { recursive: true });

        const snippetPath = join(snippetDirectory, `snippet-${snippet.index}.${snippet.extension}`);
        writeFileSync(
          snippetPath,
          rewriteFrameworkPackageImports(snippet.code, snippetPath, stylesheetStubPath),
        );
        return snippetPath;
      });

      const program = ts.createProgram({
        options: getCompilerOptions(),
        rootNames: snippetPaths,
      });
      const diagnostics = ts.getPreEmitDiagnostics(program)
        .filter((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error)
        .map(formatDiagnostic);

      expect(snippets.length).toBeGreaterThan(20);
      expect(diagnostics).toEqual([]);
    } finally {
      rmSync(tempRoot, { force: true, recursive: true });
    }
  }, 20_000);
});
