# UI Framework Collection Surface Contract Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Standardize collection-style UI components so repeated item surfaces, interior item regions, and collection containers follow one framework-grade customization contract.

**Architecture:** Add dedicated governance audits for collection-style UI components, introduce structured container `slotProps` and repeated item `get*Props` or item-level `slotProps` contracts where appropriate, migrate the remaining collection components away from semantic-only surface customization, and publish the rule in framework governance docs.

**Tech Stack:** React 19, TypeScript, Vitest, Testing Library, SDKWORK UI components

---

### Task 1: Add failing collection governance audits

**Files:**
- Create: `src/ui-collection-surface-api-contract.test.ts`
- Create: `src/ui-collection-surface-contract.test.tsx`
- Modify: `docs/reference/framework-governance.md`

- [ ] **Step 1: Add a source audit for public collection contracts**

Fail when governed collection components:
- do not publish container `slotProps` where they own named lower regions
- do not publish repeated item surface callbacks such as `getItemProps` or `getItemSlotProps` when they render data-driven item collections
- do not publish item-level `slotProps` on public item components that own internal regions

- [ ] **Step 2: Add a runtime audit for repeated surface forwarding**

Render representative collection components and assert that structured container props, repeated item props, and item-level slot props land on the exact owned surfaces they claim to represent.

- [ ] **Step 3: Run the focused audits to verify they fail**

Run:
- `pnpm test -- src/ui-collection-surface-api-contract.test.ts`
- `pnpm test -- src/ui-collection-surface-contract.test.tsx`

Expected: FAIL until the governed collection components converge on the new API.

### Task 2: Migrate governed collection components

**Files:**
- Modify: `src/components/ui/data-display/tree.tsx`
- Modify: `src/components/ui/data-display/timeline.tsx`
- Modify: `src/components/ui/feedback/activity-feed.tsx`
- Modify: `src/components/ui/navigation/stepper.tsx`
- Modify: `src/components/ui/data-display/Tree.test.tsx`
- Modify: `src/components/ui/data-display/Timeline.test.tsx`
- Modify: `src/components/ui/feedback/ActivityFeed.test.tsx`
- Modify: `src/components/ui/navigation/Stepper.test.tsx`

- [ ] **Step 1: Standardize tree collection surfaces**

Add container `slotProps` and structured repeated item surface callbacks to `RichTree` so tree item roots and owned item regions accept full native props and `data-*` attributes.

- [ ] **Step 2: Standardize timeline collection surfaces**

Add repeated item root and repeated item slot contracts so timeline item, indicator, connector, and content surfaces can be customized without app-local wrappers.

- [ ] **Step 3: Standardize activity feed collection surfaces**

Add container `slotProps`, repeated item callbacks, and item-level slot contracts so feed header, list, empty state, item roots, indicators, panels, and action regions all follow the same framework model.

- [ ] **Step 4: Standardize stepper collection surfaces**

Add repeated item callbacks at the stepper level and internal `slotProps` at the `StepperItem` level so collection-wide and per-item customization both land on exact item surfaces.

- [ ] **Step 5: Re-run focused verification**

Run:
- `pnpm test -- src/ui-collection-surface-api-contract.test.ts`
- `pnpm test -- src/ui-collection-surface-contract.test.tsx`
- `pnpm typecheck`

Expected: PASS

### Task 3: Publish the framework rule

**Files:**
- Modify: `docs/reference/framework-governance.md`
- Modify: `docs/reference/package.md`

- [ ] **Step 1: Add the hard governance contract**

Document that collection-style UI components use:
- root props for the collection root
- container `slotProps` for named lower regions
- repeated item `get*Props` or `get*SlotProps` for data-driven item surfaces
- item-level `slotProps` on public collection item components that own internal regions

- [ ] **Step 2: Add package-level usage guidance**

Show consumers how to customize tree rows, timeline items, activity feed items, and stepper internals without falling back to ad hoc wrappers or app-local CSS hooks.

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
