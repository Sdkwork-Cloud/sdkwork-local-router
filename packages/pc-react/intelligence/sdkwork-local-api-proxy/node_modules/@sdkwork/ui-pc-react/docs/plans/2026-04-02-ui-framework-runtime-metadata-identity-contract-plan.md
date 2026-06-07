# UI Framework Runtime Metadata Identity Contract Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enforce an exact runtime metadata identity contract so every cataloged public framework surface either renders its own exact `data-sdk-ui` / `data-sdk-pattern` marker or is explicitly classified as an abstract no-DOM primitive.

**Architecture:** Keep the existing broad metadata-presence audit, then add a second source-level contract test that compares the public catalog against exact kebab-case markers. Patch concrete surfaces to emit exact markers, and encode a narrow abstract-component allowlist for context/provider/root/portal primitives that have no stable DOM surface.

**Tech Stack:** React 19, Radix UI primitives, Vitest, TypeScript, source-level governance audits

---

### Task 1: Add the failing runtime identity audit

**Files:**
- Create: `src/runtime-metadata-identity-contract.test.ts`
- Modify: `src/components/ui/catalog.ts`
- Test: `src/runtime-metadata-identity-contract.test.ts`

- [ ] **Step 1: Write the failing test**

Add a Vitest audit that:
- collects cataloged public UI and pattern components
- derives the expected kebab-case runtime marker name
- verifies every component is either:
  - backed by an exact marker in source, or
  - listed in a narrow abstract allowlist with a documented reason

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- src/runtime-metadata-identity-contract.test.ts`
Expected: FAIL with missing exact metadata identities for wrappers, aliases, and pattern shells that still use generic or delegated markers.

- [ ] **Step 3: Keep the audit scope tight**

Limit the abstract allowlist to components that truly have no DOM surface:
- root/context/provider primitives
- portals
- menu/sub composition primitives with no stable element

- [ ] **Step 4: Re-run the test after each batch**

Run: `pnpm test -- src/runtime-metadata-identity-contract.test.ts`
Expected: FAIL until all concrete surfaces are patched and the abstract list is accurate.

### Task 2: Patch concrete UI surfaces to exact identities

**Files:**
- Modify: `src/components/ui/data-display/description-list.tsx`
- Modify: `src/components/ui/data-display/key-value-table.tsx`
- Modify: `src/components/ui/tabs.tsx`
- Modify: `src/components/ui/data-display/tree.tsx`
- Modify: `src/components/ui/feedback/toast.tsx`
- Modify: `src/components/ui/form/form.tsx`
- Modify: `src/components/ui/navigation/menubar.tsx`
- Modify: `src/components/ui/overlays/context-menu.tsx`
- Modify: `src/components/ui/dropdown-menu.tsx`
- Modify: `src/components/ui/dialog.tsx`
- Modify: `src/components/ui/overlays/modal.tsx`
- Modify: `src/components/ui/overlays/drawer.tsx`
- Modify: `src/components/ui/popover.tsx`
- Modify: `src/components/ui/overlays/hover-card.tsx`
- Modify: `src/components/ui/tooltip.tsx`

- [ ] **Step 1: Add exact markers to simple surfaces**

Patch direct DOM wrappers such as:
- `DescriptionTerm`
- `DescriptionDetails`
- `KeyValueTableRow`
- `KeyValueTableLabel`
- `KeyValueTableValue`
- `Tabs`
- `FormLabel`

- [ ] **Step 2: Add exact markers to delegated aliases**

Patch wrapper exports so aliased public components emit their own exact identity:
- `Tree`
- `SdkworkToaster`
- trigger/close/anchor wrappers across overlay primitives
- concrete menu group/radio-group wrappers that render DOM

- [ ] **Step 3: Add exact markers to dialog/menu surfaces**

Patch exported wrappers for:
- `DialogTrigger`
- `DialogClose`
- `ModalTrigger`
- `ModalClose`
- `DrawerTrigger`
- `DrawerClose`
- `PopoverTrigger`
- `PopoverAnchor`
- `HoverCardTrigger`
- `TooltipTrigger`
- `DropdownMenuTrigger`
- `DropdownMenuGroup`
- `DropdownMenuRadioGroup`
- `ContextMenuTrigger`
- `ContextMenuGroup`
- `ContextMenuRadioGroup`
- `MenubarTrigger`
- `MenubarGroup`
- `MenubarRadioGroup`
- `MenubarCheckboxItem`
- `MenubarRadioItem`
- `MenubarLabel`
- `MenubarContent`
- `MenubarItem`
- `MenubarSeparator`
- `MenubarSubContent`
- `MenubarSubTrigger`
- `MenubarShortcut`

- [ ] **Step 4: Re-run the focused audit**

Run: `pnpm test -- src/runtime-metadata-identity-contract.test.ts`
Expected: PASS for concrete UI components, with only explicitly abstract primitives exempted.

### Task 3: Patch pattern surfaces and document the policy

**Files:**
- Modify: `src/components/patterns/app-shell/AppShell.tsx`
- Modify: `src/components/patterns/desktop-shell/DesktopShellFrame.tsx`
- Modify: `src/components/patterns/settings/SettingsCenter.tsx`
- Modify: `src/components/patterns/detail/DetailDrawer.tsx`
- Modify: `src/components/patterns/command/SearchCommandPalette.tsx`
- Modify: `src/components/ui/actions/command.tsx`
- Modify: `docs/reference/framework-governance.md`

- [ ] **Step 1: Add exact pattern markers**

Patch pattern exports so each public pattern has an exact `data-sdk-pattern` marker:
- `AppShell`
- `DesktopShellFrame`
- `DirtyStateBar`
- `DetailDrawer`
- `SearchCommandPalette`

- [ ] **Step 2: Improve passthrough APIs only where needed**

If a pattern’s primary surface is owned by a lower-level component, add the smallest framework-grade passthrough needed for marker injection instead of adding wrapper noise.

- [ ] **Step 3: Update governance documentation**

Document:
- exact-match identity requirement
- abstract-component classification rule
- why root/context/portal primitives are governed differently from concrete rendered surfaces

- [ ] **Step 4: Re-run the focused audit**

Run: `pnpm test -- src/runtime-metadata-identity-contract.test.ts`
Expected: PASS

### Task 4: Full verification and framework closeout

**Files:**
- Modify: `docs/reference/framework-governance.md`
- Test: `src/install-contract.test.ts`

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

- [ ] **Step 5: Repair dependency-boundary drift if it recurs**

Run: `pnpm install --frozen-lockfile --force`
Run: `pnpm test -- src/install-contract.test.ts`
Expected: PASS, with React/Radix typing resolved from this package boundary again.
