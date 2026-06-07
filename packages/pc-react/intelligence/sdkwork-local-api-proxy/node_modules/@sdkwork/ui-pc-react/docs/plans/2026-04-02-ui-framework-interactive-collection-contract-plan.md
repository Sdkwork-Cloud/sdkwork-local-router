# UI Framework Interactive Collection Contract Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring the remaining interactive collection primitives onto the same framework-grade collection surface contract already used by tree, timeline, activity feed, and stepper.

**Architecture:** Extend collection governance audits to `NotificationCenter` and `WorkspaceTabs`, extract public item components for repeated interactive item surfaces, and standardize collection root slots, repeated item root props, and repeated item slot props on exact owned surfaces.

**Tech Stack:** React 19, TypeScript, Vitest, Testing Library, SDKWORK UI components

---

### Task 1: Add failing interactive collection audits

**Files:**
- Modify: `src/ui-collection-surface-api-contract.test.ts`
- Modify: `src/ui-collection-surface-contract.test.tsx`
- Modify: `src/components/ui/catalog.test.ts`

- [ ] **Step 1: Extend the source audit to interactive collections**

Fail when `NotificationCenter` or `WorkspaceTabs` do not publish:
- container `slotProps` for named non-root collection regions
- `getItemProps` for repeated item root surfaces
- `getItemSlotProps` for repeated item interior surfaces
- public item component `slotProps` contracts for the repeated interactive item components they own

- [ ] **Step 2: Extend runtime forwarding audits**

Render both collections and assert container slots, repeated item root props, and repeated item slot props all land on the exact surfaces they claim to represent.

- [ ] **Step 3: Verify the new audits fail before implementation**

Run:
- `pnpm test -- src/ui-collection-surface-api-contract.test.ts`
- `pnpm test -- src/ui-collection-surface-contract.test.tsx`
- `pnpm test -- src/components/ui/catalog.test.ts`

Expected: FAIL until the interactive collection components converge on the new contract.

### Task 2: Standardize interactive collection components

**Files:**
- Modify: `src/components/ui/feedback/notification-center.tsx`
- Modify: `src/components/ui/navigation/workspace-tabs.tsx`
- Modify: `src/components/ui/catalog.ts`

- [ ] **Step 1: Standardize notification center collection surfaces**

Extract `NotificationCenterItem`, rename the data item model to `NotificationCenterEntry`, and add collection root slots plus repeated item root and item slot forwarding for header, viewport, list, unread indicator, icon, title, description, time label, and action surfaces.

- [ ] **Step 2: Standardize workspace tabs collection surfaces**

Extract `WorkspaceTab`, add `WorkspaceTabCollectionItemState`, and standardize tab list, empty, actions, repeated item root, trigger, label, meta, modified indicator, icon, and close button surfaces.

- [ ] **Step 3: Re-run focused verification**

Run:
- `pnpm test -- src/ui-collection-surface-api-contract.test.ts`
- `pnpm test -- src/ui-collection-surface-contract.test.tsx`
- `pnpm test -- src/components/ui/catalog.test.ts`
- `pnpm typecheck`

Expected: PASS

### Task 3: Publish the interactive collection rule

**Files:**
- Modify: `docs/reference/framework-governance.md`
- Modify: `docs/reference/package.md`
- Modify: `README.md`

- [ ] **Step 1: Update governance language**

Record that item-level collection slot contracts now include `NotificationCenterItem` and `WorkspaceTab`, not only the earlier feed and stepper examples.

- [ ] **Step 2: Update package and README guidance**

Document the new public item exports and show collection slot customization usage through `NotificationCenter` and `WorkspaceTabs` examples.

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
