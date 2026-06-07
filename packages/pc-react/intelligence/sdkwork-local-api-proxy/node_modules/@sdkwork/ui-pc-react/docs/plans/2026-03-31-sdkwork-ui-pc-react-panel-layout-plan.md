# Panel Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a shared resizable panel layout system to the SDKWORK PC React UI framework and align package docs with the expanded desktop workspace baseline.

**Architecture:** Implement `PanelGroup`, `Panel`, and `PanelResizeHandle` in the `layout` domain using a stable low-level resizable primitive package underneath. Keep the SDKWORK API theme-aware and desktop-focused.

**Tech Stack:** React 18, TypeScript, Vitest, Testing Library, react-resizable-panels, class-variance-authority, VitePress

---

### Task 1: Add `PanelGroup` Tests First

**Files:**
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\layout\PanelGroup.test.tsx`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\layout\index.ts`

- [ ] Step 1: Write a failing export test for `PanelGroup`, `Panel`, and `PanelResizeHandle`
- [ ] Step 2: Run `pnpm test -- src/components/ui/layout/PanelGroup.test.tsx` and confirm failure
- [ ] Step 3: Add behavior tests for horizontal layout, visible grip rendering, and vertical layout support
- [ ] Step 4: Re-run the focused test and confirm those behavior assertions fail for the right reasons

### Task 2: Add The Layout Implementation

**Files:**
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\layout\panel-group.tsx`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\layout\index.ts`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\index.ts`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\package.json`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\vite.config.ts`

- [ ] Step 1: Add the resizable-panel dependency
- [ ] Step 2: Implement `PanelGroup` with `direction` mapping and theme-aware container classes
- [ ] Step 3: Implement `Panel` with safe min-size and overflow defaults
- [ ] Step 4: Implement `PanelResizeHandle` with optional visible grip affordance
- [ ] Step 5: Re-run `pnpm test -- src/components/ui/layout/PanelGroup.test.tsx` and keep it green

### Task 3: Register The Layout Family

**Files:**
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\catalog.ts`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\catalog.test.ts`

- [ ] Step 1: Add failing catalog assertions for `PanelGroup`, `Panel`, and `PanelResizeHandle`
- [ ] Step 2: Run `pnpm test -- src/components/ui/catalog.test.ts` and confirm failure
- [ ] Step 3: Register the new layout primitives in the catalog
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

- [ ] Step 1: Add panel-layout usage examples and exports to package docs
- [ ] Step 2: Update architecture and planning docs so `layout` reflects the new split-workspace family
- [ ] Step 3: Write the dedicated design note for this slice

### Task 5: Verify Package Integrity

**Files:**
- Verify only

- [ ] Step 1: Run `pnpm test`
- [ ] Step 2: Run `pnpm typecheck`
- [ ] Step 3: Run `pnpm build`
- [ ] Step 4: Run `pnpm docs:build`
- [ ] Step 5: Run `pnpm pack --pack-destination .pack`
