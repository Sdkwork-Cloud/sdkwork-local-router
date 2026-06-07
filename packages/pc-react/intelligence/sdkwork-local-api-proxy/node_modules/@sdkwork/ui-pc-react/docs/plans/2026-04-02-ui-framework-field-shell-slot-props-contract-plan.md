# UI Framework Field Shell Slot Props Contract Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ensure composite field controls that keep native form props on an inner input still expose their owned shell and add-on surfaces through explicit named `slotProps`, instead of trapping framework surface customization behind the inner control API.

**Architecture:** Add focused API and runtime audits for governed composite field inputs, then converge those components on named exported field-shell slot contracts covering root shells and owned add-on surfaces such as steppers and calendar buttons, while preserving top-level native input semantics on the inner control.

**Tech Stack:** React 19, TypeScript, Vitest, SDKWORK UI components

---

### Task 1: Add the failing field shell audits

**Files:**
- Create: `src/ui-field-shell-slot-props-api-contract.test.ts`
- Create: `src/ui-field-shell-slot-props-contract.test.tsx`

- [ ] **Step 1: Audit field-shell slot API publication**

Fail when governed composite field controls with owned shell surfaces do not publish `slotProps` on their public props contracts.

- [ ] **Step 2: Audit field-shell runtime forwarding**

Fail when root shell or owned add-on surfaces such as steppers and calendar buttons do not apply the structured `slotProps` they claim to expose.

- [ ] **Step 3: Run the focused audits**

Run:
- `pnpm test -- --run src/ui-field-shell-slot-props-api-contract.test.ts src/ui-field-shell-slot-props-contract.test.tsx`

Expected: FAIL until governed field controls expose and apply slot props.

### Task 2: Converge governed field controls

**Files:**
- Modify: `src/components/ui/data-entry/date-input.tsx`
- Modify: `src/components/ui/data-entry/number-input.tsx`
- Modify: `src/components/ui/data-entry/tag-input.tsx`

- [ ] **Step 1: Publish named slot contracts**

Export explicit named slot prop types for field roots and owned shell surfaces so public field controls expose stable framework-grade customization boundaries.

- [ ] **Step 2: Apply slot props to owned shell surfaces**

Forward structured slot props to exact owned shell surfaces such as field roots, steppers, stepper buttons, and calendar buttons without moving the primary input API off the inner control.

- [ ] **Step 3: Re-run focused verification**

Run:
- `pnpm test -- --run src/ui-field-shell-slot-props-api-contract.test.ts src/ui-field-shell-slot-props-contract.test.tsx`
- `pnpm typecheck`

Expected: PASS

### Task 3: Publish the rule

**Files:**
- Modify: `docs/reference/framework-governance.md`
- Create: `docs/plans/2026-04-02-ui-framework-field-shell-slot-props-contract-plan.md`

- [ ] **Step 1: Add governance language**

Document that field-like composite controls with owned shell or add-on surfaces must expose those surfaces through explicit named `slotProps`.

- [ ] **Step 2: Update audit coverage**

Add the new field-shell audits to the governance inventory and describe the drift they prevent.

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
