# UI Framework Direct Surface Ref Contract Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ensure every public UI runtime component that directly owns an intrinsic DOM surface carrying its exact `data-sdk-ui` marker also exposes a framework-grade `ref` contract by using `React.forwardRef` and attaching the ref to that same surface.

**Architecture:** Add a focused source audit over public UI runtime exports, then converge all direct-surface offenders on a single authoring rule: the exact intrinsic marked root must remain the prop surface, metadata surface, and ref surface at the same time. Preserve existing exemptions for abstract roots, portals, and no-DOM primitives.

**Tech Stack:** React 19, TypeScript, Vitest, SDKWORK UI components

---

### Task 1: Add the failing direct-surface ref audit

**Files:**
- Create: `src/ui-direct-surface-ref-contract.test.ts`

- [ ] **Step 1: Audit governed public UI runtime exports**

Fail when a public UI runtime export published through `src/components/ui/index.ts` directly owns an intrinsic DOM surface with its exact `data-sdk-ui` identity but is not declared with `React.forwardRef`.

- [ ] **Step 2: Scope explicit exemptions**

Allow abstract roots, portals, providers, and other no-DOM public primitives only through explicit classification in the audit instead of implicit skipping.

- [ ] **Step 3: Run the focused audit**

Run:
- `pnpm test -- --run src/ui-direct-surface-ref-contract.test.ts`

Expected: FAIL until every governed direct surface forwards its ref correctly.

### Task 2: Converge direct-surface UI components

**Files:**
- Modify: `src/components/ui/actions/bulk-action-bar.tsx`
- Modify: `src/components/ui/actions/command.tsx`
- Modify: `src/components/ui/badge.tsx`
- Modify: `src/components/ui/breadcrumb.tsx`
- Modify: `src/components/ui/data-display/data-grid.tsx`
- Modify: `src/components/ui/data-display/data-table.tsx`
- Modify: `src/components/ui/data-display/tree.tsx`
- Modify: `src/components/ui/data-entry/combobox.tsx`
- Modify: `src/components/ui/data-entry/upload/file-upload.tsx`
- Modify: `src/components/ui/dialog.tsx`
- Modify: `src/components/ui/dropdown-menu.tsx`
- Modify: `src/components/ui/feedback/empty-search.tsx`
- Modify: `src/components/ui/feedback/inline-alert.tsx`
- Modify: `src/components/ui/feedback/states.tsx`
- Modify: `src/components/ui/navigation/menubar.tsx`
- Modify: `src/components/ui/overlays/context-menu.tsx`
- Modify: `src/components/ui/overlays/drawer.tsx`
- Modify: `src/components/ui/overlays/modal.tsx`
- Modify: `src/components/ui/pagination.tsx`

- [ ] **Step 1: Forward refs on owned direct surfaces**

Convert every governed public direct-surface component to `React.forwardRef` and attach the ref to the same intrinsic root node that carries the exact `data-sdk-ui` marker.

- [ ] **Step 2: Preserve generic public APIs**

Where governed components are generic collections such as `DataGrid` and `DataTable`, preserve public generic call ergonomics while still satisfying the framework authoring contract around explicit exported `ComponentNameProps`.

- [ ] **Step 3: Re-run focused verification**

Run:
- `pnpm test -- --run src/ui-direct-surface-ref-contract.test.ts`
- `pnpm typecheck`

Expected: PASS

### Task 3: Publish the rule

**Files:**
- Modify: `docs/reference/framework-governance.md`
- Create: `docs/plans/2026-04-02-ui-framework-direct-surface-ref-contract-plan.md`

- [ ] **Step 1: Add governance language**

Document that public UI runtime components owning an exact intrinsic marked surface must use `React.forwardRef` and keep the ref attached to that same surface.

- [ ] **Step 2: Update audit coverage**

Add the direct-surface ref audit to the governance inventory and describe the drift it prevents.

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
