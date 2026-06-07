# UI Framework Publication Contract Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn package publication metadata and documentation imports into audited framework contracts so published entrypoints, stylesheet delivery, and docs examples cannot drift apart.

**Architecture:** Introduce a shared publication contract that defines every public subpath, build entry, and stylesheet export in one place. Drive Vite library entry wiring from that contract, validate `package.json` against it, require explicit CSS-only `sideEffects` metadata, and add a docs audit that verifies README export inventory plus every documented import statement against the real source modules.

**Tech Stack:** React 18, TypeScript, Vitest, Vite, VitePress

---

### Task 1: Centralize the package publication contract

**Files:**
- Create: `build/package-contract.ts`
- Modify: `vite.config.ts`

- [ ] **Step 1: Define the complete public subpath inventory, build entry names, and output paths in one shared contract**
- [ ] **Step 2: Make Vite library entries derive from the shared contract instead of a duplicated inline map**
- [ ] **Step 3: Keep the stylesheet export as an explicit separate asset entry**

### Task 2: Audit package metadata

**Files:**
- Modify: `package.json`
- Create: `src/package-publish-contract.test.ts`

- [ ] **Step 1: Add explicit CSS-only `sideEffects` metadata**
- [ ] **Step 2: Fail when `package.json` files, export map, or legacy root fields drift from the shared contract**
- [ ] **Step 3: Fail when any public JavaScript entrypoint starts importing CSS side effects**

### Task 3: Audit documentation imports

**Files:**
- Create: `src/docs-contract.test.ts`
- Modify: `README.md`
- Modify: `docs/reference/package.md`

- [ ] **Step 1: Verify README export inventory matches the real package export map**
- [ ] **Step 2: Verify every documented package import targets a published subpath**
- [ ] **Step 3: Verify every documented imported symbol exists in the real source module, including type exports**

### Task 4: Publish the stronger framework rule

**Files:**
- Modify: `docs/reference/framework-governance.md`

- [ ] **Step 1: Add a publication contract section covering export maps, stylesheet side effects, and docs import accuracy**
- [ ] **Step 2: Add the new publication and docs audits to governance coverage**

### Task 5: Verify the pass

**Files:**
- Verify only

- [ ] **Step 1: Run `pnpm test -- src/package-publish-contract.test.ts src/docs-contract.test.ts`**
- [ ] **Step 2: Run `pnpm typecheck`**
- [ ] **Step 3: Run `pnpm test`**
- [ ] **Step 4: Run `pnpm build`**
- [ ] **Step 5: Run `pnpm docs:build`**
