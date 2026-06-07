# SDKWORK UI PC React Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a publishable shadcn-based SDKWORK PC UI framework package with docs, tests, and a migration audit for current PC applications.

**Architecture:** Implement a single `@sdkwork/ui-pc-react` package with layered exports for primitives, patterns, theme, and styles. Use Tailwind 4 during library build to ship prebuilt CSS, and use VitePress for framework documentation and migration guidance.

**Tech Stack:** TypeScript, React, Vite, Tailwind CSS v4, Radix UI, class-variance-authority, tailwind-merge, Vitest, VitePress

---

### Task 1: Scaffold Package Infrastructure

**Files:**
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\package.json`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\tsconfig.json`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\vite.config.ts`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\components.json`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\scripts\run-vitepress.mjs`

- [ ] Step 1: Define package metadata, scripts, exports, and dependencies
- [ ] Step 2: Add TypeScript and Vite library build configuration
- [ ] Step 3: Add shadcn metadata and docs runner helper
- [ ] Step 4: Run package metadata and build config verification

### Task 2: Write Failing Tests For Core Framework Behavior

**Files:**
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\vitest.config.ts`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\theme\sdkwork-theme.test.ts`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\patterns\AppShell.test.tsx`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\Button.test.tsx`

- [ ] Step 1: Write failing tests for theme token generation, desktop shell layout, and button variants
- [ ] Step 2: Run `pnpm test` and confirm failure reasons are missing implementation

### Task 3: Implement Theme Foundation

**Files:**
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\theme\sdkwork-theme.ts`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\theme\theme-provider.tsx`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\theme\index.ts`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\lib\utils.ts`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\styles\sdkwork-ui.css`

- [ ] Step 1: Implement semantic theme tokens and factory helpers
- [ ] Step 2: Implement provider and document token application
- [ ] Step 3: Add utility helpers and Tailwind-backed stylesheet
- [ ] Step 4: Run tests and keep green

### Task 4: Implement Primitive Components

**Files:**
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\button.tsx`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\input.tsx`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\textarea.tsx`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\label.tsx`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\checkbox.tsx`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\switch.tsx`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\card.tsx`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\badge.tsx`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\separator.tsx`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\dialog.tsx`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\index.ts`

- [ ] Step 1: Implement button and form primitives
- [ ] Step 2: Implement feedback and surface primitives
- [ ] Step 3: Implement dialog primitive
- [ ] Step 4: Run tests and build

### Task 5: Implement Desktop Patterns

**Files:**
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\patterns\AppShell.tsx`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\patterns\PageHeader.tsx`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\patterns\NavigationRail.tsx`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\patterns\WorkspacePanel.tsx`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\patterns\InspectorPanel.tsx`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\patterns\index.ts`

- [ ] Step 1: Implement generic desktop shell pattern
- [ ] Step 2: Implement page and panel composition helpers
- [ ] Step 3: Re-run tests and build

### Task 6: Package Entry And README

**Files:**
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\index.ts`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\README.md`
- Modify: `<workspace-root>\sdkwork-ui\README.md`

- [ ] Step 1: Export stable public APIs and stylesheet entry
- [ ] Step 2: Document install, build, theme, and usage
- [ ] Step 3: Add top-level SDKWORK UI workspace README summary

### Task 7: VitePress Documentation Site

**Files:**
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\docs\.vitepress\config.ts`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\docs\.vitepress\theme\index.ts`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\docs\.vitepress\theme\custom.css`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\docs\index.md`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\docs\guide\getting-started.md`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\docs\design\architecture.md`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\docs\design\component-planning.md`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\docs\design\migration-audit.md`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\docs\reference\package.md`

- [ ] Step 1: Configure VitePress site shell and branding
- [ ] Step 2: Write framework architecture and component planning docs
- [ ] Step 3: Write migration audit for current PC apps
- [ ] Step 4: Run docs build

### Task 8: Verification

**Files:**
- Verify existing files created above

- [ ] Step 1: Run `pnpm test`
- [ ] Step 2: Run `pnpm build`
- [ ] Step 3: Run `pnpm docs:build`
- [ ] Step 4: Review outputs and capture any remaining gaps honestly
