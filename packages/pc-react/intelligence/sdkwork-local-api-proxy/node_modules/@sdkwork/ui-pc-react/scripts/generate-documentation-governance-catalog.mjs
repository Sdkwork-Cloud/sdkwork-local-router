import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import process from 'node:process';
import ts from 'typescript';

const cwd = process.cwd();
const outputPath = resolve(cwd, 'docs/reference/documentation-governance-catalog.md');
const documentationContractPath = resolve(cwd, 'build/docs-governance-contract.ts');
const generatedReferenceContractPath = resolve(cwd, 'build/generated-reference-contract.json');
const frameworkPackageName = '@sdkwork/ui-pc-react';

function normalizePath(filePath) {
  return filePath.replace(/\\/g, '/');
}

function toRepoRelativePath(filePath) {
  return normalizePath(relative(cwd, filePath));
}

function getObjectLiteralPropertyName(name) {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNoSubstitutionTemplateLiteral(name)) {
    return name.text;
  }

  return null;
}

function getStringInitializerValue(node) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text;
  }

  return null;
}

function getBooleanInitializerValue(node) {
  if (node.kind === ts.SyntaxKind.TrueKeyword) {
    return true;
  }

  if (node.kind === ts.SyntaxKind.FalseKeyword) {
    return false;
  }

  return null;
}

function unwrapExpression(node) {
  let currentNode = node;

  while (
    ts.isAsExpression(currentNode)
    || ts.isSatisfiesExpression(currentNode)
    || ts.isParenthesizedExpression(currentNode)
  ) {
    currentNode = currentNode.expression;
  }

  return currentNode;
}

function parseGovernedDocumentationEntries(filePath, variableName) {
  const source = readFileSync(filePath, 'utf8');
  const sourceFile = ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  let parsedEntries = null;

  sourceFile.forEachChild((node) => {
    if (!ts.isVariableStatement(node)) {
      return;
    }

    for (const declaration of node.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || declaration.name.text !== variableName) {
        continue;
      }

      const initializer = declaration.initializer ? unwrapExpression(declaration.initializer) : null;

      if (!initializer || !ts.isArrayLiteralExpression(initializer)) {
        throw new Error(`${variableName} must be initialized with an array literal in ${filePath}`);
      }

      parsedEntries = initializer.elements.map((element) => {
        if (!ts.isObjectLiteralExpression(element)) {
          throw new Error(`Each ${variableName} item must be an object literal.`);
        }

        const values = {
          auditFrameworkImports: null,
          filePath: null,
          typecheckPackageSnippets: null,
        };

        element.properties.forEach((property) => {
          if (!ts.isPropertyAssignment(property)) {
            return;
          }

          const propertyName = getObjectLiteralPropertyName(property.name);

          if (propertyName === 'filePath') {
            values.filePath = getStringInitializerValue(property.initializer);
          }

          if (propertyName === 'auditFrameworkImports') {
            values.auditFrameworkImports = getBooleanInitializerValue(property.initializer);
          }

          if (propertyName === 'typecheckPackageSnippets') {
            values.typecheckPackageSnippets = getBooleanInitializerValue(property.initializer);
          }
        });

        if (
          values.filePath === null
          || values.auditFrameworkImports === null
          || values.typecheckPackageSnippets === null
        ) {
          throw new Error(`Invalid ${variableName} item in ${filePath}`);
        }

        return values;
      });
    }
  });

  if (!parsedEntries) {
    throw new Error(`Unable to locate ${variableName} in ${filePath}`);
  }

  return parsedEntries;
}

function getGeneratedReferenceDocumentationEntries() {
  const { generatedReferences } = JSON.parse(readFileSync(generatedReferenceContractPath, 'utf8'));

  return generatedReferences.map((entry) => ({
    filePath: entry.filePath,
    auditFrameworkImports: true,
    typecheckPackageSnippets: false,
  }));
}

function readMarkdown(markdownPath) {
  return existsSync(markdownPath) ? readFileSync(markdownPath, 'utf8') : '';
}

