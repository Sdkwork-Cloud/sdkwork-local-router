# UI Framework Governance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the current UI package into a governance-driven framework with enforceable standards for tokens, metadata, component authoring, and documentation.

**Architecture:** Keep the existing layered package structure, but add a framework contract on top of it. Encode the contract with audit tests, close theme-token gaps, and refactor components to expose stable rendered identities and token-safe implementations.

**Tech Stack:** React 18, TypeScript, Vite, Vitest, Tailwind CSS 4, Radix UI, class-variance-authority

---

### Task 1: Add governance audits

**Files:**
- Create: `src/components/ui/framework-contract.test.ts`
- Create: `src/theme/theme-contract.test.ts`
- Modify: `src/components/ui/catalog.ts`

- [ ] **Step 1: Write failing tests for token contract and rendered metadata expectations**
- [ ] **Step 2: Run the targeted tests and confirm they fail for the current drift**
- [ ] **Step 3: Implement the minimal audit helpers and expectations**
- [ ] **Step 4: Run the targeted tests until the failures precisely describe remaining framework gaps**

### Task 2: Close the theme contract

**Files:**
- Modify: `src/theme/sdkwork-theme.ts`
- Modify: `src/styles/sdkwork-ui.css`
- Test: `src/theme/theme-contract.test.ts`

- [ ] **Step 1: Extend the theme contract to cover every semantic token used by components**
- [ ] **Step 2: Update CSS variable generation and default stylesheet tokens**
- [ ] **Step 3: Re-run the theme contract test until it passes**

### Task 3: Standardize rendered component metadata and token usage

**Files:**
- Modify: `src/components/ui/button.tsx`
- Modify: `src/components/ui/input.tsx`
- Modify: `src/components/ui/textarea.tsx`
- Modify: `src/components/ui/card.tsx`
- Modify: `src/components/ui/dialog.tsx`
- Modify: `src/components/ui/dropdown-menu.tsx`
- Modify: `src/components/ui/popover.tsx`
- Modify: `src/components/ui/select.tsx`
- Modify: `src/components/ui/tabs.tsx`
- Modify: `src/components/ui/table.tsx`
- Modify: `src/components/ui/feedback/activity-feed.tsx`
- Modify: `src/components/ui/feedback/notification-center.tsx`
- Modify: `src/components/ui/data-display/markdown-viewer.tsx`
- Modify: `src/components/ui/data-display/timeline.tsx`
- Modify: `src/components/ui/navigation/stepper.tsx`
- Modify: `src/components/patterns/detail/DetailDrawer.tsx`
- Modify: `src/components/patterns/workspace/InspectorRail.tsx`
- Test: `src/components/ui/framework-contract.test.ts`

- [ ] **Step 1: Add failing assertions for missing component metadata and invalid token usage**
- [ ] **Step 2: Refactor components to expose stable `data-sdk-ui` or `data-sdk-pattern` markers**
- [ ] **Step 3: Replace drifted token references with valid contract tokens**
- [ ] **Step 4: Re-run targeted tests until the contract is green**

### Task 4: Publish the framework rulebook

**Files:**
- Create: `docs/reference/framework-governance.md`
- Modify: `README.md`
- Modify: `docs/index.md`

- [ ] **Step 1: Document the framework contract and authoring rules**
- [ ] **Step 2: Link the new rulebook from package docs**
- [ ] **Step 3: Run docs-adjacent and package tests to verify nothing regressed**

### Task 5: Final verification

**Files:**
- Verify only

- [ ] **Step 1: Run `pnpm test`**
- [ ] **Step 2: Run `pnpm typecheck`**
- [ ] **Step 3: Review the diff against the governance design**
