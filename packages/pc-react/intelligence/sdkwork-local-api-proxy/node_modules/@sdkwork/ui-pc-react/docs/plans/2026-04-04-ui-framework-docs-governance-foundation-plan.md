# UI Framework Docs Governance Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Centralize documentation governance inventory and snippet-analysis utilities so all docs contract tests audit the same source of truth.

**Architecture:** Move governed markdown file definitions and markdown snippet/import extraction helpers into a dedicated test-support module under `src/`. Keep behavior in existing contract tests, but make those tests consume shared inventory metadata instead of duplicating file lists and parser logic. Add a dedicated manifest contract to guard the new shared registry semantics before refactoring existing tests onto it.

**Tech Stack:** TypeScript, Vitest, Node.js fs/path, TypeScript compiler API

---

### Task 1: Add a governed documentation manifest contract

**Files:**
- Create: `src/docs-governance-manifest-contract.test.ts`
- Create: `src/test-support/docs-governance.ts`

- [ ] **Step 1: Write the failing test**

```ts
it('keeps snippet-typechecked documentation as a subset of governed import docs', () => {
  const snippetDocs = getGovernedDocumentationPaths({ typecheckPackageSnippets: true });
  const importDocs = new Set(getGovernedDocumentationPaths({ auditFrameworkImports: true }));

  expect(snippetDocs.length).toBeGreaterThan(0);
  expect(snippetDocs.every((filePath) => importDocs.has(filePath))).toBe(true);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- src/docs-governance-manifest-contract.test.ts`
Expected: FAIL because the shared docs governance module does not exist yet.

- [ ] **Step 3: Write minimal implementation**

Create a shared manifest module that exports:
- governed documentation entries with explicit audit flags
- filtered path selectors for import audits and snippet typecheck audits

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test -- src/docs-governance-manifest-contract.test.ts`
Expected: PASS

### Task 2: Refactor docs contract tests onto the shared manifest and helpers

**Files:**
- Modify: `src/docs-contract.test.ts`
- Modify: `src/docs-snippet-typecheck-contract.test.ts`
- Modify: `src/test-support/docs-governance.ts`

- [ ] **Step 1: Write the failing integration expectation**

Extend the manifest test or add assertions so `README.md`, `docs/guide/getting-started.md`, and `docs/reference/package.md` remain in the snippet-typechecked set and generated/governance reference pages remain in the broader import-audited set.

- [ ] **Step 2: Run targeted tests to verify the failure**

Run: `pnpm test -- src/docs-governance-manifest-contract.test.ts src/docs-contract.test.ts src/docs-snippet-typecheck-contract.test.ts`
Expected: FAIL until existing tests are migrated to the shared manifest and helper API.

- [ ] **Step 3: Write minimal implementation**

Refactor both docs contract tests to consume:
- shared governed documentation selectors
- shared markdown code-block extraction utilities
- shared framework package import parsing utilities where duplication currently exists

- [ ] **Step 4: Run targeted tests to verify they pass**

Run: `pnpm test -- src/docs-governance-manifest-contract.test.ts src/docs-contract.test.ts src/docs-snippet-typecheck-contract.test.ts`
Expected: PASS

### Task 3: Re-verify package integrity after the refactor

**Files:**
- Modify: `docs/reference/framework-governance.md` only if governance wording must mention the new manifest explicitly

- [ ] **Step 1: Run full package verification**

Run:
- `pnpm test`
- `pnpm typecheck`
- `pnpm build`
- `pnpm docs:build`

Expected: all commands exit successfully.

- [ ] **Step 2: Update governance wording only if the implementation changed framework policy**

Keep policy docs stable unless the refactor materially changes the contract.
