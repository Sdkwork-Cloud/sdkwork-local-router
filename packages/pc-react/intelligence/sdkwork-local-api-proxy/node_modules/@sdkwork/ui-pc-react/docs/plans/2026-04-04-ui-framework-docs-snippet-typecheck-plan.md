# UI Framework Documentation Snippet Typecheck Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Typecheck all framework-backed TypeScript and TSX documentation snippets against local source entrypoints so package examples stay executable instead of drifting into illustrative pseudocode.

**Architecture:** Reuse the documented-files inventory and package subpath contract. Extract package-backed code blocks from README, guide, and reference docs, rewrite framework package imports to the owning local source entrypoints, and run a dedicated TypeScript program over the synthetic snippets inside a temporary workspace.

**Tech Stack:** React 19, TypeScript 6, Vitest, Node.js filesystem utilities

---

### Task 1: Add the failing docs snippet contract

**Files:**
- Create: `src/docs-snippet-typecheck-contract.test.ts`

- [ ] **Step 1: Extract package-backed TypeScript and TSX snippets from governed docs**
- [ ] **Step 2: Write a failing contract test that expects those snippets to typecheck**
- [ ] **Step 3: Run the targeted test and confirm it fails before snippet import rewriting exists**

### Task 2: Implement snippet extraction and local import rewriting

**Files:**
- Modify: `src/docs-snippet-typecheck-contract.test.ts`
- Modify: `src/docs-contract.test.ts` if shared helpers become worthwhile

- [ ] **Step 1: Rewrite `@sdkwork/ui-pc-react` package imports to local source entrypoints**
- [ ] **Step 2: Typecheck the synthetic snippets with project compiler options**
- [ ] **Step 3: Add stable coverage assertions so parser regressions fail loudly**

### Task 3: Final verification

**Files:**
- Verify only

- [ ] **Step 1: Run the targeted docs snippet contract test**
- [ ] **Step 2: Run `pnpm test`**
- [ ] **Step 3: Run `pnpm typecheck`**
- [ ] **Step 4: Run `pnpm build`**
- [ ] **Step 5: Run `pnpm docs:build`**
