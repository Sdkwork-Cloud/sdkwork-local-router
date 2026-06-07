# UI Framework Event Handler Types Contract Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ensure all exported public `on*` framework props are published through explicit named exported `*Handler` contracts instead of anonymous inline callbacks.

**Architecture:** Add a source audit that inspects public UI and pattern `*Props` contracts for `on*` fields, require those fields to reference named exported `*Handler` types that remain published through the owning barrel and root package, and converge the current public event callback surface on reusable module-local handler contracts.

**Tech Stack:** React 19, TypeScript, Vitest, SDKWORK UI components

---

### Task 1: Add the failing event handler audit

**Files:**
- Create: `src/public-event-handler-types-contract.test.ts`

- [ ] **Step 1: Audit public event handler fields**

Fail when exported public `*Props` contracts expose `on*` fields through:
- anonymous inline function types
- inline function branches inside public union types
- named callback types that do not end with `Handler`
- named callback types that are not published through the owning barrel and root package

- [ ] **Step 2: Run the focused audit**

Run:
- `pnpm test -- --run src/public-event-handler-types-contract.test.ts`

Expected: FAIL until anonymous public event handlers are removed.

### Task 2: Converge public handler contracts

**Files:**
- Modify: `src/components/ui/actions/action-menu-button.tsx`
- Modify: `src/components/ui/actions/bulk-action-bar.tsx`
- Modify: `src/components/ui/actions/split-button.tsx`
- Modify: `src/components/ui/data-display/data-table.tsx`
- Modify: `src/components/ui/data-display/tree.tsx`
- Modify: `src/components/ui/data-entry/combobox.tsx`
- Modify: `src/components/ui/data-entry/number-input.tsx`
- Modify: `src/components/ui/data-entry/segmented-control.tsx`
- Modify: `src/components/ui/data-entry/tag-input.tsx`
- Modify: `src/components/ui/data-entry/upload/upload-types.ts`
- Modify: `src/components/ui/feedback/activity-feed.tsx`
- Modify: `src/components/ui/feedback/empty-search.tsx`
- Modify: `src/components/ui/feedback/notification-center.tsx`
- Modify: `src/components/ui/form/settings-field.tsx`
- Modify: `src/components/ui/layout/sidebar-section.tsx`
- Modify: `src/components/ui/navigation/workspace-tabs.tsx`
- Modify: `src/components/ui/overlays/modal.tsx`
- Modify: `src/components/patterns/command/SearchCommandPalette.tsx`
- Modify: `src/components/patterns/picker/EntityPickerDialog.tsx`
- Modify: `src/components/patterns/picker/PickerSelectionFooter.tsx`
- Modify: `src/components/patterns/picker/TwoPaneSelectorPopover.tsx`
- Modify: `src/components/patterns/settings/SettingsCenter.tsx`
- Modify: `src/components/patterns/system/RestartRequiredNotice.tsx`

- [ ] **Step 1: Export named handler helper types**

Introduce explicit exported `*Handler` contracts for open state changes, selection changes, value changes, close/reset/clear actions, confirm flows, and item selection events.

- [ ] **Step 2: Rewire public props to those handlers**

Update public props contracts so every governed `on*` field references a named exported handler type.

- [ ] **Step 3: Re-run focused verification**

Run:
- `pnpm test -- --run src/public-event-handler-types-contract.test.ts`
- `pnpm typecheck`

Expected: PASS

### Task 3: Publish the rule

**Files:**
- Modify: `docs/reference/framework-governance.md`
- Create: `docs/plans/2026-04-02-ui-framework-event-handler-types-contract-plan.md`

- [ ] **Step 1: Add governance language**

Document that public `on*` event handlers are framework API and must resolve through explicit named `*Handler` contracts.

- [ ] **Step 2: Update audit coverage**

Add the new event handler audit to the governance inventory and describe the drift it prevents.

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
