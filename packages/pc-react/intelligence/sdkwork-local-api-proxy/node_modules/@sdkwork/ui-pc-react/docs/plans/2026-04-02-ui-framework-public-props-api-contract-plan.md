# UI Framework Public Props API Contract Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Guarantee that every public `ComponentNameProps` contract is not only defined in source, but also published from the correct framework entrypoints.

**Architecture:** Reuse the catalog-governed component inventory and TypeScript module graph. Add an audit that checks each public component's props type is exported from its owning domain barrel, the aggregated UI or patterns barrel, and the root package entrypoint so runtime values and type contracts stay coupled.

**Tech Stack:** React 18, TypeScript, Vitest

---

### Task 1: Add the failing props publication audit

**Files:**
- Create: `src/public-props-api-contract.test.ts`

- [ ] **Step 1: Resolve public module exports through the TypeScript checker**
- [ ] **Step 2: Enumerate public components from the framework catalog**
- [ ] **Step 3: Fail when any `ComponentNameProps` contract is missing from its owning public entrypoints**

### Task 2: Publish the stronger rule

**Files:**
- Modify: `docs/reference/framework-governance.md`

- [ ] **Step 1: Clarify that public entrypoints must publish props contracts together with runtime components**
- [ ] **Step 2: Add the new props publication audit to governance coverage**

### Task 3: Verify the pass

**Files:**
- Verify only

- [ ] **Step 1: Run `pnpm test -- src/public-props-api-contract.test.ts`**
- [ ] **Step 2: Run `pnpm typecheck`**
- [ ] **Step 3: Run `pnpm test`**
- [ ] **Step 4: Run `pnpm build`**
