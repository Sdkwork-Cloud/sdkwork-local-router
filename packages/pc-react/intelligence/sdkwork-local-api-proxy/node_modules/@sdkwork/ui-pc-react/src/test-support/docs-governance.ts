import { readFileSync } from 'node:fs';
import ts from 'typescript';
import {
  governedDocumentationEntries as docsGovernanceContractEntries,
  type GovernedDocumentationEntry,
} from '../../build/docs-governance-contract';
import { frameworkPackageName } from '../../build/package-contract';

export type DocumentationSnippet = {
  readonly code: string;
  readonly extension: 'ts' | 'tsx';
  readonly filePath: string;
  readonly index: number;
};

export type ImportReference = {
  readonly filePath: string;
  readonly packageSpecifier: string;
  readonly importedNames: readonly string[];
  readonly isSideEffectOnly: boolean;
};

export { type GovernedDocumentationEntry };

export const governedDocumentationEntries = docsGovernanceContractEntries;

export function getGovernedDocumentationPaths(
  filters: Partial<Pick<GovernedDocumentationEntry, 'auditFrameworkImports' | 'typecheckPackageSnippets'>> = {},
) {
  return governedDocumentationEntries
    .filter((entry) =>
      Object.entries(filters).every(([key, value]) => entry[key as keyof GovernedDocumentationEntry] === value))
    .map((entry) => entry.filePath);
}

export function collectFrameworkCodeSnippets(markdownPath: string): DocumentationSnippet[] {
  const markdown = readFileSync(markdownPath, 'utf8');
  const codeBlockPattern = /```(tsx|ts|jsx|js)\r?\n([\s\S]*?)```/g;
  const snippets: DocumentationSnippet[] = [];
  let match: RegExpExecArray | null;
  let codeBlockIndex = 0;

  while ((match = codeBlockPattern.exec(markdown)) !== null) {
    const language = match[1];
    const code = match[2];

    if (!code.includes(frameworkPackageName)) {
      codeBlockIndex += 1;
      continue;
    }

    snippets.push({
      code,
      extension: language === 'tsx' || language === 'jsx' ? 'tsx' : 'ts',
      filePath: markdownPath,
      index: codeBlockIndex,
    });
    codeBlockIndex += 1;
  }

  return snippets;
}

export function collectFrameworkImportReferences(markdownPath: string): ImportReference[] {
  const markdown = readFileSync(markdownPath, 'utf8');
  const codeBlockPattern = /```(?:[a-z]+)?\r?\n([\s\S]*?)```/g;
  const references: ImportReference[] = [];
  let match: RegExpExecArray | null;
  let codeBlockIndex = 0;

  while ((match = codeBlockPattern.exec(markdown)) !== null) {
    const codeBlock = match[1];
    const sourceFile = ts.createSourceFile(
      `${markdownPath}#block-${codeBlockIndex}.tsx`,
      codeBlock,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    );

    sourceFile.forEachChild((node) => {
      if (!ts.isImportDeclaration(node) || !ts.isStringLiteral(node.moduleSpecifier)) {
        return;
      }

      const packageSpecifier = node.moduleSpecifier.text;

      if (!packageSpecifier.startsWith(frameworkPackageName)) {
        return;
      }

      const importedNames: string[] = [];

      if (node.importClause?.name) {
        importedNames.push('default');
      }

      if (node.importClause?.namedBindings) {
        if (ts.isNamespaceImport(node.importClause.namedBindings)) {
          importedNames.push('*');
        } else {
          importedNames.push(
            ...node.importClause.namedBindings.elements.map(
              (element) => element.propertyName?.text ?? element.name.text,
            ),
          );
        }
      }

      references.push({
        filePath: markdownPath,
        packageSpecifier,
        importedNames,
        isSideEffectOnly: !node.importClause,
      });
    });

    codeBlockIndex += 1;
  }

  return references;
}
