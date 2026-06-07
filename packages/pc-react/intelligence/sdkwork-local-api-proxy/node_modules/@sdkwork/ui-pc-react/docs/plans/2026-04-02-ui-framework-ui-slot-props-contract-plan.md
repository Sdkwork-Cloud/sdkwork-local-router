# UI Framework Composite UI Slot Props Contract Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Standardize composite UI components on structured `slotProps` and surface-prop callbacks so delegated menu, dialog, grid, table, row, header, and cell surfaces follow one framework-grade customization model.

**Architecture:** Add source and runtime governance audits, introduce a shared slot-prop utility for framework-owned lower surfaces, migrate the remaining composite UI components away from isolated `*ClassName` escape hatches, and document the new contract in the framework rulebook.

**Tech Stack:** React 19, TypeScript, Vitest, Testing Library, SDKWORK UI components

---

### Task 1: Add failing governance audits

**Files:**
- Create: `src/ui-slot-props-api-contract.test.ts`
- Create: `src/ui-slot-props-contract.test.tsx`
- Modify: `docs/reference/framework-governance.md`

- [ ] **Step 1: Add a source audit for public composite UI contracts**

Fail when governed composite UI components:
- do not publish `slotProps`
- still expose isolated region hooks such as `menuClassName`, `contentClassName`, or `gridClassName`
- still expose narrow table row or column styling hooks such as `rowClassName` or `headerClassName`

- [ ] **Step 2: Add a runtime audit for slot forwarding**

Render representative composite UI components and assert that structured `slotProps` and `get*Props` land on the exact owned lower surfaces they represent.

- [ ] **Step 3: Run the focused audits to verify they fail**

Run:
- `pnpm test -- src/ui-slot-props-api-contract.test.ts`
- `pnpm test -- src/ui-slot-props-contract.test.tsx`

Expected: FAIL until the governed composite UI components converge on the new API.

### Task 2: Migrate governed composite UI components

**Files:**
- Create: `src/lib/slot-props.ts`
- Modify: `src/components/patterns/_internal/slot-props.ts`
- Modify: `src/components/ui/actions/action-menu-button.tsx`
- Modify: `src/components/ui/actions/command.tsx`
- Modify: `src/components/ui/actions/split-button.tsx`
- Modify: `src/components/ui/data-display/data-grid.tsx`
- Modify: `src/components/ui/data-display/data-table.tsx`
- Modify: `src/components/patterns/command/SearchCommandPalette.tsx`
- Modify: `src/components/patterns/workbench/CrudWorkbench.tsx`

- [ ] **Step 1: Promote shared slot utilities to a framework-wide location**

Expose one shared `mergeSlotProps` helper and one shared `SlotProps<T>` type for both UI and pattern layers.

- [ ] **Step 2: Replace isolated region hooks with `slotProps`**

Migrate:
- `ActionMenuButton`
- `SplitButton`
- `CommandDialog`
- `DataGrid`
- `DataTable`

away from ad hoc interior class hooks and onto named structured slots.

- [ ] **Step 3: Upgrade repeated table surfaces to full prop contracts**

Replace narrow row and column class hooks with:
- `getRowProps`
- `headerProps`
- `cellProps`

so data surfaces accept full native props and `data-*` attributes.

- [ ] **Step 4: Re-run focused verification**

Run:
- `pnpm test -- src/ui-slot-props-api-contract.test.ts`
- `pnpm test -- src/ui-slot-props-contract.test.tsx`
- `pnpm typecheck`

Expected: PASS

### Task 3: Publish the framework rule

**Files:**
- Modify: `docs/reference/framework-governance.md`
- Modify: `docs/reference/package.md`

- [ ] **Step 1: Add the hard governance contract**

Document that composite UI components use:
- root props for owned direct surfaces
- `slotProps` for named delegated or interior surfaces
- `get*Props` / `headerProps` / `cellProps` for repeated data surfaces

- [ ] **Step 2: Add package-level usage guidance**

Show consumers how to customize dropdown menus, dialog content, grids, and table surfaces without falling back to bespoke class hooks.

### Task 4: Full verification

**Files:**
- Verify only

- [ ] **Step 1: Run install boundary verification**

Run: `pnpm test -- src/install-contract.test.ts`
Expected: PASS

- [ ] **Step 2: Run package typecheck**

Run: `pnpm typecheck`
Expected: PASS

- [ ] **Step 3: Run full test suite**

Run: `pnpm test`
Expected: PASS

- [ ] **Step 4: Run production build**

Run: `pnpm build`
Expected: PASS

- [ ] **Step 5: Run docs build**

Run: `pnpm docs:build`
Expected: PASS
