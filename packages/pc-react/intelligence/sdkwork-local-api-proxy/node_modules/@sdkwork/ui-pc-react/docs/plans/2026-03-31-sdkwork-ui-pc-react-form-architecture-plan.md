# SDKWORK UI PC React Form Architecture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Introduce a dedicated `form` domain into the shared PC UI framework, refine component taxonomy, and document a clearer professional package structure for SDKWORK desktop applications.

**Architecture:** Keep `@sdkwork/ui-pc-react` as a single publishable package, but elevate form infrastructure into its own domain export. Low-level entry primitives remain independently reusable through `data-entry`, while `form` composes those primitives with React Hook Form bindings and desktop form layout patterns such as sections, grids, and action rows.

**Tech Stack:** TypeScript, React, React Hook Form, Radix UI, Tailwind CSS v4, Vitest, Testing Library, VitePress

---

### Task 1: Stabilize The Current Primitive Expansion Baseline

**Files:**
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\vitest.setup.ts`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\Tooltip.test.tsx`

- [ ] Step 1: Run focused tests for `RadioGroup`, `Slider`, `DropdownMenu`, `Tooltip`, and `catalog`
- [ ] Step 2: Capture the failing slider and tooltip assertions
- [ ] Step 3: Add the minimal test environment support and assertion fix
- [ ] Step 4: Re-run the focused tests until green

### Task 2: Add Dedicated Form Domain Tests

**Files:**
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\form\Form.test.tsx`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\form\FormLayout.test.tsx`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\catalog.test.ts`

- [ ] Step 1: Write a failing test for form field wiring, validation messaging, and semantic accessibility
- [ ] Step 2: Write a failing test for desktop form layout helpers
- [ ] Step 3: Extend catalog assertions to require a `form` domain
- [ ] Step 4: Run the focused tests and confirm failure before implementation

### Task 3: Implement Form Infrastructure And Exports

**Files:**
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\form\form.tsx`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\form\form-layout.tsx`
- Create: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\form\index.ts`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\index.ts`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\components\ui\catalog.ts`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\src\index.ts`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\package.json`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\vite.config.ts`

- [ ] Step 1: Add `react-hook-form` package contract for the new shared form domain
- [ ] Step 2: Implement the minimal `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, and `FormMessage` surface
- [ ] Step 3: Implement desktop helpers `FormSection`, `FormGrid`, and `FormActions`
- [ ] Step 4: Add a dedicated `./components/ui/form` export while preserving existing root and primitive exports
- [ ] Step 5: Re-run focused form tests until green

### Task 4: Refresh Docs And Taxonomy

**Files:**
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\README.md`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\docs\design\architecture.md`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\docs\design\component-planning.md`
- Modify: `<workspace-root>\sdkwork-ui\sdkwork-ui-pc-react\docs\reference\package.md`

- [ ] Step 1: Document the domain-oriented package structure and the new `form` export
- [ ] Step 2: Separate implemented components from the forward roadmap
- [ ] Step 3: Expand the roadmap to include additional advanced PC UI families beyond the current implementation wave

### Task 5: Full Verification

**Files:**
- Verify existing files changed above

- [ ] Step 1: Run `pnpm test`
- [ ] Step 2: Run `pnpm typecheck`
- [ ] Step 3: Run `pnpm build`
- [ ] Step 4: Run `pnpm docs:build`
- [ ] Step 5: Run `pnpm pack --pack-destination .pack`
