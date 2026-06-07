# UI Framework Public Props Contract Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the public UI framework surface type-complete by requiring every public component to expose an explicit `ComponentNameProps` contract.

**Architecture:** Reuse the existing catalog-driven governance model. Add a source audit that walks the cataloged public component inventory and fails whenever a public component lacks an exported props type. Refactor high-surface barrel modules so primitive aliases, composite wrappers, and convenience variants all publish explicit props contracts.

**Tech Stack:** React 18, TypeScript, Vitest, Radix UI, Vite

---

### Task 1: Add the failing public props audit

**Files:**
- Create: `src/public-props-contract.test.ts`

- [ ] **Step 1: Build a catalog-driven test that enumerates all public PascalCase component exports**
- [ ] **Step 2: Fail when any public component lacks an exported `ComponentNameProps` type**
- [ ] **Step 3: Run the targeted test and capture the remaining missing-contract list**

### Task 2: Standardize explicit props contracts across public component families

**Files:**
- Modify: `src/components/ui/actions/command.tsx`
- Modify: `src/components/ui/select.tsx`
- Modify: `src/components/ui/data-entry/upload/upload-presets.tsx`
- Modify: `src/components/ui/tabs.tsx`
- Modify: `src/components/ui/feedback/toast.tsx`
- Modify: `src/components/ui/form/form.tsx`
- Modify: `src/components/ui/breadcrumb.tsx`
- Modify: `src/components/ui/navigation/menubar.tsx`
- Modify: `src/components/ui/pagination.tsx`
- Modify: `src/components/ui/overlays/context-menu.tsx`
- Modify: `src/components/ui/dialog.tsx`
- Modify: `src/components/ui/overlays/modal.tsx`
- Modify: `src/components/ui/overlays/drawer.tsx`
- Modify: `src/components/ui/overlays/hover-card.tsx`
- Modify: `src/components/ui/popover.tsx`
- Modify: `src/components/ui/dropdown-menu.tsx`
- Modify: `src/components/ui/tooltip.tsx`

- [ ] **Step 1: Export explicit props aliases for public primitive aliases and helper components**
- [ ] **Step 2: Export explicit props contracts for convenience variants such as upload presets and toaster aliases**
- [ ] **Step 3: Preserve runtime behavior and barrel shape while making the public type surface complete**

### Task 3: Publish the stronger rule

**Files:**
- Modify: `docs/reference/framework-governance.md`

- [ ] **Step 1: Extend the authoring contract to require explicit props contracts for every public component**
- [ ] **Step 2: Add the new props audit to governance coverage**

### Task 4: Verify the pass

**Files:**
- Verify only

- [ ] **Step 1: Run `pnpm test -- src/public-props-contract.test.ts`**
- [ ] **Step 2: Run `pnpm typecheck`**
- [ ] **Step 3: Run `pnpm test`**
- [ ] **Step 4: Run `pnpm build`**
