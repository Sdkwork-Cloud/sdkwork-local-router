# SDKWORK UI PC React Component Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the shared PC UI framework with additional category-defining shadcn-style components and keep stylesheet defaults aligned with the exported claw-based theme baseline.

**Architecture:** Extend the single `@sdkwork/ui-pc-react` package with additional reusable primitives in `data-display`, `feedback`, and `overlays`, all driven by semantic SDKWORK theme tokens. Keep exports flat for consumers, classified for discoverability, and verify root stylesheet defaults against the canonical default theme export.

**Tech Stack:** TypeScript, React, Radix UI, Tailwind CSS v4, Vitest, Testing Library, VitePress

---

### Task 1: Lock Default Stylesheet To Theme Exports

**Files:**
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\styles\sdkwork-ui.test.ts`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\styles\sdkwork-ui.css`

- [ ] Step 1: Write a failing test asserting root CSS variables match `SDKWORK_DARK_THEME`
- [ ] Step 2: Run `pnpm test -- --run src/styles/sdkwork-ui.test.ts` and confirm failure
- [ ] Step 3: Update root CSS variables to the claw-aligned defaults
- [ ] Step 4: Re-run the stylesheet test and keep it green

### Task 2: Add Data Display Primitives

**Files:**
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\Avatar.test.tsx`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\Tabs.test.tsx`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\avatar.tsx`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\tabs.tsx`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\data-display\index.ts`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\index.ts`

- [ ] Step 1: Write failing avatar and tabs tests
- [ ] Step 2: Run focused tests and confirm missing export failures
- [ ] Step 3: Implement minimal avatar and tabs primitives with semantic token styling
- [ ] Step 4: Re-run focused tests until green

### Task 3: Add Feedback Primitives

**Files:**
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\SkeletonProgress.test.tsx`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\progress.tsx`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\skeleton.tsx`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\feedback\index.ts`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\index.ts`

- [ ] Step 1: Write failing tests for skeleton and progress behavior
- [ ] Step 2: Run focused tests and confirm failure
- [ ] Step 3: Implement minimal semantic feedback primitives
- [ ] Step 4: Re-run focused tests until green

### Task 4: Add Overlay Primitive

**Files:**
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\Popover.test.tsx`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\popover.tsx`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\overlays\index.ts`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\index.ts`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\package.json`

- [ ] Step 1: Write a failing popover test
- [ ] Step 2: Run the focused test and confirm failure
- [ ] Step 3: Add the Radix dependency and implement the primitive
- [ ] Step 4: Re-run the focused test until green

### Task 5: Refresh Catalog And Docs

**Files:**
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\catalog.ts`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\catalog.test.ts`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\README.md`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\docs\design\component-planning.md`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\docs\reference\package.md`

- [ ] Step 1: Add failing catalog assertions for the new components
- [ ] Step 2: Run the catalog test and confirm failure
- [ ] Step 3: Update catalog and docs to reflect the expanded shared surface
- [ ] Step 4: Re-run the catalog test until green

### Task 6: Full Verification

**Files:**
- Verify existing files changed above

- [ ] Step 1: Run `pnpm test`
- [ ] Step 2: Run `pnpm typecheck`
- [ ] Step 3: Run `pnpm build`
- [ ] Step 4: Run `pnpm docs:build`
- [ ] Step 5: Run `pnpm pack --pack-destination .pack`
