# SDKWORK UI PC React Data Display Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Finish the `DataGrid` documentation rollout and add one more audited `data-display` primitive so the shared desktop information-display layer is richer and better aligned with repeated PC app usage.

**Architecture:** Keep the framework domain-first. First reconcile README, VitePress, and planning docs so implemented `DataGrid` behavior matches the published taxonomy. Then add the next audited `data-display` primitive with test-first development, wire exports through the root and domain barrels, update the catalog, and refresh the docs to keep planning and implementation synchronized.

**Tech Stack:** TypeScript, React, Tailwind CSS v4, Vitest, Testing Library, VitePress

---

### Task 1: Align DataGrid Documentation

**Files:**
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\README.md`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\docs\index.md`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\docs\reference\package.md`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\docs\design\architecture.md`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\docs\design\component-planning.md`

- [ ] Step 1: Update the published component lists so `DataGrid` is treated as implemented, not planned
- [ ] Step 2: Add `DataGrid` to the domain structure snippets and data-display guidance
- [ ] Step 3: Add a package-reference example for collection-grid usage

### Task 2: Add The Next Data Display Primitive With TDD

**Files:**
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\data-display\Timeline.test.tsx`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\data-display\timeline.tsx`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\data-display\index.ts`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\index.ts`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\catalog.ts`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\catalog.test.ts`

- [ ] Step 1: Write a failing timeline test covering ordered desktop activity/status rendering
- [ ] Step 2: Run `pnpm test -- --run src/components/ui/data-display/Timeline.test.tsx src/components/ui/catalog.test.ts` and confirm the expected red state
- [ ] Step 3: Implement the minimal shared `Timeline` primitive and export surface
- [ ] Step 4: Re-run the focused tests until green

### Task 3: Refresh Documentation For The Expanded Data Display Domain

**Files:**
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\README.md`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\docs\index.md`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\docs\reference\package.md`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\docs\design\architecture.md`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\docs\design\component-planning.md`

- [ ] Step 1: Add the new `data-display` primitive to the package reference and architecture narrative
- [ ] Step 2: Update the planning doc so the domain table and next-wave gaps remain honest

### Task 4: Full Verification

**Files:**
- Verify existing files changed above

- [ ] Step 1: Run `pnpm test`
- [ ] Step 2: Run `pnpm typecheck`
- [ ] Step 3: Run `pnpm build`
- [ ] Step 4: Run `pnpm docs:build`
- [ ] Step 5: Run `pnpm pack --pack-destination .pack`
