# UI Framework Governance Matrix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a generated governance matrix so every framework contract is cross-indexed with its enforcing tests and related reference pages from one auditable source.

**Architecture:** Reuse the existing generated-docs workflow. Parse the authoritative contract headings from `docs/reference/framework-governance.md`, join them with a structured registry of enforcing test files and related references, emit a deterministic matrix page, and guard synchronization with docs contract tests.

**Tech Stack:** React 19, TypeScript 6, Vite, Vitest, VitePress, Node.js scripts

---

### Task 1: Add the failing generated-doc contract

**Files:**
- Create: `src/framework-governance-matrix-docs-contract.test.ts`
- Modify: `src/docs-contract.test.ts`

- [ ] **Step 1: Write a contract test that expects a generated governance matrix page to exist**
- [ ] **Step 2: Add representative assertions for theme, runtime identity, structured surface, and publication governance coverage**
- [ ] **Step 3: Extend the docs contract to govern the new generated page**
- [ ] **Step 4: Run the targeted tests and confirm they fail because the generator and artifact do not exist yet**

### Task 2: Implement the governance matrix generator

**Files:**
- Create: `scripts/generate-framework-governance-matrix.mjs`
- Modify: `package.json`

- [ ] **Step 1: Parse governance contract headings from `docs/reference/framework-governance.md`**
- [ ] **Step 2: Join the parsed headings with a structured registry of audit tests and related references**
- [ ] **Step 3: Emit deterministic markdown under `docs/reference/`**
- [ ] **Step 4: Extend the docs generation command so the matrix is regenerated with the other framework catalogs**

### Task 3: Publish the generated reference page

**Files:**
- Create: `docs/reference/framework-governance-matrix.md`
- Modify: `docs/.vitepress/config.ts`
- Modify: `docs/index.md`
- Modify: `docs/reference/framework-governance.md`
- Modify: `docs/reference/package.md`
- Modify: `README.md`

- [ ] **Step 1: Generate the initial governance matrix page**
- [ ] **Step 2: Add the page to reference navigation and top-level docs entry surfaces**
- [ ] **Step 3: Link governance and package reference docs to the generated matrix**

### Task 4: Verify synchronization

**Files:**
- Test: `src/framework-governance-matrix-docs-contract.test.ts`
- Test: `src/docs-contract.test.ts`

- [ ] **Step 1: Re-run the targeted governance matrix tests until they pass**
- [ ] **Step 2: Rebuild docs to confirm the generated page renders cleanly**

### Task 5: Final package verification

**Files:**
- Verify only

- [ ] **Step 1: Run `pnpm test`**
- [ ] **Step 2: Run `pnpm typecheck`**
- [ ] **Step 3: Run `pnpm build`**
- [ ] **Step 4: Run `pnpm docs:build`**
