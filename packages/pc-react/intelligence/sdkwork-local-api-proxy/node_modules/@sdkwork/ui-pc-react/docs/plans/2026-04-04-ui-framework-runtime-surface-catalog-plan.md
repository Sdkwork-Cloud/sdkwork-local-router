# UI Framework Runtime Surface Catalog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a generated runtime surface catalog so framework identity, regions, and owned anatomy markers are documented from source instead of maintained manually.

**Architecture:** Reuse the existing catalog-driven governance model. Add a source scanner that walks the public runtime inventory, extracts exact `data-sdk-ui` / `data-sdk-pattern`, `data-sdk-region`, and `data-slot` markers from owning source files, emits a generated reference page, and guards synchronization with contract tests.

**Tech Stack:** React 19, TypeScript 6, Vite, Vitest, VitePress, Radix UI, TanStack Table

---

### Task 1: Add the failing generated-doc contract

**Files:**
- Create: `src/runtime-surface-catalog-docs-contract.test.ts`
- Modify: `src/docs-contract.test.ts`

- [ ] **Step 1: Write a contract test that expects a generated runtime surface catalog page to exist**
- [ ] **Step 2: Run the targeted tests and confirm they fail because the generated artifact does not exist yet**
- [ ] **Step 3: Extend the docs contract to treat the generated page as governed framework documentation**

### Task 2: Implement the runtime surface catalog extractor

**Files:**
- Create: `scripts/generate-runtime-surface-catalog.mjs`
- Modify: `package.json`

- [ ] **Step 1: Build a source scanner that enumerates cataloged runtime exports and their owning source files**
- [ ] **Step 2: Extract exact runtime identity, region, and slot markers from source**
- [ ] **Step 3: Emit deterministic markdown under `docs/reference/`**
- [ ] **Step 4: Add a package script so the catalog can be regenerated explicitly**

### Task 3: Publish the generated reference page

**Files:**
- Create: `docs/reference/runtime-surface-catalog.md`
- Modify: `docs/.vitepress/config.ts`
- Modify: `docs/reference/framework-governance.md`
- Modify: `docs/reference/package.md`
- Modify: `README.md`

- [ ] **Step 1: Generate the initial runtime surface catalog page**
- [ ] **Step 2: Add the page to the VitePress reference navigation**
- [ ] **Step 3: Link governance and package reference docs to the generated catalog**

### Task 4: Verify the catalog stays synchronized

**Files:**
- Test: `src/runtime-surface-catalog-docs-contract.test.ts`
- Test: `src/docs-contract.test.ts`

- [ ] **Step 1: Re-run the targeted runtime catalog tests until they pass**
- [ ] **Step 2: Rebuild docs to confirm the generated reference page renders cleanly**

### Task 5: Final package verification

**Files:**
- Verify only

- [ ] **Step 1: Run `pnpm test`**
- [ ] **Step 2: Run `pnpm typecheck`**
- [ ] **Step 3: Run `pnpm build`**
- [ ] **Step 4: Run `pnpm docs:build`**
