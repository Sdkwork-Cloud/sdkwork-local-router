---
layout: home

hero:
  name: SDKWORK UI PC React
  text: Shared PC React UI framework for desktop-class SDKWORK apps
  tagline: Shadcn-style primitives, sdkwork-studio-aligned semantic theming, and desktop application patterns in one publishable package.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: Governance
      link: /reference/framework-governance
    - theme: alt
      text: Docs Governance
      link: /reference/documentation-governance-catalog
    - theme: alt
      text: Governance Matrix
      link: /reference/framework-governance-matrix
    - theme: alt
      text: Runtime Catalog
      link: /reference/runtime-surface-catalog
    - theme: alt
      text: API Catalog
      link: /reference/public-api-structure-catalog

features:
  - title: Shared Primitives
    details: Unified button, icon-button, toolbar-button, action-menu button, bulk action bar, split button, input, checkbox, avatar, tabs, markdown viewer, key-value table, `CollectionGrid`, desktop data table, table, timeline, `RichTree`, compatibility `Tree`, status badge, stat card, popover, dialog, modal, confirm dialog, drawer, context menu, hover card, dropdown menu, tooltip, command, radio group, slider, combobox, date input, datetime input, `DateRangeField`, `DateTimeRangeField`, `DateRangePicker`, number input, segmented control, tag input, `Stepper`, card, panel-group, panel, panel resize handle, status bar, scroll, select, and the full upload family for files, images, video, audio, and documents with a shadcn-style authoring model.
  - title: Form Domain
    details: "A dedicated desktop form layer built on React Hook Form, with field wiring, validation messaging, form sections, form grids, action rows, reusable `FilterBar` composition, and settings-oriented `SettingsField` plus `SettingsSection` abstractions."
  - title: Workspace Chrome
    details: "Shared `Toolbar`, `ToolbarGroup`, `ToolbarSpacer`, `ToolbarSeparator`, `ToolbarButton`, `SplitButton`, and `StatusBar` primitives standardize header actions, editor command strips, window-bottom status regions, search bars, and settings-page work areas."
  - title: Resizable Workspaces
    details: "Shared `PanelGroup`, `Panel`, `PanelResizeHandle`, and `SidebarSection` primitives standardize desktop sidebars, inspectors, split views, and timeline-style pane layouts."
  - title: List And Detail Surfaces
    details: "`FilterBar`, `DateRangeField`, `DateTimeRangeField`, `DateRangePicker`, `CollectionGrid`, `DataTable`, `Timeline`, `ActivityFeed`, `DescriptionList`, `KeyValueTable`, `MarkdownViewer`, `DetailDrawer`, `OperationDrawer`, `AnchoredPickerSurface`, `PickerDialog`, `EntityPickerDialog`, `PickerSelectionFooter`, `TwoPaneSelectorPopover`, `InspectorRail`, `ListDetailWorkspace`, `CrudWorkbench`, and `WorkspaceScaffold` provide shared building blocks for search pages, admin listings, resource tables, asset galleries, release notes, contextual detail rails, edit-review drawers, anchored or modal picker workflows, shared selection footers, provider or workspace selectors, analytics filters, and modal inspection flows."
  - title: Navigation Domain
    details: Shared breadcrumb, `Menubar`, `Stepper`, pagination, and closable `WorkspaceTabs` primitives for PC routes, listings, settings flows, wizard-style desktop forms, and multi-region desktop workspaces.
  - title: PC Shell Patterns
    details: App shell, navigation rail, workspace panel, inspector panel, `InspectorRail`, `DesktopShellFrame`, `ListDetailWorkspace`, `ManagementWorkbench`, `CrudWorkbench`, `WorkspaceScaffold`, `SettingsCenter`, `DirtyStateBar`, `SearchCommandPalette`, `RestartRequiredNotice`, page header, desktop window controls, title bars, desktop app headers, `DetailDrawer`, `OperationDrawer`, `AnchoredPickerSurface`, `PickerDialog`, `EntityPickerDialog`, `PickerSelectionFooter`, `TwoPaneSelectorPopover`, and section headers for SDKWORK desktop apps.
  - title: Semantic Theme Tokens
    details: Brand, surface, border, text, state, radius, and shadow tokens expressed as stable CSS variables with a sdkwork-studio preset baseline and deep override support.
  - title: Framework Governance
    details: Source-level framework audits enforce token completeness, rendered component metadata, and shared authoring standards so the package evolves like a UI framework instead of drifting into a component bucket.
  - title: Governance Coverage Matrix
    details: A generated governance matrix cross-indexes every framework contract with the exact audit tests and reference pages that enforce it, keeping framework rules operational instead of aspirational.
  - title: Documentation Governance
    details: A generated documentation governance catalog makes the governed markdown surface explicit, including which pages are import-audited and which framework-backed snippets are typechecked.
  - title: Generated Contract Catalogs
    details: Generated runtime and public API catalogs expose the exact framework markers, slot anatomy, props contracts, slot contracts, structured helper types, and callback contracts for every published surface.
  - title: Feedback Standardization
    details: "A shared `feedback` domain unifies `ActivityFeed`, panel-local `InlineAlert`, filtered-result `EmptySearch`, desktop `NotificationCenter` panels, and a theme-aware Sonner-compatible `Toaster` and `toast` layer for desktop notifications."
  - title: Independent Package Build
    details: pnpm-based package build, generated d.ts files, shipped CSS, and VitePress documentation.
---
