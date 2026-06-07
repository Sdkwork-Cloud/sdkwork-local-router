# Upload System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a professional desktop upload family for SDKWORK PC React apps, covering generic files plus image, video, audio, and document upload presets.

**Architecture:** Move upload into a dedicated `data-entry/upload` subdirectory with shared types, helpers, a reusable dropzone, and media-specific wrappers. Keep the framework UI-only while supporting previews, rejections, and controlled or uncontrolled lists.

**Tech Stack:** React 18, TypeScript, Vitest, Testing Library, lucide-react, VitePress

---

### Task 1: Lock The Upload Family API With Failing Tests

**Files:**
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\data-entry\FileUpload.test.tsx`

- [ ] Step 1: Add failing tests for `ImageUpload`, `VideoUpload`, `AudioUpload`, and `DocumentUpload`
- [ ] Step 2: Add failing behavior assertions for image preview, media preview rows, and document-type rejection
- [ ] Step 3: Run `pnpm test -- src/components/ui/data-entry/FileUpload.test.tsx` and confirm failure for the right reasons

### Task 2: Build The Upload Subdirectory

**Files:**
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\data-entry\upload\upload-types.ts`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\data-entry\upload\upload-utils.ts`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\data-entry\upload\upload-dropzone.tsx`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\data-entry\upload\upload-item.tsx`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\data-entry\upload\file-upload.tsx`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\data-entry\upload\index.ts`
- Delete: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\data-entry\file-upload.tsx`

- [ ] Step 1: Move shared types and utility logic into focused upload files
- [ ] Step 2: Implement the reusable dropzone shell with desktop-safe states
- [ ] Step 3: Implement upload item rendering with generic, image, video, audio, and document affordances
- [ ] Step 4: Implement the base `FileUpload` plus typed wrappers
- [ ] Step 5: Re-run `pnpm test -- src/components/ui/data-entry/FileUpload.test.tsx` and keep it green

### Task 3: Register Package Exports And Catalog Coverage

**Files:**
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\data-entry\index.ts`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\index.ts`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\catalog.ts`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\catalog.test.ts`

- [ ] Step 1: Re-export the new upload family from the data-entry domain and root UI surface
- [ ] Step 2: Add the upload family to the component catalog
- [ ] Step 3: Add or update catalog assertions so the registry is verified

### Task 4: Sync Framework Docs

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

- [ ] Step 1: Add upload-family usage examples and exports to the main package docs
- [ ] Step 2: Update design and planning docs so `data-entry` reflects the richer upload system
- [ ] Step 3: Capture the benchmark rationale for the SDKWORK upload family

### Task 5: Verify Package Integrity

**Files:**
- Verify only

- [ ] Step 1: Run `pnpm test`
- [ ] Step 2: Run `pnpm typecheck`
- [ ] Step 3: Run `pnpm build`
- [ ] Step 4: Run `pnpm docs:build`
- [ ] Step 5: Run `pnpm pack --pack-destination .pack`
