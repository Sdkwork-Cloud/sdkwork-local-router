import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const generatedMatrixPath = resolve('docs/reference/framework-governance-matrix.md');
const generatorScriptPath = resolve('scripts/generate-framework-governance-matrix.mjs');

describe('framework governance matrix docs contract', () => {
  function findContractRow(markdown: string, contractTitle: string) {
    return markdown
      .split('\n')
      .find((line) => line.includes(`| ${contractTitle} |`));
  }

  it('publishes a generated governance matrix reference page', () => {
    expect(existsSync(generatedMatrixPath)).toBe(true);

    const markdown = readFileSync(generatedMatrixPath, 'utf8');

    expect(markdown).toContain('# Framework Governance Matrix');
    expect(markdown).toContain('<!-- Generated file. Do not edit directly. -->');
    expect(markdown).toContain('## Summary');
    expect(markdown).toContain('## Contract Coverage');
  });

  it('captures theme and runtime identity governance coverage with their enforcing audits', () => {
    const markdown = readFileSync(generatedMatrixPath, 'utf8');
    const themeRow = findContractRow(markdown, 'Theme Contract');
    const runtimeIdentityRow = findContractRow(markdown, 'Runtime Metadata Identity Contract');

    expect(themeRow).toContain('`src/theme/theme-contract.test.ts`');
    expect(themeRow).toContain('`src/styles/sdkwork-shell-css-contract.test.ts`');
    expect(themeRow).toContain('`/reference/package`');

    expect(runtimeIdentityRow).toContain('`src/runtime-metadata-identity-contract.test.ts`');
    expect(runtimeIdentityRow).toContain('`src/runtime-surface-catalog-docs-contract.test.ts`');
    expect(runtimeIdentityRow).toContain('`/reference/runtime-surface-catalog`');
  });

  it('captures public type and publication governance coverage with the correct generated references', () => {
    const markdown = readFileSync(generatedMatrixPath, 'utf8');
    const structuredSurfaceRow = findContractRow(markdown, 'Public Structured Surface Type Contract');
    const publicationRow = findContractRow(markdown, 'Publication Contract');

    expect(structuredSurfaceRow).toContain('`src/public-structured-surface-types-contract.test.ts`');
    expect(structuredSurfaceRow).toContain('`src/public-api-structure-catalog-docs-contract.test.ts`');
    expect(structuredSurfaceRow).toContain('`/reference/public-api-structure-catalog`');

    expect(publicationRow).toContain('`src/package-publish-contract.test.ts`');
    expect(publicationRow).toContain('`src/docs-governance-manifest-contract.test.ts`');
    expect(publicationRow).toContain('`src/docs-contract.test.ts`');
    expect(publicationRow).toContain('`src/docs-governance-catalog-docs-contract.test.ts`');
    expect(publicationRow).toContain('`/reference/documentation-governance-catalog`');
    expect(publicationRow).toContain('`/reference/package`');
  });

  it('keeps the generated governance matrix synchronized with the source registry', () => {
    const result = spawnSync(process.execPath, [generatorScriptPath, '--stdout'], {
      cwd: process.cwd(),
      encoding: 'utf8',
    });

    expect(result.status, result.stderr || result.stdout).toBe(0);
    expect(result.stdout).toBe(readFileSync(generatedMatrixPath, 'utf8'));
  }, 20_000);
});
