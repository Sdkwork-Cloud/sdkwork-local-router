import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import process from 'node:process';

const cwd = process.cwd();
const governanceDocPath = resolve(cwd, 'docs/reference/framework-governance.md');
const outputPath = resolve(cwd, 'docs/reference/framework-governance-matrix.md');

const contractRegistry = new Map([
  [1, {
    audits: [
      'src/theme/theme-contract.test.ts',
      'src/form-radius-contract.test.ts',
      'src/styles/sdkwork-shell-css-contract.test.ts',
    ],
    references: [
      '/reference/framework-governance',
      '/reference/package',
    ],
    scope: 'Theme tokens, semantic CSS variables, and compact radius ladder',
  }],
  [2, {
    audits: [
      'src/components/ui/framework-contract.test.ts',
      'src/pattern-direct-surface-contract.test.tsx',
    ],
    references: [
      '/reference/framework-governance',
      '/reference/runtime-surface-catalog',
    ],
    scope: 'Stable metadata markers on rendered framework surfaces and regions',
  }],
  [3, {
    audits: [
      'src/runtime-metadata-identity-contract.test.ts',
      'src/runtime-surface-catalog-docs-contract.test.ts',
    ],
    references: [
      '/reference/framework-governance',
      '/reference/runtime-surface-catalog',
    ],
    scope: 'Exact kebab-case runtime identity markers and explicit abstract exemptions',
  }],
  [4, {
    audits: [
      'src/pattern-direct-surface-contract.test.tsx',
      'src/ui-field-shell-slot-props-contract.test.tsx',
    ],
    references: [
      '/reference/framework-governance',
      '/reference/runtime-surface-catalog',
    ],
    scope: 'Root prop passthrough for owned surfaces and explicit lower-surface escape hatches',
  }],
  [5, {
    audits: [
      'src/components/ui/authoring-contract.test.ts',
      'src/display-name-contract.test.ts',
      'src/public-props-contract.test.ts',
    ],
    references: [
      '/reference/framework-governance',
      '/reference/public-api-structure-catalog',
    ],
    scope: 'Explicit props contracts, display names, and shared authoring discipline',
  }],
  [6, {
    audits: [
      'src/public-api-contract.test.ts',
      'src/barrel-contract.test.ts',
      'src/public-props-api-contract.test.ts',
    ],
    references: [
      '/reference/framework-governance',
      '/reference/package',
      '/reference/public-api-structure-catalog',
    ],
    scope: 'Catalog ownership, barrel forwarding, and public package entrypoint integrity',
  }],
  [7, {
    audits: [
      'src/package-publish-contract.test.ts',
      'src/docs-governance-manifest-contract.test.ts',
      'src/docs-governance-catalog-docs-contract.test.ts',
      'src/docs-contract.test.ts',
      'src/docs-snippet-typecheck-contract.test.ts',
    ],
    references: [
      '/reference/framework-governance',
      '/reference/documentation-governance-catalog',
      '/reference/package',
    ],
    scope: 'Published subpaths, side effects, docs imports, docs examples, and package metadata alignment',
  }],
  [8, {
    audits: [
      'src/install-contract.test.ts',
    ],
    references: [
      '/reference/framework-governance',
      '/reference/package',
    ],
    scope: 'Local dependency boundary and install graph integrity',
  }],
  [9, {
    audits: [
      'src/pattern-slot-props-api-contract.test.ts',
      'src/pattern-slot-props-contract.test.tsx',
    ],
    references: [
      '/reference/framework-governance',
      '/reference/runtime-surface-catalog',
      '/reference/public-api-structure-catalog',
    ],
    scope: 'Structured slot contracts for composite pattern interiors and delegated shells',
  }],
  [10, {
    audits: [
      'src/ui-slot-props-api-contract.test.ts',
      'src/ui-slot-props-contract.test.tsx',
    ],
    references: [
      '/reference/framework-governance',
      '/reference/runtime-surface-catalog',
      '/reference/public-api-structure-catalog',
    ],
    scope: 'Structured slot contracts for composite UI components and delegated lower surfaces',
  }],
  [11, {
    audits: [
      'src/ui-collection-surface-api-contract.test.ts',
      'src/ui-collection-surface-contract.test.tsx',
    ],
    references: [
      '/reference/framework-governance',
      '/reference/runtime-surface-catalog',
      '/reference/public-api-structure-catalog',
    ],
    scope: 'Collection root, item root, and repeated item slot surface contracts',
  }],
  [12, {
    audits: [
      'src/public-structured-surface-types-contract.test.ts',
      'src/public-api-structure-catalog-docs-contract.test.ts',
    ],
    references: [
      '/reference/framework-governance',
      '/reference/public-api-structure-catalog',
    ],
    scope: 'Named exported props and resolver types for governed structured surfaces',
  }],
  [13, {
    audits: [
      'src/public-semantic-callback-types-contract.test.ts',
      'src/public-api-structure-catalog-docs-contract.test.ts',
    ],
    references: [
      '/reference/framework-governance',
      '/reference/public-api-structure-catalog',
    ],
    scope: 'Named renderer, resolver, and handler contracts for semantic callbacks',
  }],
  [14, {
    audits: [
      'src/public-event-handler-types-contract.test.ts',
      'src/public-api-structure-catalog-docs-contract.test.ts',
    ],
    references: [
      '/reference/framework-governance',
      '/reference/public-api-structure-catalog',
    ],
    scope: 'Named handler contracts for public `on*` event props',
  }],
  [15, {
    audits: [
      'src/public-auxiliary-callback-types-contract.test.ts',
      'src/public-api-structure-catalog-docs-contract.test.ts',
    ],
    references: [
      '/reference/framework-governance',
      '/reference/public-api-structure-catalog',
    ],
    scope: 'Named callback contracts for public non-props auxiliary APIs',
  }],
  [16, {
    audits: [
      'src/public-helper-types-contract.test.ts',
      'src/public-api-structure-catalog-docs-contract.test.ts',
    ],
    references: [
      '/reference/framework-governance',
      '/reference/public-api-structure-catalog',
    ],
    scope: 'Promotion of same-file helper types into explicit public API when referenced publicly',
  }],
  [17, {
    audits: [
      'src/catalog-runtime-export-completeness-contract.test.ts',
      'src/public-api-contract.test.ts',
      'src/runtime-surface-catalog-docs-contract.test.ts',
    ],
    references: [
      '/reference/framework-governance',
      '/reference/package',
      '/reference/runtime-surface-catalog',
    ],
    scope: 'Bidirectional completeness between runtime exports and the authoritative catalog',
  }],
  [18, {
    audits: [
      'src/ui-field-shell-slot-props-api-contract.test.ts',
      'src/ui-field-shell-slot-props-contract.test.tsx',
    ],
    references: [
      '/reference/framework-governance',
      '/reference/runtime-surface-catalog',
      '/reference/public-api-structure-catalog',
    ],
    scope: 'Owned shell and add-on slot contracts for field-like composite controls',
  }],
  [19, {
    audits: [
      'src/ui-direct-surface-ref-contract.test.ts',
    ],
    references: [
      '/reference/framework-governance',
      '/reference/runtime-surface-catalog',
      '/reference/public-api-structure-catalog',
    ],
    scope: 'Stable forwardRef ownership for exact-marked intrinsic UI surfaces',
  }],
  [20, {
    audits: [
      'src/pattern-direct-surface-ref-contract.test.ts',
    ],
    references: [
      '/reference/framework-governance',
      '/reference/runtime-surface-catalog',
      '/reference/public-api-structure-catalog',
    ],
    scope: 'Stable forwardRef ownership for exact-marked intrinsic pattern surfaces',
  }],
]);

