# UI Framework Table Primitive And Pagination Standard Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-align the table stack with modern framework practice by keeping `Table` as a thin semantic primitive, moving framework-owned chrome into `DataTable`, and standardizing built-in pagination at the composite layer.

**Architecture:** Match the shadcn split between primitive table structure and higher-order data-table behavior. `Table` owns semantic markup and scroll structure only. `DataTable` owns compact surface chrome, row density, selection affordances, and a first-class pagination model.

**Tech Stack:** React 19, TypeScript, Vitest, SDKWORK UI data-display primitives

---

### Task 1: Add failing behavior tests

**Files:**
- Modify: `src/components/ui/Table.test.tsx`
- Modify: `src/components/ui/data-display/DataTable.test.tsx`

- [ ] **Step 1: Thin primitive test**

Fail when `Table` bakes panel border or large-radius chrome into its scroll wrapper.

- [ ] **Step 2: Built-in pagination test**

Fail when `DataTable` cannot paginate rows with a framework-owned page summary and previous/next controls.

### Task 2: Refactor the table stack

**Files:**
- Modify: `src/components/ui/table.tsx`
- Modify: `src/components/ui/data-display/data-table.tsx`

- [ ] **Step 1: Thin `Table`**

Keep the primitive focused on semantic table markup and overflow structure.

- [ ] **Step 2: Composite `DataTable` surface**

Move border, radius, background, and footer chrome into `DataTable` so dense data surfaces use compact geometry without bloating the primitive.

- [ ] **Step 3: First-class pagination**

Add a typed pagination contract with controlled and uncontrolled page state, built-in client slicing, and a standard summary plus navigation footer.

### Task 3: Publish the rule

**Files:**
- Modify: `docs/reference/package.md`
- Modify: `docs/reference/framework-governance.md`

- [ ] **Step 1: Package guidance**

Document that `Table` is the semantic primitive and `DataTable` is the enhanced grid surface with built-in pagination.

- [ ] **Step 2: Governance guidance**

Document that low-level primitives must stay structurally thin and that dense chrome belongs on higher-order composites.

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
