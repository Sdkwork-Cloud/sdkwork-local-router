# UI Framework Named Slot Props Contract Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ensure every public `slotProps` surface is published through an explicit named `*SlotProps` contract instead of anonymous inline object shapes.

**Architecture:** Add a source audit that inspects public UI and pattern props contracts for `slotProps`, require those fields to reference named exported `*SlotProps` contracts that remain published through the root package, and converge remaining offenders on explicit exported slot prop types.

**Tech Stack:** React 19, TypeScript, Vitest, SDKWORK UI components

---

### Task 1: Add the failing slot contract audit

**Files:**
- Create: `src/public-slot-props-api-contract.test.ts`

- [ ] **Step 1: Audit public slotProps contract shapes**

Fail when a public `*Props` contract exposes `slotProps` through:
- an anonymous inline object type
- a referenced type that is not named `*SlotProps`
- a named `*SlotProps` type that is not exported through the owning public barrel and root package

- [ ] **Step 2: Run the focused audit**

Run:
- `pnpm test -- src/public-slot-props-api-contract.test.ts`

Expected: FAIL until anonymous public slot contracts are removed.

### Task 2: Converge offending public contracts

**Files:**
- Modify: `src/components/patterns/workbench/CrudWorkbench.tsx`

- [ ] **Step 1: Replace anonymous public slotProps shapes**

Introduce explicit exported `ComponentNameSlotProps` contracts where public props still inline slot objects, starting with `CrudWorkbench`.

- [ ] **Step 2: Re-run focused verification**

Run:
- `pnpm test -- src/public-slot-props-api-contract.test.ts`
- `pnpm typecheck`

Expected: PASS

### Task 3: Publish the rule

**Files:**
- Modify: `docs/reference/framework-governance.md`

- [ ] **Step 1: Add governance language**

Document that public `slotProps` surfaces are first-class framework API and must use explicit exported `*SlotProps` contracts.

- [ ] **Step 2: Update audit coverage**

Add the new source audit to the governance audit inventory and describe the failure mode it prevents.

### Task 4: Full verification

**Files:**
- Verify only

- [ ] **Step 1: Run package typecheck**

Run: `pnpm typecheck`
Expected: PASS

- [ ] **Step 2: Run full test suite**

Run: `pnpm test`
Expected: PASS

- [ ] **Step 3: Run production build**

Run: `pnpm build`
Expected: PASS

- [ ] **Step 4: Run docs build**

Run: `pnpm docs:build`
Expected: PASS