function collectFrameworkImportCount(markdownPath) {
  const markdown = readMarkdown(markdownPath);
  const codeBlockPattern = /```(?:[a-z]+)?\r?\n([\s\S]*?)```/g;
  let count = 0;
  let match;
  let codeBlockIndex = 0;

  while ((match = codeBlockPattern.exec(markdown)) !== null) {
    const sourceFile = ts.createSourceFile(
      `${markdownPath}#block-${codeBlockIndex}.tsx`,
      match[1],
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    );

    sourceFile.forEachChild((node) => {
      if (!ts.isImportDeclaration(node) || !ts.isStringLiteral(node.moduleSpecifier)) {
        return;
      }

      if (node.moduleSpecifier.text.startsWith(frameworkPackageName)) {
        count += 1;
      }
    });

    codeBlockIndex += 1;
  }

  return count;
}

function collectFrameworkSnippetCount(markdownPath) {
  const markdown = readMarkdown(markdownPath);
  const codeBlockPattern = /```(tsx|ts|jsx|js)\r?\n([\s\S]*?)```/g;
  let count = 0;
  let match;

  while ((match = codeBlockPattern.exec(markdown)) !== null) {
    if (match[2].includes(frameworkPackageName)) {
      count += 1;
    }
  }

  return count;
}

function classifyDocument(filePath) {
  if (filePath === 'README.md') {
    return 'Repository';
  }

  if (filePath.startsWith('docs/guide/')) {
    return 'Guide';
  }

  if (filePath.startsWith('docs/reference/')) {
    return 'Reference';
  }

  return 'Other';
}

function formatBooleanCell(value) {
  return value ? 'Yes' : 'No';
}

function buildRows(entries) {
  return entries.map((entry) => ({
    ...entry,
    documentClass: classifyDocument(entry.filePath),
    frameworkImportCount: collectFrameworkImportCount(entry.filePath),
    frameworkSnippetCount: collectFrameworkSnippetCount(entry.filePath),
  }));
}

function renderTable(rows) {
  const lines = [
    '| Document | Class | Import Audit | Snippet Typecheck | Framework Imports | Framework Snippets |',
    '| --- | --- | --- | --- | --- | --- |',
  ];

  rows.forEach((row) => {
    lines.push(
      `| \`${row.filePath}\` | ${row.documentClass} | ${formatBooleanCell(row.auditFrameworkImports)} | ${formatBooleanCell(row.typecheckPackageSnippets)} | ${row.frameworkImportCount} | ${row.frameworkSnippetCount} |`,
    );
  });

  return lines;
}

function buildMarkdown() {
  const entries = [
    ...parseGovernedDocumentationEntries(documentationContractPath, 'staticGovernedDocumentationEntries'),
    ...getGeneratedReferenceDocumentationEntries(),
  ];
  const rows = buildRows(entries);
  const importAuditCount = rows.filter((row) => row.auditFrameworkImports).length;
  const snippetTypecheckCount = rows.filter((row) => row.typecheckPackageSnippets).length;
  const generatedReferenceCount = rows.filter((row) => row.filePath.startsWith('docs/reference/')).length;
  const classOrder = ['Repository', 'Guide', 'Reference', 'Other'];
  const lines = [
    '# Documentation Governance Catalog',
    '',
    '<!-- Generated file. Do not edit directly. -->',
    '',
    'This reference page is generated by `pnpm docs:catalog` from the governed documentation manifest in `build/docs-governance-contract.ts` and the markdown framework import scanner.',
    '',
    '## Summary',
    '',
    `- Governed documentation files: ${rows.length}`,
    `- Import-audited documentation files: ${importAuditCount}`,
    `- Snippet-typechecked documentation files: ${snippetTypecheckCount}`,
    `- Generated reference pages in scope: ${generatedReferenceCount}`,
    '- Each row records whether framework import paths are audited, whether framework-backed TypeScript snippets are typechecked, and how much framework-specific code currently appears in the page.',
    '',
    '## Governed Documentation',
    '',
  ];

  classOrder.forEach((documentClass) => {
    const classRows = rows.filter((row) => row.documentClass === documentClass);

    if (classRows.length === 0) {
      return;
    }

    lines.push(`### ${documentClass}`);
    lines.push('');
    lines.push(...renderTable(classRows));
    lines.push('');
  });

  return `${lines.join('\n').trimEnd()}\n`;
}

const markdown = buildMarkdown();

if (process.argv.includes('--stdout')) {
  process.stdout.write(markdown);
  process.exit(0);
}

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, markdown);
process.stdout.write(`Generated ${toRepoRelativePath(outputPath)}\n`);
