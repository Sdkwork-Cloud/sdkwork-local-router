# UI Framework Documentation Governance Catalog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a generated reference page that exposes the governed documentation surface, audit coverage, and snippet-typecheck scope from one shared source contract.

**Architecture:** Move the governed documentation manifest into a shared build-level contract that both tests and a new docs generator can consume. Generate `/reference/documentation-governance-catalog` from that manifest plus markdown analysis, then wire the new page into docs navigation, framework governance references, and the governance matrix.

**Tech Stack:** TypeScript, Vitest, Node.js fs/path, TypeScript compiler API, VitePress

---

### Task 1: Add a failing docs sync contract for the generated documentation governance page

**Files:**
- Create: `src/docs-governance-catalog-docs-contract.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
it('publishes a generated documentation governance catalog reference page', () => {
  expect(existsSync(resolve('docs/reference/documentation-governance-catalog.md'))).toBe(true);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- src/docs-governance-catalog-docs-contract.test.ts`
Expected: FAIL because the generator script and generated page do not exist yet.

- [ ] **Step 3: Write minimal implementation**

Create the new generator and generated markdown page, then make the test assert:
- page header and summary sections exist
- README and generated reference rows are represented
- generator `--stdout` stays synchronized with the checked-in markdown

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test -- src/docs-governance-catalog-docs-contract.test.ts`
Expected: PASS

### Task 2: Move the governed documentation manifest to a shared source contract

**Files:**
- Create: `build/docs-governance-contract.ts`
- Modify: `src/test-support/docs-governance.ts`
- Modify: `src/docs-governance-manifest-contract.test.ts`

- [ ] **Step 1: Extend tests to require the new generated page in the governed docs manifest**

Add expectations so the governed import-audit surface includes `docs/reference/documentation-governance-catalog.md`.

- [ ] **Step 2: Run targeted tests to verify the failure**

Run: `pnpm test -- src/docs-governance-manifest-contract.test.ts src/docs-governance-catalog-docs-contract.test.ts`
Expected: FAIL until the shared contract and new entry exist.

- [ ] **Step 3: Write minimal implementation**

Move the documentation manifest entries into the shared build contract and make the test-support helper import from it while preserving the shared markdown parsing utilities.

- [ ] **Step 4: Run targeted tests to verify they pass**

Run: `pnpm test -- src/docs-governance-manifest-contract.test.ts src/docs-governance-catalog-docs-contract.test.ts`
Expected: PASS

### Task 3: Wire the generated page into governance references and docs navigation

**Files:**
- Modify: `package.json`
- Modify: `docs/.vitepress/config.ts`
- Modify: `docs/index.md`
- Modify: `README.md`
- Modify: `docs/reference/package.md`
- Modify: `docs/reference/framework-governance.md`
- Modify: `scripts/generate-framework-governance-matrix.mjs`
- Modify: `src/framework-governance-matrix-docs-contract.test.ts`

- [ ] **Step 1: Add the failing governance expectation**

Update the matrix/reference tests so Publication Contract coverage and reference docs mention the new documentation governance catalog.

- [ ] **Step 2: Run targeted tests to verify the failure**

Run: `pnpm test -- src/framework-governance-matrix-docs-contract.test.ts src/docs-contract.test.ts`
Expected: FAIL until the new reference is wired into docs:catalog, docs navigation, and governance text.

- [ ] **Step 3: Write minimal implementation**

Add the generator to `docs:catalog`, expose the new page in docs navigation/home/reference text, and cross-link it from governance/publication docs.

- [ ] **Step 4: Run targeted tests to verify they pass**

Run: `pnpm docs:catalog`
Run: `pnpm test -- src/framework-governance-matrix-docs-contract.test.ts src/docs-contract.test.ts src/docs-governance-catalog-docs-contract.test.ts`
Expected: PASS

### Task 4: Re-run full package verification

**Files:**
- Modify: `docs/reference/documentation-governance-catalog.md` via generator output

- [ ] **Step 1: Run the full verification suite**

Run:
- `pnpm test`
- `pnpm typecheck`
- `pnpm build`
- `pnpm docs:build`

Expected: all commands exit successfully.