function toRepoRelativePath(filePath) {
  return filePath.replace(/\\/g, '/').replace(`${cwd.replace(/\\/g, '/')}/`, '');
}

function parseGovernanceContracts(markdown) {
  return markdown
    .split('\n')
    .map((line) => line.match(/^##\s+(\d+)\.\s+(.+?)\s*$/))
    .filter((match) => Boolean(match))
    .map((match) => ({
      id: Number(match[1]),
      title: match[2],
    }));
}

function assertRegistryConsistency(contracts) {
  if (contracts.length !== contractRegistry.size) {
    throw new Error(`Governance contract heading count ${contracts.length} does not match registry size ${contractRegistry.size}.`);
  }

  for (const contract of contracts) {
    const registryEntry = contractRegistry.get(contract.id);

    if (!registryEntry) {
      throw new Error(`Missing governance matrix registry entry for contract ${contract.id}.`);
    }

    for (const auditPath of registryEntry.audits) {
      if (!existsSync(resolve(cwd, auditPath))) {
        throw new Error(`Governance matrix audit file is missing: ${auditPath}`);
      }
    }
  }
}

function formatListCell(values) {
  return values.map((value) => `\`${value}\``).join('<br>');
}

function buildMarkdown() {
  const governanceMarkdown = readFileSync(governanceDocPath, 'utf8');
  const contracts = parseGovernanceContracts(governanceMarkdown);
  assertRegistryConsistency(contracts);
  const uniqueAudits = new Set();
  const uniqueReferences = new Set();

  contracts.forEach((contract) => {
    const registryEntry = contractRegistry.get(contract.id);
    registryEntry.audits.forEach((auditPath) => uniqueAudits.add(auditPath));
    registryEntry.references.forEach((referencePath) => uniqueReferences.add(referencePath));
  });

  const lines = [
    '# Framework Governance Matrix',
    '',
    '<!-- Generated file. Do not edit directly. -->',
    '',
    'This reference page is generated by `pnpm docs:catalog` from the numbered contract headings in `/reference/framework-governance` and the governance audit registry in `scripts/generate-framework-governance-matrix.mjs`.',
    '',
    '## Summary',
    '',
    `- Contracts covered: ${contracts.length}`,
    `- Unique audit files referenced: ${uniqueAudits.size}`,
    `- Related reference pages linked: ${uniqueReferences.size}`,
    '- Use this matrix when you need to answer which tests enforce a contract and which generated references expose the resulting framework surface.',
    '',
    '## Contract Coverage',
    '',
    '| # | Contract | Scope | Enforcing Audits | Related References |',
    '| --- | --- | --- | --- | --- |',
  ];

  contracts.forEach((contract) => {
    const registryEntry = contractRegistry.get(contract.id);

    lines.push(
      `| ${contract.id} | ${contract.title} | ${registryEntry.scope} | ${formatListCell(registryEntry.audits)} | ${formatListCell(registryEntry.references)} |`,
    );
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
