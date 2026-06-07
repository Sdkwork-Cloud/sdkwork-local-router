import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import generatedReferenceContract from '../build/generated-reference-contract.json';
import { governedDocumentationEntries } from './test-support/docs-governance';

type GeneratedReferenceContract = {
  readonly filePath: string;
  readonly generatorScript: string;
  readonly link: string;
  readonly title: string;
};

describe('generated reference registry contract', () => {
  it('keeps docs:catalog execution, reference sidebar, and docs governance in sync with the registry', () => {
    const entries = generatedReferenceContract.generatedReferences as readonly GeneratedReferenceContract[];
    const vitepressConfigSource = readFileSync(resolve('docs/.vitepress/config.ts'), 'utf8');
    const docsGovernanceContractSource = readFileSync(resolve('build/docs-governance-contract.ts'), 'utf8');
    const governedReferenceFiles = new Set(
      governedDocumentationEntries
        .filter((entry) => entry.filePath.startsWith('docs/reference/'))
        .map((entry) => entry.filePath),
    );

    expect(packageJson.scripts['docs:catalog']).toBe('node scripts/run-docs-catalog.mjs');
    expect(entries.length).toBeGreaterThanOrEqual(4);
    expect(new Set(entries.map((entry) => entry.generatorScript)).size).toBe(entries.length);
    expect(new Set(entries.map((entry) => entry.link)).size).toBe(entries.length);
    expect(vitepressConfigSource).toContain("generatedReferenceContract.generatedReferences.map");
    expect(docsGovernanceContractSource).toContain("generatedReferenceContract.generatedReferences.map");

    entries.forEach((entry) => {
      expect(existsSync(resolve(entry.generatorScript))).toBe(true);
      expect(vitepressConfigSource).toContain(`{ text: entry.title, link: entry.link }`);
      expect(governedReferenceFiles.has(entry.filePath)).toBe(true);
    });
  });
});
