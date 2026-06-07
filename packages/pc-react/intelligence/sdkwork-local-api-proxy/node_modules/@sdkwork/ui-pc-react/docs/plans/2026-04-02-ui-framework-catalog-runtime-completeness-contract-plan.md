# UI Framework Catalog Runtime Completeness Contract Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ensure `uiComponentCatalog` remains the authoritative runtime inventory by requiring every public runtime component export to be cataloged, not only every cataloged item to be published.

**Architecture:** Add a source audit that enumerates public runtime component exports from the UI and pattern entrypoints, compares them against `uiComponentCatalog`, then converge the catalog and governance docs so publication and catalog completeness are enforced bidirectionally.

**Tech Stack:** React 19, TypeScript, Vitest, SDKWORK UI components

---

### Task 1: Add the failing catalog completeness audit

**Files:**
- Create: `src/catalog-runtime-export-completeness-contract.test.ts`

- [ ] **Step 1: Audit public runtime export completeness**

Fail when a public runtime component export from `src/components/ui/index.ts` or `src/components/patterns/index.ts` is missing from `uiComponentCatalog`.

- [ ] **Step 2: Run the focused audit**

Run:
- `pnpm test -- --run src/catalog-runtime-export-completeness-contract.test.ts`

Expected: FAIL until all public runtime exports are cataloged.

### Task 2: Converge the runtime catalog

**Files:**
- Modify: `src/components/ui/catalog.ts`

- [ ] **Step 1: Add missing runtime exports to the catalog**

Classify uncataloged public runtime exports into the correct semantic domains so the catalog matches the package's actual runtime surface.

- [ ] **Step 2: Re-run focused verification**

Run:
- `pnpm test -- --run src/catalog-runtime-export-completeness-contract.test.ts`
- `pnpm typecheck`

Expected: PASS

### Task 3: Publish the rule

**Files:**
- Modify: `docs/reference/framework-governance.md`
- Create: `docs/plans/2026-04-02-ui-framework-catalog-runtime-completeness-contract-plan.md`

- [ ] **Step 1: Add governance language**

Document that `uiComponentCatalog` must stay synchronized bidirectionally with the public runtime export surface.

- [ ] **Step 2: Update audit coverage**

Add the new audit to the governance inventory and describe the drift it prevents.

### Task 4: Full verification

**Files:**
- Verify only

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
