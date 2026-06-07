# UI Framework Auxiliary Callback Types Contract Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ensure exported public non-`Props` framework contracts publish function-valued fields and callable branches through explicit named exported callback contracts instead of anonymous inline signatures.

**Architecture:** Add a source audit that inspects exported public UI and pattern contracts beyond `*Props`, require function-valued members and callable unions to resolve through named exported `*Handler`, `*Renderer`, `*Resolver`, `*Subscriber`, `*Factory`, or `*Unsubscribe` contracts, and converge the remaining item models, service APIs, controller contracts, selection contexts, and toast helpers on reusable module-local callback types.

**Tech Stack:** React 19, TypeScript, Vitest, SDKWORK UI components

---

### Task 1: Add the failing auxiliary callback audit

**Files:**
- Create: `src/public-auxiliary-callback-types-contract.test.ts`

- [ ] **Step 1: Audit exported non-props callback surfaces**

Fail when exported public non-`Props` contracts expose function-valued surface through:
- anonymous inline function property types
- anonymous method signatures
- anonymous call signatures
- anonymous function branches hidden inside exported union or intersection helper types
- named callback contracts that are not exported or do not use governed suffixes

- [ ] **Step 2: Run the focused audit**

Run:
- `pnpm test -- --run src/public-auxiliary-callback-types-contract.test.ts`

Expected: FAIL until anonymous auxiliary callback surfaces are removed.

### Task 2: Converge public auxiliary callback contracts

**Files:**
- Modify: `src/components/ui/actions/action-menu-button.tsx`
- Modify: `src/components/ui/actions/split-button.tsx`
- Modify: `src/components/ui/feedback/toast.tsx`
- Modify: `src/components/patterns/desktop-shell/DesktopWindowControls.tsx`
- Modify: `src/components/patterns/picker/EntityPickerDialog.tsx`
- Modify: `src/components/patterns/picker/TwoPaneSelectorPopover.tsx`

- [ ] **Step 1: Export named callback helpers**

Introduce explicit exported callback contracts for:
- action menu and split button item selection
- toast result unwrapping, promise factories, toast API commands, and toast promise callbacks
- desktop window controller commands, resolvers, and subscriptions
- picker selection actions and two-pane selector item/section actions

- [ ] **Step 2: Rewire public contracts to the named helpers**

Update exported public non-`Props` contracts so every governed function-valued member references a named exported callback contract.

- [ ] **Step 3: Re-run focused verification**

Run:
- `pnpm test -- --run src/public-auxiliary-callback-types-contract.test.ts`
- `pnpm typecheck`

Expected: PASS

### Task 3: Publish the rule

**Files:**
- Modify: `docs/reference/framework-governance.md`
- Create: `docs/plans/2026-04-02-ui-framework-auxiliary-callback-types-contract-plan.md`

- [ ] **Step 1: Add governance language**

Document that exported public auxiliary contracts beyond `*Props` must publish function-valued members and callable branches through named exported callback contracts.

- [ ] **Step 2: Update audit coverage**

Add the new audit to the governance inventory and describe the drift it prevents.

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
