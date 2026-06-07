# UI Framework Authoring Contract Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make public component definitions framework-grade by enforcing explicit, exported props contracts for forwardRef-based components.

**Architecture:** Add an AST-based authoring audit that inspects component source instead of relying on naming convention by habit. Refactor primitive-wrapper modules so every forwardRef component uses a stable `ComponentNameProps` type exported from its module, then document the stronger rule in the framework governance guide.

**Tech Stack:** React 18, TypeScript, Vitest, Radix UI, Vite

---

### Task 1: Add the failing authoring audit

**Files:**
- Create: `src/components/ui/authoring-contract.test.ts`

- [ ] **Step 1: Write an AST-based test that inspects forwardRef components**
- [ ] **Step 2: Fail when a forwardRef component does not use an exported `ComponentNameProps` type as its second generic**
- [ ] **Step 3: Run the targeted test and confirm it fails on the current primitive-wrapper drift**

### Task 2: Standardize forwardRef props contracts

**Files:**
- Modify: `src/components/ui/avatar.tsx`
- Modify: `src/components/ui/breadcrumb.tsx`
- Modify: `src/components/ui/card.tsx`
- Modify: `src/components/ui/checkbox.tsx`
- Modify: `src/components/ui/dialog.tsx`
- Modify: `src/components/ui/dropdown-menu.tsx`
- Modify: `src/components/ui/form/form.tsx`
- Modify: `src/components/ui/navigation/menubar.tsx`
- Modify: `src/components/ui/overlays/context-menu.tsx`
- Modify: `src/components/ui/overlays/drawer.tsx`
- Modify: `src/components/ui/pagination.tsx`
- Modify: `src/components/ui/actions/command.tsx`
- Modify: `src/components/ui/label.tsx`
- Modify: `src/components/ui/popover.tsx`
- Modify: `src/components/ui/radio-group.tsx`
- Modify: `src/components/ui/scroll-area.tsx`
- Modify: `src/components/ui/select.tsx`
- Modify: `src/components/ui/separator.tsx`
- Modify: `src/components/ui/skeleton.tsx`
- Modify: `src/components/ui/slider.tsx`
- Modify: `src/components/ui/switch.tsx`
- Modify: `src/components/ui/table.tsx`
- Modify: `src/components/ui/tabs.tsx`
- Modify: `src/components/ui/tooltip.tsx`

- [ ] **Step 1: Export explicit `ComponentNameProps` types for each forwardRef component**
- [ ] **Step 2: Replace inline prop generics with those named props types**
- [ ] **Step 3: Preserve current behavior, metadata markers, and displayName wiring**

### Task 3: Publish the stronger framework rule

**Files:**
- Modify: `docs/reference/framework-governance.md`

- [ ] **Step 1: Add the explicit props contract to the governance rulebook**
- [ ] **Step 2: Reference the new authoring audit in audit coverage**

### Task 4: Verify the framework pass

**Files:**
- Verify only

- [ ] **Step 1: Run `pnpm test -- src/components/ui/authoring-contract.test.ts`**
- [ ] **Step 2: Run `pnpm test`**
- [ ] **Step 3: Run `pnpm typecheck`**
- [ ] **Step 4: Run `pnpm build`**
