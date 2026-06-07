# Upload Ergonomics Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add desktop-grade replacement, directory, paste, and clear-all ergonomics to the SDKWORK upload family.

**Architecture:** Extend the existing shared upload family in place rather than creating another abstraction layer. Keep behavior generic and UI-only, while preserving typed presets and the current preview architecture.

**Tech Stack:** React 18, TypeScript, Vitest, Testing Library, VitePress

---

### Task 1: Lock The New Upload Ergonomics With Failing Tests

**Files:**
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\data-entry\FileUpload.test.tsx`

- [ ] Step 1: Add a failing test for single-file replacement when the max file count is one
- [ ] Step 2: Add a failing test for clear-all list actions
- [ ] Step 3: Add a failing test for clipboard paste intake
- [ ] Step 4: Add a failing test for directory-selection attributes
- [ ] Step 5: Run `pnpm test -- src/components/ui/data-entry/FileUpload.test.tsx` and confirm failure for the expected reasons

### Task 2: Implement The Shared Upload Ergonomics

**Files:**
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\data-entry\upload\file-upload.tsx`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\data-entry\upload\upload-types.ts`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\data-entry\upload\upload-utils.ts`

- [ ] Step 1: Add the new shared prop types
- [ ] Step 2: Implement replacement behavior for single-slot uploads
- [ ] Step 3: Implement clear-all behavior with a framework action surface
- [ ] Step 4: Implement clipboard paste intake
- [ ] Step 5: Implement directory-selection support
- [ ] Step 6: Re-run `pnpm test -- src/components/ui/data-entry/FileUpload.test.tsx` and keep it green

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

- [ ] Step 1: Document replacement, paste, and directory upload patterns
- [ ] Step 2: Update the benchmark and audit docs so the new ergonomics are reflected explicitly

### Task 4: Verify Package Integrity

**Files:**
- Verify only

- [ ] Step 1: Run `pnpm test`
- [ ] Step 2: Run `pnpm typecheck`
- [ ] Step 3: Run `pnpm build`
- [ ] Step 4: Run `pnpm docs:build`
- [ ] Step 5: Run `pnpm pack --pack-destination .pack`
