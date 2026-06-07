# SDKWORK UI PC React Design

## Goal

Build a professional, reusable PC application UI framework for SDKWORK under `apps/sdkwork-ui/sdkwork-ui-pc-react`, using shadcn-ui principles and Radix primitives as the base, while standardizing shared desktop interaction patterns across:

- `claw-studio`
- `magic-studio-v2`
- `sdkwork-notes/sdkwork-notes-pc-react`
- `sdkwork-chat-pc-react`
- `sdkwork-cloud-portal`
- `sdkwork-desktop-settings`
- `sdkwork-drive/sdkwork-drive-pc-react`
- `openchat/app/openchat-react-pc`

## Current Landscape

### What exists today

- `claw-studio/packages/sdkwork-claw-ui` and `sdkwork-drive/sdkwork-drive-pc-react/packages/sdkwork-drive-ui` are effectively duplicated UI packages built on Radix + CVA + utility-class styling.
- `sdkwork-chat-pc-react/packages/sdkwork-openchat-pc-ui` contains a separate homegrown PC UI foundation, theme system, and editor-oriented components.
- `sdkwork-cloud-portal/packages/sdkwork-pc-portal-ui` is mostly page/layout composition rather than a reusable design system.
- `magic-studio-v2/packages/sdkwork-react-commons` already exposes a local component set and desktop framework patterns, but it is not aligned to shadcn conventions.
- `sdkwork-notes/sdkwork-notes-pc-react/packages/sdkwork-notes-commons` has a small local primitive set with its own visual language.
- `sdkwork-desktop-settings` already includes `components.json`, which confirms shadcn adoption intent, but the shared SDKWORK PC foundation is still missing.
- `apps/sdkwork-ui/sdkwork-ui-pc-react` exists only as an empty placeholder and does not yet provide package infrastructure, runtime code, or docs.

### Problems to solve

- Duplicate primitives across apps.
- Inconsistent desktop shell patterns.
- Different theme token systems and naming.
- No central publishable package for PC UI reuse.
- No framework-level documentation or adoption guide.
- No migration contract for existing app-local UI packages.

## Options Considered

### Option A: Single publishable package with layered exports

Ship one package, `@sdkwork/ui-pc-react`, with clear export layers:

- `components/ui/*` for shadcn-style primitives
- `components/patterns/*` for desktop PC layouts
- `theme/*` for tokens and provider
- `styles.css` for prebuilt CSS

Pros:

- Smallest operational surface
- Easiest to publish and consume
- Strong cohesion with simple adoption story
- Good fit for first high-quality release

Cons:

- Some internal modules live in one package rather than separate packages

### Option B: Multi-package workspace

Split into `core`, `patterns`, `icons`, `docs`, and `tokens`.

Pros:

- Maximal theoretical modularity

Cons:

- Higher maintenance cost
- Harder migration and versioning
- Overkill for the current maturity level

### Option C: Token-only package plus keep app-local UI packages

Pros:

- Lowest short-term migration risk

Cons:

- Does not remove duplication
- Does not produce a true framework
- Fails the user goal of a shared PC UI standard

## Decision

Choose Option A.

`sdkwork-ui-pc-react` will be implemented as a single publishable pnpm package with layered subpath exports, prebuilt CSS, shadcn-style primitives, and desktop application patterns. Existing app-local UI packages become migration targets, not the long-term source of truth.

## Architecture

### Package structure

`sdkwork-ui-pc-react` will contain:

- `src/lib`
  - utility helpers such as `cn`
- `src/theme`
  - semantic token model
  - theme creation helpers
  - `SdkworkThemeProvider`
- `src/components/ui`
  - foundational primitives built in shadcn style on Radix
- `src/components/patterns`
  - higher-level desktop patterns
- `src/styles`
  - compiled Tailwind 4 stylesheet with SDKWORK tokens and base layers
- `docs`
  - VitePress documentation site

### Styling strategy

- Use shadcn-style component authoring patterns.
- Use Radix primitives for accessibility-critical controls.
- Use Tailwind CSS v4 in the framework build so the package ships prebuilt CSS instead of forcing each consuming app to scan framework source.
- Use semantic CSS variables for brand, surface, border, motion, and typography tokens.
- Keep theme overrides brand-focused and semantic rather than app-specific.

### API layers

#### Layer 1: Primitives

Reusable components with no business semantics:

- `Button`
- `Input`
- `Textarea`
- `Label`
- `Checkbox`
- `Switch`
- `Select`
- `Dialog`
- `Card`
- `Badge`
- `Separator`
- `ScrollArea`

#### Layer 2: Feedback and states

- `EmptyState`
- `LoadingBlock`
- `StatusNotice`

#### Layer 3: Desktop patterns

- `AppShell`
- `PageHeader`
- `NavigationRail`
- `WorkspacePanel`
- `InspectorPanel`
- `SectionCard`

These patterns stay generic enough for chat, notes, portal, studio, and desktop utility apps.

## Theming

### Token model

Use semantic tokens instead of app-specific names:

- brand
- surface
- panel
- border
- text
- success
- warning
- danger
- focus

### Theme contract

Expose a theme factory that allows:

- light and dark defaults
- `system` mode
- brand accent overrides
- density and radius overrides

The framework ships with an SDKWORK default theme rather than per-app themes.

## Build and packaging

### Package goals

- `pnpm install`
- `pnpm build`
- `pnpm test`
- `pnpm docs:dev`
- `pnpm docs:build`

### Packaging goals

- publishable package entry
- subpath exports
- generated `.d.ts`
- built CSS asset export
- no hard dependency on a repo-wide workspace

## Migration strategy

### Phase 1

Build the framework package and docs.

### Phase 2

Absorb duplicated generic primitives from:

- `sdkwork-claw-ui`
- `sdkwork-drive-ui`
- `sdkwork-react-commons`
- `sdkwork-notes-commons`
- `sdkwork-openchat-pc-ui`

### Phase 3

Adopt framework primitives and patterns in PC apps incrementally through:

- app-local wrappers
- package substitution
- business component extraction on demand

### Non-goal for the first release

Do not force a risky full rewrite of every PC app in one step. The framework must become stable and well-documented before deep migration.

## Documentation strategy

The VitePress site will cover:

- framework vision
- architecture
- theme system
- primitive inventory
- desktop pattern inventory
- app migration audit
- package integration guide

## Quality bar

The framework standard for release is:

- accessible primitives
- consistent semantics
- independent package build
- fresh tests for token and pattern behavior
- documentation that explains both usage and migration

