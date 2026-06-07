# Upload Actions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add inline rejection feedback and standard preview, download, and retry item actions to the SDKWORK upload family.

**Architecture:** Extend the current upload family rather than adding a second composition layer. Keep the interaction model generic, theme-aware, and UI-only, while using the existing upload item and feedback components as the integration seams.

**Tech Stack:** React 18, TypeScript, Vitest, Testing Library, VitePress

---

### Task 1: Lock The New Upload Interactions With Failing Tests

**Files:**
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\data-entry\FileUpload.test.tsx`

- [ ] Step 1: Add a failing test for inline rejection feedback
- [ ] Step 2: Add a failing test for preview and download item actions
- [ ] Step 3: Add a failing test for retry actions on error-state items
- [ ] Step 4: Run `pnpm test -- src/components/ui/data-entry/FileUpload.test.tsx` and confirm failure for the expected reasons

### Task 2: Implement The Shared Action Layer

**Files:**
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\data-entry\upload\file-upload.tsx`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\data-entry\upload\upload-item.tsx`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\data-entry\upload\upload-types.ts`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\data-entry\upload\upload-utils.ts`

- [ ] Step 1: Add the new shared prop types for rejection display and item actions
- [ ] Step 2: Implement internal rejection-state rendering
- [ ] Step 3: Implement preview and download item actions
- [ ] Step 4: Implement retry actions for error-state items
- [ ] Step 5: Re-run `pnpm test -- src/components/ui/data-entry/FileUpload.test.tsx` and keep it green

### Task 3: Sync Documentation

**Files:**
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\README.md`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\docs\guide\getting-started.md`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\docs\reference\package.md`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\docs\design\architecture.md`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\docs\design\component-planning.md`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\docs\design\framework-benchmark.md`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\docs\design\migration-audit.md`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\docs\design\pc-app-adoption-matrix.md`

- [ ] Step 1: Document rejection and action handling in README and guide examples
- [ ] Step 2: Update design and audit docs so the new interaction layer is explicit

### Task 4: Verify Package Integrity

**Files:**
- Verify only

- [ ] Step 1: Run `pnpm test`
- [ ] Step 2: Run `pnpm typecheck`
- [ ] Step 3: Run `pnpm build`
- [ ] Step 4: Run `pnpm docs:build`
- [ ] Step 5: Run `pnpm pack --pack-destination .pack`
