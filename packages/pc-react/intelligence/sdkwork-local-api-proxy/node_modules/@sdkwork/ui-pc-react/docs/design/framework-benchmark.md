# Framework Benchmark

## Why Reclassify The Component Tree

The first iteration of `sdkwork-ui-pc-react` used a simple split:

- `ui`
- `patterns`

That was enough to start implementation, but it was too flat for a serious long-term framework.

## Current Industry References

The current leading React UI frameworks converge on a similar classification idea even when their implementation styles differ:

| Framework | Official classification signal | Design takeaway |
| --- | --- | --- |
| [shadcn/ui](https://ui.shadcn.com/docs/components) | Component registry of composable primitives | Keep primitives composable and local-first |
| [Radix Primitives](https://www.radix-ui.com/primitives/docs/overview/introduction) | Accessibility-first primitive catalog | Keep low-level behavior separate from opinionated patterns |
| [MUI](https://mui.com/material-ui/all-components/) | Inputs, data display, feedback, surfaces, navigation, layout | Use category-first discoverability |
| [Ant Design](https://ant.design/components/overview/) | General, layout, navigation, data entry, data display, feedback | Separate data entry, data display, and feedback clearly |
| [Chakra UI](https://chakra-ui.com/docs/components) | Broad component catalog plus composition primitives | Blend primitives with ergonomic layout helpers |
| [Mantine](https://mantine.dev/core/getting-started/) | Large categorized component inventory and focused package boundaries | Keep categories explicit and scalable |
| [Base UI](https://base-ui.com/react/overview) | Headless foundations and reusable behavior contracts | Keep behavior seams reusable so desktop shells can stay branded and app-specific |

## SDKWORK Decision

Based on those references, `sdkwork-ui-pc-react` now uses these top-level UI categories:

- `actions`
- `data-entry`
- `form`
- `data-display`
- `feedback`
- `layout`
- `navigation`
- `overlays`

And it keeps app-level composition in:

- `patterns`

Theme and utility concerns remain outside the component tree:

- `theme`
- `lib`

## Why This Is Better

### Better discoverability

Developers can look for a component by intent, not by filename memory.

### Better scalability

As the framework grows, adding filter bars, search forms, tables, progress, tabs, inline alerts, toasts, drawers, trees, number inputs, uploads, or breadcrumbs will not force another major reorganization.

### Better parity with mainstream ecosystems

Developers moving between SDKWORK UI, MUI, Ant Design, Mantine, Chakra UI, or shadcn-style stacks will immediately recognize the grouping logic, including the separation between raw input primitives and higher-level form orchestration.

That parity is already visible in the current SDKWORK implementation wave:

- `actions` now contains direct triggers, compact `IconButton` affordances, reusable `ToolbarButton` toggles, and command-surface primitives
- `data-entry` keeps raw field controls, number steppers, combobox/date entry, datetime/range entry, and upload entry separate from full-form orchestration
- `form` now owns both full-form orchestration and `FilterBar` composition instead of forcing list filters into page-local wrappers
- `data-display` owns description lists, table, and tree structures instead of scattering them between feature folders
- `feedback` keeps inline alerts, filtered-result `EmptySearch`, and toast delivery in one explicit domain instead of splitting them across ad hoc status cards and notification stores
- `layout` owns reusable `Toolbar` composition and `PanelGroup` split workspaces so editor, sidebar, and settings layouts do not have to live inside app-specific panel abstractions
- `overlays` now covers low-level dialog primitives, higher-level modal shells, side-panel, context, and hover-preview work regions through `Dialog`, `Modal`, `ConfirmDialog`, `Drawer`, `ContextMenu`, and `HoverCard`
- the upload family intentionally follows the same direction seen in Ant Design Upload, Mantine Dropzone, and Chakra UI File Upload: one shared foundation, explicit file constraints, preview-aware media presets, inline rejection feedback, item actions, and clear composition seams for desktop workflows
- the current SDKWORK upload layer also adopts desktop-native intake seams that matter in those ecosystems: single-slot replacement, clipboard paste for screenshot-style flows, folder upload, and explicit list-clearing controls
