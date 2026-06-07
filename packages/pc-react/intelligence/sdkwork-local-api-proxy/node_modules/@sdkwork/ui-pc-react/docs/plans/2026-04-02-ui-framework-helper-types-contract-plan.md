# UI Framework Helper Types Contract Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ensure every exported public framework contract publishes its same-module named helper types instead of hiding public type dependencies behind private local aliases or interfaces.

**Architecture:** Add a source audit that inspects exported public UI and pattern type contracts, resolve named same-file helper types used inside those public declarations, require those helpers to be explicitly exported and published through the owning barrel and root package, and converge current public slot/helper/base prop surfaces on explicit reusable exported helper contracts.

**Tech Stack:** React 19, TypeScript, Vitest, SDKWORK UI components

---

### Task 1: Add the failing helper type audit

**Files:**
- Create: `src/public-helper-types-contract.test.ts`

- [ ] **Step 1: Audit public helper type publication**

Fail when an exported public contract references a same-file named helper type that:
- is not explicitly exported from the source module
- is exported locally but not published through the owning barrel
- is published through the barrel but missing from the root package entrypoint

- [ ] **Step 2: Run the focused audit**

Run:
- `pnpm test -- --run src/public-helper-types-contract.test.ts`

Expected: FAIL until local private helper types are published.

### Task 2: Converge public helper type publication

**Files:**
- Modify: `src/components/ui/actions/split-button.tsx`
- Modify: `src/components/ui/data-display/data-grid.tsx`
- Modify: `src/components/ui/data-display/data-table.tsx`
- Modify: `src/components/ui/data-display/timeline.tsx`
- Modify: `src/components/ui/data-display/tree.tsx`
- Modify: `src/components/ui/data-entry/date-range-picker.tsx`
- Modify: `src/components/ui/feedback/activity-feed.tsx`
- Modify: `src/components/ui/feedback/notification-center.tsx`
- Modify: `src/components/ui/layout/panel-group.tsx`
- Modify: `src/components/ui/navigation/stepper.tsx`
- Modify: `src/components/ui/navigation/workspace-tabs.tsx`
- Modify: `src/components/patterns/command/SearchCommandPalette.tsx`
- Modify: `src/components/patterns/desktop-shell/DesktopAppHeader.tsx`
- Modify: `src/components/patterns/desktop-shell/DesktopShellFrame.tsx`
- Modify: `src/components/patterns/desktop-shell/DesktopTitleBar.tsx`
- Modify: `src/components/patterns/detail/OperationDrawer.tsx`
- Modify: `src/components/patterns/picker/AnchoredPickerSurface.tsx`
- Modify: `src/components/patterns/picker/EntityPickerDialog.tsx`
- Modify: `src/components/patterns/picker/PickerDialog.tsx`
- Modify: `src/components/patterns/picker/TwoPaneSelectorPopover.tsx`
- Modify: `src/components/patterns/workbench/ManagementWorkbench.tsx`
- Modify: `src/components/patterns/workspace/InspectorRail.tsx`
- Modify: `src/components/patterns/workspace/ListDetailWorkspace.tsx`
- Modify: `src/components/patterns/workspace/WorkspacePanel.tsx`
- Modify: `src/components/patterns/workspace/WorkspaceScaffold.tsx`

- [ ] **Step 1: Export referenced helper types**

Promote slot-region helpers, panel/group helpers, workspace direction helpers, and date-range shared props helpers into explicit exported contracts.

- [ ] **Step 2: Normalize newly public shared props**

Where helper props become public, ensure their callback members also resolve through named exported handler or resolver contracts instead of anonymous inline signatures.

- [ ] **Step 3: Re-run focused verification**

Run:
- `pnpm test -- --run src/public-helper-types-contract.test.ts src/public-event-handler-types-contract.test.ts`
- `pnpm typecheck`

Expected: PASS

### Task 3: Publish the rule

**Files:**
- Modify: `docs/reference/framework-governance.md`
- Create: `docs/plans/2026-04-02-ui-framework-helper-types-contract-plan.md`

- [ ] **Step 1: Add governance language**

Document that exported public framework contracts must publish named same-module helper types instead of relying on private local aliases or interfaces.

- [ ] **Step 2: Update audit coverage**

Add the new helper type audit to the governance inventory and describe the drift it prevents.

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
