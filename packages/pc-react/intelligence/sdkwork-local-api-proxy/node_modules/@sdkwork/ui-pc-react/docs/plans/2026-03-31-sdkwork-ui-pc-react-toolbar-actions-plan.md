# Toolbar Actions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a shared `ToolbarButton` primitive to the SDKWORK PC React UI framework and align package docs with the expanded desktop toolbar action baseline.

**Architecture:** Implement the component inside the `actions` domain as a compact desktop button with toggle semantics and editor-safe focus behavior. Keep the abstraction smaller than layout shells and richer than a plain `Button`.

**Tech Stack:** React 18, TypeScript, Vitest, Testing Library, class-variance-authority, Tailwind utility classes, VitePress

---

### Task 1: Add `ToolbarButton` Tests First

**Files:**
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\actions\ToolbarButton.test.tsx`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\actions\index.ts`

- [ ] Step 1: Write a failing export test for `ToolbarButton`
- [ ] Step 2: Run `pnpm test -- src/components/ui/actions/ToolbarButton.test.tsx` and confirm failure
- [ ] Step 3: Add behavior tests for pressed semantics, focus preservation, and compact sizing
- [ ] Step 4: Re-run the focused test and confirm the new behavior tests fail for the right reasons

### Task 2: Implement `ToolbarButton`

**Files:**
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\actions\toolbar-button.tsx`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\actions\index.ts`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\index.ts`

- [ ] Step 1: Implement size variants for compact and default desktop toolbar rows
- [ ] Step 2: Implement `pressed` plus `active` alias support with `aria-pressed`
- [ ] Step 3: Implement shortcut-aware title composition
- [ ] Step 4: Implement `preserveFocusOnMouseDown`
- [ ] Step 5: Re-run `pnpm test -- src/components/ui/actions/ToolbarButton.test.tsx` and keep it green

### Task 3: Register The Component

**Files:**
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\catalog.ts`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\catalog.test.ts`

- [ ] Step 1: Add failing catalog coverage for `ToolbarButton`
- [ ] Step 2: Run `pnpm test -- src/components/ui/catalog.test.ts` and confirm failure
- [ ] Step 3: Register `ToolbarButton` in the `actions` catalog
- [ ] Step 4: Re-run `pnpm test -- src/components/ui/catalog.test.ts` and keep it green

### Task 4: Sync Documentation

**Files:**
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\README.md`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\docs\index.md`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\docs\guide\getting-started.md`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\docs\reference\package.md`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\docs\design\architecture.md`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\docs\design\component-planning.md`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\docs\design\framework-benchmark.md`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\docs\design\migration-audit.md`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\docs\design\pc-app-adoption-matrix.md`

- [ ] Step 1: Add `ToolbarButton` to framework scope, examples, and action-domain guidance
- [ ] Step 2: Update planning and migration docs so the action-domain roadmap stays accurate
- [ ] Step 3: Write the dedicated design note for the toolbar-actions slice

### Task 5: Verify Package Integrity

**Files:**
- Verify only

- [ ] Step 1: Run `pnpm test`
- [ ] Step 2: Run `pnpm typecheck`
- [ ] Step 3: Run `pnpm build`
- [ ] Step 4: Run `pnpm docs:build`
- [ ] Step 5: Run `pnpm pack --pack-destination .pack`
