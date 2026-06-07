# Desktop Shell Design

## Goal

Consolidate the repeated desktop top-chrome patterns found in `claw-studio`, `magic-studio-v2`, `sdkwork-notes-pc-react`, `sdkwork-chat-pc-react`, and other PC applications into one framework-owned pattern family.

## Decision

The shared package now owns four desktop shell patterns:

- `DesktopWindowControls`
- `DesktopTitleBar`
- `DesktopAppHeader`
- `SectionHeader`

These live under `src/components/patterns/desktop-shell` and `src/components/patterns/workspace`, while legacy top-level pattern files remain as compatibility re-export facades.

## Why This Shape

- `DesktopWindowControls` isolates runtime-specific window APIs behind a small controller contract, so the framework stays independent from Tauri and app-local globals.
- `DesktopTitleBar` captures the desktop-specific top bar layout rules: drag-region-safe leading area, centered workspace or navigation slot, trailing actions, and optional window controls.
- `DesktopAppHeader` handles the highest-frequency composition above `DesktopTitleBar`: brand mark, product title, supporting copy, badges, actions, and window-control placement.
- `SectionHeader` captures sticky list and workspace subheaders that appear across asset pages, search pages, settings panels, and admin or table surfaces.

## API Standard

### DesktopWindowControls

- controlled by `DesktopWindowController`
- supports `header` and `floating` variants
- keeps labels overridable for i18n layers

### DesktopTitleBar

- slot-based: `leading`, `center`, `trailing`
- supports optional `windowController` or a custom `windowControls` override
- preserves drag-region boundaries by default

### DesktopAppHeader

- provides a higher-level app header composition on top of `DesktopTitleBar`
- supports either a custom `brand` slot or a standard `brandMark + title + subtitle + badge` assembly
- keeps center navigation and trailing actions app-owned

### SectionHeader

- supports `title`, `description`, `eyebrow`, `meta`, `actions`
- supports sticky behavior and a secondary content row

## Migration Mapping

- local `DesktopWindowControls` or `WindowControls` implementations should migrate to `DesktopWindowControls` plus a per-app controller adapter
- local desktop app headers should migrate to `DesktopAppHeader` first, then only drop to `DesktopTitleBar` when they need lower-level composition
- list, asset, and workspace subheaders should migrate to `SectionHeader` before introducing more bespoke wrappers
