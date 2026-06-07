# SDKWORK UI PC React List And Detail Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add shared `FilterBar` and `DescriptionList` component families to the SDKWORK PC React UI framework and align package docs with the expanded desktop application baseline.

**Architecture:** Extend the single publishable package with one new composition family in `src/components/ui/form` and one new display family in `src/components/ui/data-display`. Keep both slices semantic-token-driven, export them through the existing domain indexes, classify them in the catalog, and document them as audit-driven framework responsibilities.

**Tech Stack:** TypeScript, React, Tailwind CSS v4, Vitest, Testing Library, VitePress

---

### Task 1: Add `FilterBar` Tests First

**Files:**
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\form\FilterBar.test.tsx`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\form\index.ts`

- [ ] Step 1: Write a failing test for `FilterBar`, `FilterBarSection`, and `FilterBarActions`
- [ ] Step 2: Run `pnpm test -- src/components/ui/form/FilterBar.test.tsx` and confirm failure
- [ ] Step 3: Implement the minimum export surface in the form domain
- [ ] Step 4: Re-run the focused test until it passes

### Task 2: Add `FilterBar` Implementation

**Files:**
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\form\filter-bar.tsx`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\form\index.ts`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\index.ts`

- [ ] Step 1: Implement `FilterBar` with desktop row layout, summary copy support, and semantic token styling
- [ ] Step 2: Implement `FilterBarSection` for grouped filters
- [ ] Step 3: Implement `FilterBarActions` for trailing action controls
- [ ] Step 4: Re-run the focused `FilterBar` test and keep it green

### Task 3: Add `DescriptionList` Tests First

**Files:**
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\data-display\DescriptionList.test.tsx`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\data-display\index.ts`

- [ ] Step 1: Write a failing test for `DescriptionList`, `DescriptionItem`, `DescriptionTerm`, and `DescriptionDetails`
- [ ] Step 2: Run `pnpm test -- src/components/ui/data-display/DescriptionList.test.tsx` and confirm failure
- [ ] Step 3: Implement the minimum export surface in the data-display domain
- [ ] Step 4: Re-run the focused test until it passes

### Task 4: Add `DescriptionList` Implementation

**Files:**
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\data-display\description-list.tsx`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\data-display\index.ts`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\index.ts`

- [ ] Step 1: Implement `DescriptionList` with one-column and two-column layout support
- [ ] Step 2: Implement `DescriptionItem`, `DescriptionTerm`, and `DescriptionDetails`
- [ ] Step 3: Add an opt-in monospace details style for request IDs, model names, and other machine values
- [ ] Step 4: Re-run the focused `DescriptionList` test and keep it green

### Task 5: Refresh Catalog And Framework Docs

**Files:**
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\catalog.ts`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\catalog.test.ts`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\README.md`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\docs\index.md`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\docs\guide\getting-started.md`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\docs\reference\package.md`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\docs\design\architecture.md`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\docs\design\component-planning.md`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\docs\design\migration-audit.md`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\docs\design\pc-app-adoption-matrix.md`

- [ ] Step 1: Add failing catalog assertions for `FilterBar` and `DescriptionList`
- [ ] Step 2: Run `pnpm test -- src/components/ui/catalog.test.ts` and confirm failure
- [ ] Step 3: Update the catalog, README, and VitePress docs to reflect the new framework baseline
- [ ] Step 4: Re-run the catalog test until it passes

### Task 6: Full Verification

**Files:**
- Verify existing files changed above

- [ ] Step 1: Run `pnpm test`
- [ ] Step 2: Run `pnpm typecheck`
- [ ] Step 3: Run `pnpm build`
- [ ] Step 4: Run `pnpm docs:build`
- [ ] Step 5: Run `pnpm pack --pack-destination .pack`
