import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const generatedCatalogPath = resolve('docs/reference/documentation-governance-catalog.md');
const generatorScriptPath = resolve('scripts/generate-documentation-governance-catalog.mjs');

describe('documentation governance catalog docs contract', () => {
  function findCatalogRow(markdown: string, documentPath: string) {
    return markdown
      .split('\n')
      .find((line) => line.startsWith(`| \`${documentPath}\``));
  }

  it('publishes a generated documentation governance catalog reference page', () => {
    expect(existsSync(generatedCatalogPath)).toBe(true);

    const markdown = readFileSync(generatedCatalogPath, 'utf8');

    expect(markdown).toContain('# Documentation Governance Catalog');
    expect(markdown).toContain('<!-- Generated file. Do not edit directly. -->');
    expect(markdown).toContain('## Summary');
    expect(markdown).toContain('## Governed Documentation');
  });

  it('captures import-audited and snippet-typechecked documentation scope', () => {
    const markdown = readFileSync(generatedCatalogPath, 'utf8');
    const readmeRow = findCatalogRow(markdown, 'README.md');
    const governanceMatrixRow = findCatalogRow(markdown, 'docs/reference/framework-governance-matrix.md');

    expect(readmeRow).toContain('| Yes | Yes |');
    expect(governanceMatrixRow).toContain('| Yes | No |');
  });

  it('keeps the generated documentation governance catalog synchronized with the source manifest', () => {
    const result = spawnSync(process.execPath, [generatorScriptPath, '--stdout'], {
      cwd: process.cwd(),
      encoding: 'utf8',
    });

    expect(result.status, result.stderr || result.stdout).toBe(0);
    expect(result.stdout).toBe(readFileSync(generatedCatalogPath, 'utf8'));
  }, 20_000);
});
