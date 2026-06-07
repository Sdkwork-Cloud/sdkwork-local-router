# UI Framework Semantic Callback Types Contract Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ensure public semantic data callbacks are published through named exported `*Renderer`, `*Resolver`, or `*Handler` contracts instead of anonymous inline function signatures.

**Architecture:** Add a source audit that inspects governed public semantic callback fields on UI and pattern contracts, require those fields to reference named exported callback types that stay published through public barrels and the root package, and converge the main data-driven components and picker patterns on explicit reusable callback contracts.

**Tech Stack:** React 19, TypeScript, Vitest, SDKWORK UI components

---

### Task 1: Add the failing semantic callback audit

**Files:**
- Create: `src/public-semantic-callback-types-contract.test.ts`

- [ ] **Step 1: Audit governed semantic callback fields**

Fail when public semantic callback fields such as `renderItem`, `renderSection`, `renderLabel`, `renderActions`, `rowActions`, `cell`, `get*`, `confirmLabel`, `selectionSummary`, or `loadChildren` expose:
- an anonymous inline function type
- an inline function branch inside a public union type
- a named callback type that is not exported through the owning barrel and root package
- a named callback type that does not resolve through `*Renderer`, `*Resolver`, or `*Handler`

- [ ] **Step 2: Run the focused audit**

Run:
- `pnpm test -- --run src/public-semantic-callback-types-contract.test.ts`

Expected: FAIL until anonymous public semantic callback types are removed.

### Task 2: Converge governed public contracts

**Files:**
- Modify: `src/components/ui/data-display/data-grid.tsx`
- Modify: `src/components/ui/data-display/data-table.tsx`
- Modify: `src/components/ui/data-display/tree.tsx`
- Modify: `src/components/patterns/picker/EntityPickerDialog.tsx`
- Modify: `src/components/patterns/picker/TwoPaneSelectorPopover.tsx`

- [ ] **Step 1: Export named callback helper types**

Introduce explicit exported renderer, resolver, and handler contracts for data-driven rendering, identity, labeling, badges, descriptions, selection summaries, and async child loading.

- [ ] **Step 2: Rewire public props to those contracts**

Update governed public props and column contracts so semantic callback fields reference only exported named `*Renderer`, `*Resolver`, or `*Handler` types.

- [ ] **Step 3: Re-run focused verification**

Run:
- `pnpm test -- --run src/public-semantic-callback-types-contract.test.ts`
- `pnpm typecheck`

Expected: PASS

### Task 3: Publish the rule

**Files:**
- Modify: `docs/reference/framework-governance.md`
- Create: `docs/plans/2026-04-02-ui-framework-semantic-callback-types-contract-plan.md`

- [ ] **Step 1: Add governance language**

Document that public semantic data callbacks are framework API and must resolve through named exported renderer, resolver, or handler contracts.

- [ ] **Step 2: Update audit coverage**

Add the semantic callback audit to the governance inventory and describe the drift it prevents.

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
