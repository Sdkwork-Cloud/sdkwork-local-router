# UI Framework Pattern Slot Props Contract Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Standardize composite pattern customization on a single framework-grade `slotProps` contract so internal regions and delegated lower surfaces stay explicit, typed, and auditable.

**Architecture:** Add both source and runtime governance audits, introduce shared data-attribute-aware slot typing, migrate composite pattern shells away from ad hoc region props, and document a one-slot-one-surface standard aligned with modern slot-based UI frameworks.

**Tech Stack:** React 19, TypeScript, Vitest, Testing Library, SDKWORK UI patterns

---

### Task 1: Add failing slot-props governance audits

**Files:**
- Create: `src/pattern-slot-props-api-contract.test.ts`
- Create: `src/pattern-slot-props-contract.test.tsx`
- Modify: `docs/reference/framework-governance.md`

- [ ] **Step 1: Add a source audit for public pattern props**

Fail when exported composite pattern props:
- still publish ad hoc internal `*ClassName` props
- omit `slotProps` even though the pattern exposes stable internal regions

- [ ] **Step 2: Add a runtime audit for slot forwarding**

Render representative desktop, workspace, overlay, and picker patterns with probe props and assert:
- `className`
- `style`
- `id`
- `data-*`

land on the exact internal or delegated region each slot claims to represent.

- [ ] **Step 3: Run the focused audits to verify they fail**

Run:
- `pnpm test -- src/pattern-slot-props-api-contract.test.ts`
- `pnpm test -- src/pattern-slot-props-contract.test.tsx`

Expected: FAIL until composite pattern contracts and implementations converge on the new slot model.

### Task 2: Introduce shared slot typing and migrate composite patterns

**Files:**
- Modify: `src/components/patterns/_internal/slot-props.ts`
- Modify: `src/components/patterns/command/SearchCommandPalette.tsx`
- Modify: `src/components/patterns/desktop-shell/DesktopAppHeader.tsx`
- Modify: `src/components/patterns/desktop-shell/DesktopShellFrame.tsx`
- Modify: `src/components/patterns/desktop-shell/DesktopTitleBar.tsx`
- Modify: `src/components/patterns/detail/DetailDrawer.tsx`
- Modify: `src/components/patterns/detail/OperationDrawer.tsx`
- Modify: `src/components/patterns/picker/AnchoredPickerSurface.tsx`
- Modify: `src/components/patterns/picker/EntityPickerDialog.tsx`
- Modify: `src/components/patterns/picker/PickerDialog.tsx`
- Modify: `src/components/patterns/picker/TwoPaneSelectorPopover.tsx`
- Modify: `src/components/patterns/workbench/CrudWorkbench.tsx`
- Modify: `src/components/patterns/workbench/ManagementWorkbench.tsx`
- Modify: `src/components/patterns/workspace/InspectorRail.tsx`
- Modify: `src/components/patterns/workspace/ListDetailWorkspace.tsx`
- Modify: `src/components/patterns/workspace/WorkspacePanel.tsx`
- Modify: `src/components/patterns/workspace/WorkspaceScaffold.tsx`

- [ ] **Step 1: Add a shared data-attribute-aware slot type helper**

Define a reusable helper so slot props accept the native lower-surface props plus `data-*` attributes without per-component widening hacks.

- [ ] **Step 2: Migrate composite pattern props to structured slot props**

Replace scattered region-specific public props with stable named `slotProps` keys for:
- internal layout regions
- delegated overlay surfaces
- composition-specific item and section regions

- [ ] **Step 3: Enforce one slot name per owned surface**

Patch composite patterns so one slot key never targets multiple DOM layers. If a wrapper owns both a delegated surface and a composition root, give them distinct slot names.

- [ ] **Step 4: Re-run focused audits**

Run:
- `pnpm typecheck`
- `pnpm test -- src/pattern-slot-props-api-contract.test.ts`
- `pnpm test -- src/pattern-slot-props-contract.test.tsx`

Expected: PASS

### Task 3: Publish the framework rule

**Files:**
- Modify: `docs/reference/framework-governance.md`
- Modify: `docs/reference/package.md`

- [ ] **Step 1: Add the hard governance contract**

Document that composite patterns:
- keep root props on the direct surface
- use `slotProps` for named internal and delegated surfaces
- forbid ad hoc top-level internal `*ClassName` props
- require one slot name per owned surface

- [ ] **Step 2: Add package-level authoring guidance**

Show how consumers should combine root props and `slotProps` when customizing framework patterns.

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
