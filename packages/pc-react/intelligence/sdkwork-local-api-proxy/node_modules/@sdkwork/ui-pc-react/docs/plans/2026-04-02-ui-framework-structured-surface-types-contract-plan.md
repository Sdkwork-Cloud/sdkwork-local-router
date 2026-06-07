# UI Framework Structured Surface Types Contract Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ensure every governed public structured surface API is published through explicit named exported `*Props` or `*PropsResolver` contracts instead of anonymous inline function or helper types.

**Architecture:** Add a source audit that inspects public UI and pattern contracts for structured surface fields such as `getItemProps`, `getItemSlotProps`, `getRowProps`, `headerProps`, and `cellProps`, require those fields to reference named exported contracts that stay published through the package root, and converge remaining offenders on reusable exported helper types.

**Tech Stack:** React 19, TypeScript, Vitest, SDKWORK UI components

---

### Task 1: Add the failing structured surface type audit

**Files:**
- Create: `src/public-structured-surface-types-contract.test.ts`

- [ ] **Step 1: Audit public structured surface fields**

Fail when a public structured surface field exposes:
- an anonymous inline function type
- an anonymous inline object type
- a raw imported helper such as `SlotProps<...>` instead of a named exported framework contract
- a named structured surface helper type that is missing from the owning barrel or root package entrypoint

- [ ] **Step 2: Run the focused audit**

Run:
- `pnpm test -- --run src/public-structured-surface-types-contract.test.ts`

Expected: FAIL until every governed structured surface field references named exported types.

### Task 2: Converge offending public contracts

**Files:**
- Modify: `src/components/ui/data-display/data-table.tsx`
- Modify: `src/components/ui/data-display/timeline.tsx`
- Modify: `src/components/ui/data-display/tree.tsx`
- Modify: `src/components/ui/feedback/activity-feed.tsx`
- Modify: `src/components/ui/feedback/notification-center.tsx`
- Modify: `src/components/ui/navigation/stepper.tsx`
- Modify: `src/components/ui/navigation/workspace-tabs.tsx`

- [ ] **Step 1: Export named structured surface helper types**

Introduce explicit exported root prop and resolver types for governed repeated surfaces, including row/item root props and item/row prop resolver contracts.

- [ ] **Step 2: Rewire public props to those contracts**

Update public props interfaces and column/item contracts so governed structured surface fields reference only named exported `*Props` or `*PropsResolver` types.

- [ ] **Step 3: Re-run focused verification**

Run:
- `pnpm test -- --run src/public-structured-surface-types-contract.test.ts`
- `pnpm typecheck`

Expected: PASS

### Task 3: Publish the rule

**Files:**
- Modify: `docs/reference/framework-governance.md`
- Create: `docs/plans/2026-04-02-ui-framework-structured-surface-types-contract-plan.md`

- [ ] **Step 1: Add governance language**

Document that public structured surface fields are framework API and must resolve through explicit exported `*Props` or `*PropsResolver` contracts.

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
