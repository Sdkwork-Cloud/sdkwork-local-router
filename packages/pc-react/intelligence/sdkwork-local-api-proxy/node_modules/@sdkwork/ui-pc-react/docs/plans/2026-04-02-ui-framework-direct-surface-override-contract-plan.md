# UI Framework Direct Surface Override Contract Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enforce a framework-grade direct-surface override contract so public pattern shells keep their primary DOM surface open to standard root props used for styling, instrumentation, and automation.

**Architecture:** Add a runtime render audit for representative direct-surface patterns, then patch the remaining custom pattern shells so `className`, `style`, `id`, and `data-*` attributes land on the same root element that carries the stable pattern identity marker.

**Tech Stack:** React 19, TypeScript, Vitest, Testing Library, SDKWORK UI patterns

---

### Task 1: Add the failing direct-surface contract audit

**Files:**
- Create: `src/pattern-direct-surface-contract.test.tsx`
- Modify: `docs/reference/framework-governance.md`
- Test: `src/pattern-direct-surface-contract.test.tsx`

- [ ] **Step 1: Write the failing runtime render test**

Render representative direct-surface patterns with probe props:
- `id`
- `className`
- `style`
- `data-contract-root`

Assert those props land on the same DOM node that exposes the pattern's `data-sdk-pattern` marker.

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `pnpm test -- src/pattern-direct-surface-contract.test.tsx`
Expected: FAIL for custom pattern shells that still type or swallow root props instead of applying them to the identity surface.

### Task 2: Patch direct-surface pattern shells

**Files:**
- Modify: `src/components/patterns/app-shell/AppShell.tsx`
- Modify: `src/components/patterns/app-shell/PageHeader.tsx`
- Modify: `src/components/patterns/app-shell/NavigationRail.tsx`
- Modify: `src/components/patterns/workspace/InspectorPanel.tsx`
- Modify: `src/components/patterns/workspace/InspectorRail.tsx`
- Modify: `src/components/patterns/workspace/WorkspacePanel.tsx`
- Modify: `src/components/patterns/picker/PickerSelectionFooter.tsx`
- Modify: `src/components/patterns/desktop-shell/DesktopWindowControls.tsx`

- [ ] **Step 1: Upgrade props contracts**

For each direct-surface pattern shell:
- inherit standard DOM props from the correct intrinsic element type
- omit only conflicting semantic names such as `title` or `onCancel`
- preserve existing framework-specific semantic props

- [ ] **Step 2: Apply root props to the identity surface**

Patch each component so the root element with `data-sdk-pattern="..."` also receives:
- merged `className`
- merged `style`
- forwarded `id`
- forwarded `data-*`
- any remaining safe DOM attributes

- [ ] **Step 3: Keep markers authoritative**

Spread consumer props without allowing them to erase framework identity markers. The SDKWORK marker remains owned by the framework surface.

- [ ] **Step 4: Re-run the focused audit**

Run: `pnpm test -- src/pattern-direct-surface-contract.test.tsx`
Expected: PASS

### Task 3: Document the policy as a hard framework contract

**Files:**
- Modify: `docs/reference/framework-governance.md`

- [ ] **Step 1: Add the contract section**

Document that direct-surface patterns must keep their primary DOM surface open to:
- `className`
- `style`
- `id`
- `data-*`

- [ ] **Step 2: Explain delegated exceptions**

Clarify that overlay and primitive wrappers without a direct root surface are governed through explicit lower-surface override hooks rather than implicit root prop swallowing.

- [ ] **Step 3: Wire the audit into the governance list**

List the new direct-surface contract test alongside the existing framework governance audits.

### Task 4: Full verification

**Files:**
- Test: `src/pattern-direct-surface-contract.test.tsx`

- [ ] **Step 1: Run package typecheck**

Run: `pnpm typecheck`
Expected: PASS

- [ ] **Step 2: Run full test suite**

Run: `pnpm test`
Expected: PASS

- [ ] **Step 3: Run production build**

Run: `pnpm build`
Expected: PASS

- [ ] **Step 4: Run docs build**

Run: `pnpm docs:build`
Expected: PASS
