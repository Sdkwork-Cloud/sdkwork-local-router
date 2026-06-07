# UI Framework Public API Structure Catalog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a generated public API structure catalog so every public runtime surface documents its stable props contract, slot contract, and named surface or callback helper types from source.

**Architecture:** Reuse the catalog-driven governance model and TypeScript program analysis already established for runtime metadata auditing. Scan each cataloged UI and pattern surface, resolve its exported `ComponentNameProps` contract through the public entrypoints, extract named public type references from governed props fields, and emit a deterministic reference page under `docs/reference/`.

**Tech Stack:** React 19, TypeScript 6, Vite, Vitest, VitePress, Radix UI, TanStack Table

---

### Task 1: Add the failing generated-doc contract

**Files:**
- Create: `src/public-api-structure-catalog-docs-contract.test.ts`
- Modify: `src/docs-contract.test.ts`

- [ ] **Step 1: Write a contract test that expects a generated public API structure catalog page to exist**
- [ ] **Step 2: Add representative assertions for UI and pattern surfaces with rich public type contracts**
- [ ] **Step 3: Extend the docs contract to treat the generated page as governed framework documentation**
- [ ] **Step 4: Run the targeted tests and confirm they fail because the generated artifact and scanner do not exist yet**

### Task 2: Implement the public API structure extractor

**Files:**
- Create: `scripts/generate-public-api-structure-catalog.mjs`
- Modify: `package.json`

- [ ] **Step 1: Enumerate cataloged runtime surfaces from the public barrels**
- [ ] **Step 2: Resolve each public `ComponentNameProps` contract through the TypeScript checker**
- [ ] **Step 3: Classify direct public type references into slot contracts, surface types, and callback contracts**
- [ ] **Step 4: Emit deterministic markdown under `docs/reference/`**
- [ ] **Step 5: Extend the docs generation command so all generated reference catalogs stay synchronized**

### Task 3: Publish the generated reference page

**Files:**
- Create: `docs/reference/public-api-structure-catalog.md`
- Modify: `docs/.vitepress/config.ts`
- Modify: `docs/index.md`
- Modify: `docs/reference/framework-governance.md`
- Modify: `docs/reference/package.md`
- Modify: `README.md`

- [ ] **Step 1: Generate the initial public API structure catalog page**
- [ ] **Step 2: Add the page to VitePress reference navigation and the docs home surface**
- [ ] **Step 3: Link framework governance and package reference docs to the generated catalog**

### Task 4: Verify synchronization

**Files:**
- Test: `src/public-api-structure-catalog-docs-contract.test.ts`
- Test: `src/docs-contract.test.ts`

- [ ] **Step 1: Re-run the targeted API catalog tests until they pass**
- [ ] **Step 2: Rebuild docs to confirm the generated reference renders cleanly**

### Task 5: Final package verification

**Files:**
- Verify only

- [ ] **Step 1: Run `pnpm test`**
- [ ] **Step 2: Run `pnpm typecheck`**
- [ ] **Step 3: Run `pnpm build`**
- [ ] **Step 4: Run `pnpm docs:build`**
