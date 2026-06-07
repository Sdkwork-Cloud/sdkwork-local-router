# UI Framework Pattern Direct Surface Ref Contract Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ensure every public pattern component that directly owns an intrinsic DOM surface carrying its exact `data-sdk-pattern` marker also exposes a framework-grade `ref` contract by using `React.forwardRef` and attaching the ref to that same surface.

**Architecture:** Add a focused source audit over public pattern exports, then converge all direct-surface offenders on one authoring rule: the exact intrinsic marked pattern root must remain the metadata surface, prop surface, and ref surface at the same time. Preserve existing exemptions for delegated wrappers and public exports that do not own an intrinsic marked surface.

**Tech Stack:** React 19, TypeScript, Vitest, SDKWORK UI patterns

---

### Task 1: Add the failing pattern direct-surface ref audit

**Files:**
- Create: `src/pattern-direct-surface-ref-contract.test.ts`

- [ ] **Step 1: Audit governed public pattern exports**

Fail when a public pattern export published through `src/components/patterns/index.ts` directly owns an intrinsic DOM surface with its exact `data-sdk-pattern` identity but is not declared with `React.forwardRef`.

- [ ] **Step 2: Scope explicit exemptions**

Skip only pattern exports that do not themselves own an intrinsic marked surface. Delegated wrappers, abstract shells, and lower-surface compositions stay governed by their existing root and slot contracts until they render their own intrinsic marked root.

- [ ] **Step 3: Run the focused audit**

Run:
- `pnpm test -- --run src/pattern-direct-surface-ref-contract.test.ts`

Expected: FAIL until every governed direct-surface pattern forwards its ref correctly.

### Task 2: Converge pattern direct-surface components

**Files:**
- Modify: `src/components/patterns/app-shell/AppShell.tsx`
- Modify: `src/components/patterns/app-shell/NavigationRail.tsx`
- Modify: `src/components/patterns/app-shell/PageHeader.tsx`
- Modify: `src/components/patterns/desktop-shell/DesktopAppHeader.tsx`
- Modify: `src/components/patterns/desktop-shell/DesktopShellFrame.tsx`
- Modify: `src/components/patterns/desktop-shell/DesktopTitleBar.tsx`
- Modify: `src/components/patterns/desktop-shell/DesktopWindowControls.tsx`
- Modify: `src/components/patterns/detail/DetailDrawer.tsx`
- Modify: `src/components/patterns/detail/OperationDrawer.tsx`
- Modify: `src/components/patterns/picker/AnchoredPickerSurface.tsx`
- Modify: `src/components/patterns/picker/EntityPickerDialog.tsx`
- Modify: `src/components/patterns/picker/PickerDialog.tsx`
- Modify: `src/components/patterns/picker/PickerSelectionFooter.tsx`
- Modify: `src/components/patterns/picker/TwoPaneSelectorPopover.tsx`
- Modify: `src/components/patterns/settings/SettingsCenter.tsx`
- Modify: `src/components/patterns/workbench/ManagementWorkbench.tsx`
- Modify: `src/components/patterns/workspace/InspectorPanel.tsx`
- Modify: `src/components/patterns/workspace/InspectorRail.tsx`
- Modify: `src/components/patterns/workspace/ListDetailWorkspace.tsx`
- Modify: `src/components/patterns/workspace/SectionHeader.tsx`
- Modify: `src/components/patterns/workspace/WorkspacePanel.tsx`
- Modify: `src/components/patterns/workspace/WorkspaceScaffold.tsx`

- [ ] **Step 1: Forward refs on owned direct pattern surfaces**

Convert every governed public direct-surface pattern to `React.forwardRef` and attach the ref to the same intrinsic root node that carries the exact `data-sdk-pattern` marker.

- [ ] **Step 2: Preserve generic public APIs**

Where governed pattern components are generic, preserve their public generic call ergonomics while still satisfying the framework authoring contract around explicit exported `ComponentNameProps`.

- [ ] **Step 3: Re-run focused verification**

Run:
- `pnpm test -- --run src/pattern-direct-surface-ref-contract.test.ts`
- `pnpm test -- --run src/components/ui/authoring-contract.test.ts src/barrel-contract.test.ts`
- `pnpm typecheck`

Expected: PASS

### Task 3: Publish the rule

**Files:**
- Modify: `docs/reference/framework-governance.md`
- Create: `docs/plans/2026-04-02-ui-framework-pattern-direct-surface-ref-contract-plan.md`

- [ ] **Step 1: Add governance language**

Document that public pattern components owning an exact intrinsic marked surface must use `React.forwardRef` and keep the ref attached to that same surface.

- [ ] **Step 2: Update audit coverage**

Add the pattern direct-surface ref audit to the governance inventory and describe the drift it prevents.

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
