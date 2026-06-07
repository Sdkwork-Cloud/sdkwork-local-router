# SDKWORK UI PC React Toolbar Actions Design

## Scope

This iteration adds one new shared desktop action primitive:

- `ToolbarButton` in the `actions` domain

The goal is to standardize the repeated compact toolbar toggle pattern found across editor, timeline, and workspace command strips without collapsing those behaviors into app-local helper fragments.

## Audit Signal

The same narrow toolbar action seam already recurs across multiple PC React applications:

- `sdkwork-notes/sdkwork-notes-pc-react/packages/sdkwork-notes-notes/src/components/NoteEditorPane.tsx`
- `sdkwork-chat-pc-react/packages/sdkwork-openchat-pc-ui/src/components/RichTextEditor/index.tsx`
- `sdkwork-chat-pc-react/packages/sdkwork-openchat-pc-commons/src/components/ui/RichTextEditor/index.tsx`
- `openchat/app/openchat-react-pc` rich-text editor packages
- `magic-studio-v2/packages/sdkwork-react-magiccut/src/components/Timeline/MagicCutTimelineToolbar.tsx`

Those implementations vary in color and local styling, but they share the same framework-level behavior:

- compact desktop sizing
- optional active or pressed state
- icon-only or icon-plus-label composition
- editor-safe mouse behavior that preserves the active text selection
- keyboard shortcut hinting through button title copy

## Alternatives

### Alternative 1: Keep toolbar buttons local to each editor

This has the lowest immediate change cost, but it preserves repeated accessibility, focus, and pressed-state logic in multiple apps.

### Alternative 2: Build a shared `ToolbarButton`

This extracts the repeated behavior while keeping business workflows local. It is the best high-cohesion and low-coupling move for the current audit slice.

### Alternative 3: Skip directly to `PanelGroup` or a richer editor framework

That would broaden scope too early. Toolbar actions are the smaller repeated seam and should stabilize first.

## Decision

Implement `ToolbarButton` in `src/components/ui/actions/toolbar-button.tsx`.

It belongs in `actions`, not `layout`, because it is a reusable command trigger with pressed-state semantics rather than a container surface.

## API

`ToolbarButton` should support:

- `pressed` for accessible toggle-state semantics via `aria-pressed`
- `active` as a migration-friendly alias for audited local implementations
- `size` with `default` and `compact`
- `shortcut` to compose a desktop-oriented title string
- `preserveFocusOnMouseDown` for editor and timeline toolbars that must avoid stealing focus
- regular button attributes, children composition, and custom class overrides

## Styling Direction

The component should follow the existing claw-aligned token system:

- transparent idle state
- muted text by default
- soft hover panel background
- branded soft pressed state
- control radius and focus ring from semantic theme variables

This keeps the component themeable without hard-coding app-local colors.

## Implementation Notes

- Export from `components/ui/actions` and the root `components/ui` barrel
- Register in the shared component catalog
- Document it in README and VitePress usage examples
- Keep the abstraction smaller than `SplitButton` or `CommandBar`

## Follow-up

After `ToolbarButton`, the next likely action and layout seams remain:

- `SplitButton`
- `CommandBar`
- `PanelGroup`
- `ResizablePanel`
