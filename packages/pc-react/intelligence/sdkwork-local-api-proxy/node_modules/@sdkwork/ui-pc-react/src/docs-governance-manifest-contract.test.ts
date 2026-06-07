import { describe, expect, it } from 'vitest';
import {
  collectFrameworkCodeSnippets,
  collectFrameworkImportReferences,
  getGovernedDocumentationPaths,
  governedDocumentationEntries,
} from './test-support/docs-governance';

describe('documentation governance manifest contract', () => {
  it('keeps snippet-typechecked documentation as a subset of governed import docs', () => {
    const snippetDocs = getGovernedDocumentationPaths({ typecheckPackageSnippets: true });
    const importDocs = new Set(getGovernedDocumentationPaths({ auditFrameworkImports: true }));

    expect(snippetDocs.length).toBeGreaterThan(0);
    expect(snippetDocs.every((filePath) => importDocs.has(filePath))).toBe(true);
  });

  it('keeps canonical package docs in the snippet typecheck scope', () => {
    expect(getGovernedDocumentationPaths({ typecheckPackageSnippets: true })).toEqual([
      'README.md',
      'docs/guide/getting-started.md',
      'docs/reference/package.md',
    ]);
  });

  it('keeps governance and generated reference pages in the broader import audit scope', () => {
    expect(governedDocumentationEntries).toEqual([
      expect.objectContaining({ filePath: 'README.md', auditFrameworkImports: true, typecheckPackageSnippets: true }),
      expect.objectContaining({ filePath: 'docs/guide/getting-started.md', auditFrameworkImports: true, typecheckPackageSnippets: true }),
      expect.objectContaining({ filePath: 'docs/reference/framework-governance.md', auditFrameworkImports: true, typecheckPackageSnippets: false }),
      expect.objectContaining({ filePath: 'docs/reference/documentation-governance-catalog.md', auditFrameworkImports: true, typecheckPackageSnippets: false }),
      expect.objectContaining({ filePath: 'docs/reference/framework-governance-matrix.md', auditFrameworkImports: true, typecheckPackageSnippets: false }),
      expect.objectContaining({ filePath: 'docs/reference/package.md', auditFrameworkImports: true, typecheckPackageSnippets: true }),
      expect.objectContaining({ filePath: 'docs/reference/public-api-structure-catalog.md', auditFrameworkImports: true, typecheckPackageSnippets: false }),
      expect.objectContaining({ filePath: 'docs/reference/runtime-surface-catalog.md', auditFrameworkImports: true, typecheckPackageSnippets: false }),
    ]);
  });

  it('extracts framework import references from governed docs through the shared helper', () => {
    expect(collectFrameworkImportReferences('README.md')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ filePath: 'README.md', packageSpecifier: '@sdkwork/ui-pc-react' }),
        expect.objectContaining({ filePath: 'README.md', packageSpecifier: '@sdkwork/ui-pc-react/styles.css' }),
      ]),
    );
  });

  it('extracts snippet-typechecked framework code blocks through the shared helper', () => {
    expect(collectFrameworkCodeSnippets('README.md')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ extension: 'tsx', filePath: 'README.md' }),
      ]),
    );
  });
});
