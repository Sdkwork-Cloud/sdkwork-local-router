import generatedReferenceContract from './generated-reference-contract.json';

export type GovernedDocumentationEntry = {
  readonly auditFrameworkImports: boolean;
  readonly filePath: string;
  readonly typecheckPackageSnippets: boolean;
};

const staticGovernedDocumentationEntries = [
  {
    filePath: 'README.md',
    auditFrameworkImports: true,
    typecheckPackageSnippets: true,
  },
  {
    filePath: 'docs/guide/getting-started.md',
    auditFrameworkImports: true,
    typecheckPackageSnippets: true,
  },
  {
    filePath: 'docs/reference/framework-governance.md',
    auditFrameworkImports: true,
    typecheckPackageSnippets: false,
  },
  {
    filePath: 'docs/reference/package.md',
    auditFrameworkImports: true,
    typecheckPackageSnippets: true,
  },
] as const satisfies readonly GovernedDocumentationEntry[];

const generatedReferenceDocumentationEntries = generatedReferenceContract.generatedReferences.map((entry) => ({
  filePath: entry.filePath,
  auditFrameworkImports: true,
  typecheckPackageSnippets: false,
})) satisfies readonly GovernedDocumentationEntry[];

export const governedDocumentationEntries = [
  ...staticGovernedDocumentationEntries.slice(0, 3),
  ...generatedReferenceDocumentationEntries.filter((entry) =>
    entry.filePath === 'docs/reference/documentation-governance-catalog.md'
    || entry.filePath === 'docs/reference/framework-governance-matrix.md'),
  staticGovernedDocumentationEntries[3],
  ...generatedReferenceDocumentationEntries.filter((entry) =>
    entry.filePath === 'docs/reference/public-api-structure-catalog.md'),
  ...generatedReferenceDocumentationEntries.filter((entry) =>
    entry.filePath === 'docs/reference/runtime-surface-catalog.md'),
] satisfies readonly GovernedDocumentationEntry[];
