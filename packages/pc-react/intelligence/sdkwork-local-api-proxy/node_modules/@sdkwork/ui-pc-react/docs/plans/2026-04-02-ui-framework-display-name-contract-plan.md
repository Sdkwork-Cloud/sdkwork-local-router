# UI Framework Display Name Contract Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Require every public framework component to expose a stable explicit `displayName` that exactly matches its exported component name so DevTools, error surfaces, wrappers, and future docs tooling all resolve framework identities consistently.

**Architecture:** Reuse the catalog-governed public component inventory and add a source audit that fails when any public component lacks an explicit exact-match `displayName` assignment. Replace inherited primitive display names with framework-owned names across root aliases, composite wrappers, and higher-order pattern components without changing runtime behavior.

**Tech Stack:** React 18, TypeScript, Vitest, Radix UI

---

### Task 1: Add the failing display-name audit

**Files:**
- Create: `src/display-name-contract.test.ts`

- [ ] **Step 1: Enumerate the public PascalCase component inventory from the framework catalog**
- [ ] **Step 2: Fail when any public component lacks an explicit exact-match `Component.displayName = 'Component'` assignment**
- [ ] **Step 3: Use the failing output as the closure list for remaining authoring gaps**

### Task 2: Standardize explicit display names

**Files:**
- Modify: `src/components/ui/dialog.tsx`
- Modify: `src/components/ui/dropdown-menu.tsx`
- Modify: `src/components/ui/navigation/menubar.tsx`
- Modify: `src/components/ui/overlays/context-menu.tsx`
- Modify: `src/components/ui/overlays/drawer.tsx`
- Modify: `src/components/ui/overlays/modal.tsx`
- Modify: `src/components/ui/select.tsx`
- Modify: `src/components/ui/popover.tsx`
- Modify: `src/components/ui/tooltip.tsx`
- Modify: `src/components/ui/form/form.tsx`
- Modify: `src/components/ui/feedback/toast.tsx`
- Modify: `src/components/ui/data-display/tree.tsx`
- Modify: `src/components/ui/actions/command.tsx`
- Modify: `src/components/patterns/**/*`

- [ ] **Step 1: Add explicit display names for public primitive aliases and wrapper exports**
- [ ] **Step 2: Add explicit display names for pattern-level composite surfaces**
- [ ] **Step 3: Preserve runtime behavior while making the public authoring contract explicit**

### Task 3: Publish the stronger rule

**Files:**
- Modify: `docs/reference/framework-governance.md`

- [ ] **Step 1: Clarify that public components must set explicit stable display names**
- [ ] **Step 2: Add the new display-name audit to governance coverage**

### Task 4: Verify the pass

**Files:**
- Verify only

- [ ] **Step 1: Run `pnpm test -- src/display-name-contract.test.ts`**
- [ ] **Step 2: Run `pnpm typecheck`**
- [ ] **Step 3: Run `pnpm test`**
- [ ] **Step 4: Run `pnpm build`**
- [ ] **Step 5: Run `pnpm docs:build`**
