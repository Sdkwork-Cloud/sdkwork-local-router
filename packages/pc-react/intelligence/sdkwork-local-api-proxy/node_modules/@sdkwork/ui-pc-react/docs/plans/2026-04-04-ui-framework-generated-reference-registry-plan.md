# UI Framework Generated Reference Registry Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Centralize generated reference page metadata so the docs catalog runner, Reference sidebar, and documentation governance manifest all derive from one contract.

**Architecture:** Introduce a shared generated-reference registry that records each generated reference page, its docs link, and its generator script. Replace the manual `docs:catalog` script chain with a registry-driven runner, build the Reference sidebar items from the same registry, and derive generated documentation governance entries from that registry instead of hand-listing them in multiple files.

**Tech Stack:** TypeScript, JSON contract data, Vitest, Node.js fs/child_process/path, VitePress

---

### Task 1: Add a failing generated-reference registry contract

**Files:**
- Create: `src/generated-reference-registry-contract.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
it('keeps generated reference pages synchronized across the runner, sidebar, and docs governance manifest', () => {
  expect(packageJson.scripts['docs:catalog']).toBe('node scripts/run-docs-catalog.mjs');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- src/generated-reference-registry-contract.test.ts`
Expected: FAIL because the registry file and docs catalog runner do not exist yet.

- [ ] **Step 3: Write minimal implementation**

Create a registry that records:
- generated markdown path
- docs link
- sidebar label
- generator script path

Make the test also assert:
- generator script paths are unique
- Reference sidebar items match the registry
- docs governance entries include every generated reference file

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test -- src/generated-reference-registry-contract.test.ts`
Expected: PASS

### Task 2: Move docs catalog execution onto the registry

**Files:**
- Create: `build/generated-reference-contract.json`
- Create: `scripts/run-docs-catalog.mjs`
- Modify: `package.json`

- [ ] **Step 1: Run the failing registry test**

Run: `pnpm test -- src/generated-reference-registry-contract.test.ts`
Expected: FAIL until the new registry and runner replace the manual chained script.

- [ ] **Step 2: Write minimal implementation**

Replace the manual `docs:catalog` chain with the registry-driven runner.

- [ ] **Step 3: Run the test to verify it passes**

Run: `pnpm test -- src/generated-reference-registry-contract.test.ts`
Expected: PASS

### Task 3: Move Reference sidebar and docs governance generated entries onto the registry

**Files:**
- Modify: `docs/.vitepress/config.ts`
- Modify: `build/docs-governance-contract.ts`

- [ ] **Step 1: Re-run the registry test to verify failure until migration is complete**

Run: `pnpm test -- src/generated-reference-registry-contract.test.ts`
Expected: FAIL until sidebar and governance manifest are registry-backed.

- [ ] **Step 2: Write minimal implementation**

Import the registry into the VitePress config and docs governance contract so generated reference pages are declared once.

- [ ] **Step 3: Run targeted tests**

Run: `pnpm test -- src/generated-reference-registry-contract.test.ts src/docs-governance-manifest-contract.test.ts src/docs-governance-catalog-docs-contract.test.ts`
Expected: PASS

### Task 4: Run full verification

**Files:**
- Modify: generated docs output only through `pnpm docs:catalog`

- [ ] **Step 1: Run full verification**

Run:
- `pnpm docs:catalog`
- `pnpm test`
- `pnpm typecheck`
- `pnpm build`
- `pnpm docs:build`

Expected: all commands exit successfully.
