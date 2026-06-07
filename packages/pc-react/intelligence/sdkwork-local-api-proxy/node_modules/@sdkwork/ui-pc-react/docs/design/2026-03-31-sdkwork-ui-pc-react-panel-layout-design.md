# SDKWORK UI PC React Panel Layout Design

## Scope

This iteration adds the shared desktop split-workspace family:

- `PanelGroup`
- `Panel`
- `PanelResizeHandle`

These belong in the `layout` domain because they define reusable workspace structure rather than business-specific content.

## Audit Signal

Repeated multi-pane and resizable layout seams already exist across the PC React application family:

- `magic-studio-v2` repeats split views and drag handles across generation, notes, film, editor, and magiccut packages
- `claw-studio` shell exposes sidebar resize behavior and persisted chrome widths
- `openchat-admin` carries custom sidebar resize handles
- backend/admin style desktops repeat the same inspector, navigation, and content split patterns

The duplication is not about business logic. It is layout infrastructure, which makes it a framework responsibility.

## Alternatives

### Alternative 1: Keep app-local resize hooks and divider components

This keeps each app independent, but it preserves repeated pointer logic, hit-area tuning, accessibility semantics, and theme drift.

### Alternative 2: Build a small SDKWORK wrapper around a proven resizable-panel primitive

This gives the best trade-off. The framework owns the desktop API, theme integration, and directory placement while delegating low-level resize mechanics to a mature library.

### Alternative 3: Build a bespoke SDKWORK resize engine

This would add maintenance burden without meaningful product differentiation at the current stage.

## Decision

Implement `PanelGroup`, `Panel`, and `PanelResizeHandle` in `src/components/ui/layout/panel-group.tsx` using `react-resizable-panels` as the low-level primitive base.

The SDKWORK wrapper should:

- expose a stable framework API
- map orientation to `direction`
- apply claw-aligned semantic tokens
- keep resize-handle visuals and hit areas consistent
- prevent consuming apps from depending directly on the third-party primitive package

## API

### `PanelGroup`

- owns layout direction through `direction`
- passes through standard resizable-panel group props
- should work for sidebar/content, inspector/content, and editor/timeline layouts

### `Panel`

- wraps a resizable region
- passes through size and collapsible behavior
- keeps panel content in a min-size-safe overflow container

### `PanelResizeHandle`

- provides the interactive divider
- supports `withHandle` for visible grip affordances in desktop workspaces
- derives direction-aware styling from the parent group context

## Styling Direction

The panel system should follow SDKWORK semantic tokens:

- panel radii from `--sdk-radius-panel`
- borders from `--sdk-color-border-default` and `--sdk-color-border-strong`
- focus feedback from `--sdk-color-border-focus`
- shadows from `--sdk-shadow-sm`
- surfaces from `--sdk-color-surface-panel`

This keeps the split layout system compatible with claw-studio-aligned defaults while remaining fully themeable.

## Directory Decision

The family should live in:

- `src/components/ui/layout/panel-group.tsx`

It should be exported through:

- `src/components/ui/layout/index.ts`
- `src/components/ui/index.ts`

This keeps high cohesion and avoids putting layout primitives inside `patterns`, which should remain higher-level composition helpers.

## Follow-up

Once the split layout baseline is stable, the next higher-order desktop layout abstractions should likely be:

- `SplitButton`
- `DatePicker`
- `DataGrid`
- `StatusBar`
- `WorkspaceSplitView`
