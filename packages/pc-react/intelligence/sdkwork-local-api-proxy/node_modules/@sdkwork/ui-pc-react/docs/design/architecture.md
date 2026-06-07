# Architecture

## Decision

`sdkwork-ui-pc-react` is implemented as a single publishable package with layered exports instead of a many-package workspace.

That choice gives the best balance of:

- strong cohesion
- low operational overhead
- clear adoption path
- minimal versioning complexity

## Layers

### Theme Layer

The theme layer defines semantic tokens through a `preset + overrides` model.

The default preset is `sdkwork`, which maps the framework baseline to the existing `sdkwork-studio` desktop visual system while keeping semantic token names generic.

The semantic token groups are:

- brand
- surface
- text
- border
- state
- radius
- shadow

These are turned into CSS variables and can be applied either by `AppShell` or `SdkworkThemeProvider`.

Canonical exports `SDKWORK_LIGHT_THEME` and `SDKWORK_DARK_THEME` define the shared SDKWORK preset baseline.

### UI Domain Layer

The shared UI layer contains reusable shadcn-style controls and a dedicated form domain:

- `Avatar`
- `Button`
- `Input`
- `Textarea`
- `Label`
- `Checkbox`
- `Switch`
- `Select`
- `Tabs`
- `Dialog`
- `Modal`
- `ConfirmDialog`
- `Popover`
- `Card`
- `Badge`
- `Progress`
- `Skeleton`
- `EmptySearch`
- `ActivityFeed`
- `InlineAlert`
- `NotificationCenter`
- `Toaster`
- `toast`
- `Separator`
- `ScrollArea`
- `Toolbar`
- `ToolbarGroup`
- `ToolbarSpacer`
- `ToolbarSeparator`
- `PanelGroup`
- `Panel`
- `PanelResizeHandle`
- `SidebarSection`
- `DescriptionList`
- `DescriptionItem`
- `DescriptionTerm`
- `DescriptionDetails`
- `DataTable`
- `MarkdownViewer`
- `KeyValueTable`
- `Table`
- `StatusBadge`
- `StatCard`
- `RadioGroup`
- `Slider`
- `DropdownMenu`
- `Tooltip`
- `IconButton`
- `ToolbarButton`
- `ActionMenuButton`
- `BulkActionBar`
- `Command`
- `CommandDialog`
- `Combobox`
- `DateInput`
- `DateTimeInput`
- `DateRangeField`
- `DateTimeRangeField`
- `DateRangePicker`
- `ImageUpload`
- `VideoUpload`
- `AudioUpload`
- `DocumentUpload`
- `NumberInput`
- `SegmentedControl`
- `TagInput`
- `Form`
- `FormField`
- `FormSection`
- `FormGrid`
- `FormActions`
- `SettingsField`
- `SettingsSection`
- `FilterBar`
- `FilterBarSection`
- `FilterBarActions`
- `FileUpload`
- `Breadcrumb`
- `Stepper`
- `Pagination`
- `WorkspaceTabs`
- `RichTree`
- `Tree`
- `Drawer`
- `ContextMenu`
- `HoverCard`

The primitive directories are classified by the same mental model used by leading React UI frameworks:

- `actions`
- `data-entry`
- `form`
- `data-display`
- `feedback`
- `layout`
- `navigation`
- `overlays`

The directory model intentionally separates standalone field controls from form orchestration:

- `data-entry` provides independently reusable input primitives such as `Input`, `Select`, `Checkbox`, `RadioGroup`, and `Slider`
- `data-entry` also owns richer app-agnostic entry primitives such as `Combobox`, `DateInput`, `DateTimeInput`, `DateRangeField`, `DateTimeRangeField`, the popover-based `DateRangePicker`, `NumberInput`, `SegmentedControl`, `TagInput`, and the full upload family around `FileUpload`, including rejection feedback and remote item action hooks
- `form` composes those primitives with React Hook Form bindings, validation messaging, desktop sectioning, settings-field orchestration through `SettingsField` and `SettingsSection`, action layouts, and list-filter composition through `FilterBar`
- `actions` now covers direct button affordances, compact icon triggers, split-button affordances, action-menu affordances, batch-selection action bars, toolbar toggle actions, and keyboard-friendly command surfaces
- `data-display` now includes both compact identity surfaces and heavier desktop information surfaces such as collection grids, resource data tables, description lists, markdown presentation, key-value detail tables, tables, timelines, trees, metric cards, and status labels
- `layout` now owns reusable workspace structure such as cards, panel groups, resize handles, sidebar sections, status bars, scroll regions, separators, and `Toolbar` families that sit between raw containers and full app shells
- `navigation` provides reusable route context, menubar-grade application navigation, paging primitives, and workspace tab strips that should stay lighter than app shells but more structured than ad hoc links
- `overlays` includes low-level dialog primitives, higher-level desktop modal shells, non-route secondary work regions such as `Drawer`, and lightweight layered interactions such as `ContextMenu` and `HoverCard`
- `feedback` handles both inline state presentation and app-wide notification delivery through `InlineAlert`, `EmptySearch`, `NotificationCenter`, plus a theme-aware `Toaster` and `toast` facade that matches the repeated `sonner` adoption pattern already present across SDKWORK PC apps

The physical source layout is also evolving toward domain-owned composite files:

```text
src/components/ui
  actions/action-menu-button.tsx
  actions/bulk-action-bar.tsx
  actions/icon-button.tsx
  actions/split-button.tsx
  actions/toolbar-button.tsx
  actions/command.tsx
  data-entry/combobox.tsx
  data-entry/date-input.tsx
  data-entry/date-range-picker.tsx
  data-entry/upload/file-upload.tsx
  data-entry/upload/upload-dropzone.tsx
  data-entry/upload/upload-item.tsx
  data-entry/upload/upload-presets.tsx
  data-entry/upload/upload-types.ts
  data-entry/upload/upload-utils.ts
  data-entry/number-input.tsx
  data-entry/segmented-control.tsx
  data-entry/tag-input.tsx
  data-display/data-grid.tsx
  data-display/data-table.tsx
  data-display/description-list.tsx
  data-display/key-value-table.tsx
  data-display/markdown-viewer.tsx
  data-display/timeline.tsx
  data-display/tree.tsx
  feedback/empty-search.tsx
  feedback/activity-feed.tsx
  feedback/inline-alert.tsx
  feedback/notification-center.tsx
  feedback/toast.tsx
  form/filter-bar.tsx
  form/form.tsx
  form/form-layout.tsx
  form/settings-field.tsx
  form/settings-section.tsx
  layout/panel-group.tsx
  layout/sidebar-section.tsx
  layout/status-bar.tsx
  layout/toolbar.tsx
  navigation/menubar.tsx
  navigation/stepper.tsx
  navigation/workspace-tabs.tsx
  overlays/context-menu.tsx
  overlays/drawer.tsx
  overlays/hover-card.tsx
  overlays/modal.tsx
```

This keeps advanced component logic close to its owning domain and prevents the root `ui` folder from degenerating into a flat unbounded registry.

Inside that layering, SDKWORK now keeps three distinct modal-related responsibilities:

- `Dialog` for low-level Radix-compatible composition
- `Modal` for opinionated desktop shells with size, alignment, header, body, and footer structure
- `ConfirmDialog` for the highest-frequency confirmation flow shared across settings, admin, and productivity-style apps

### Pattern Layer

The pattern layer contains desktop PC composition helpers:

- `AppShell`
- `PageHeader`
- `NavigationRail`
- `DesktopShellFrame`
- `WorkspacePanel`
- `InspectorPanel`
- `InspectorRail`
- `SettingsCenter`
- `DirtyStateBar`
- `DesktopWindowControls`
- `DesktopTitleBar`
- `DesktopAppHeader`
- `ListDetailWorkspace`
- `ManagementWorkbench`
- `CrudWorkbench`
- `SearchCommandPalette`
- `WorkspaceScaffold`
- `RestartRequiredNotice`
- `DetailDrawer`
- `OperationDrawer`
- `AnchoredPickerSurface`
- `PickerDialog`
- `EntityPickerDialog`
- `PickerSelectionFooter`
- `TwoPaneSelectorPopover`
- `SectionHeader`
- `EmptyState`
- `LoadingBlock`
- `StatusNotice`

The feedback layer is intentionally grounded in the currently converging PC notification stack:

- `sdkwork-studio`, `sdkwork-notes`, `sdkwork-drive`, and `sdkwork-desktop-settings` already use `sonner`
- `sdkwork-chat-pc-react` exposes a wrapper with the same mental model
- `sdkwork-backend-react-web` and `magic-studio-v2` still carry custom toast abstractions that can now converge on the shared feedback domain instead of maintaining more local stores
- panel-local warning and remediation blocks recur across upload, settings, backend/admin, and billing-style PC flows, which justifies keeping `InlineAlert` in the shared `feedback` layer rather than scattering ad hoc warning cards across apps
- activity histories, review queues, and operation feeds recur across backend/admin, drive, portal, and settings-style desktops, which justifies keeping `ActivityFeed` in `feedback` rather than letting each app rebuild another vertical event surface

The same audit also justifies a dedicated numeric input primitive:

- `sdkwork-desktop-settings`, `sdkwork-studio`, `sdkwork-cloud-portal`, `sdkwork-backend-react-web`, and `magic-studio-v2` all repeat bounded numeric fields with min/max/step semantics
- `NumberInput` keeps that behavior in `data-entry` instead of letting each app reinvent stepper controls with slightly different keyboard and layout behavior

The date and range-filter suite is now an explicit framework responsibility:

- `sdkwork-studio` and `sdkwork-drive-pc-react` already share a native-input desktop `DateInput` seam, while desktop-settings and api-router families repeat preset-driven date and datetime filters
- `DateTimeInput`, `DateRangeField`, and `DateTimeRangeField` now keep inline range-entry behavior in `data-entry`, while `DateRangePicker` owns popover calendar selection for date-only ranges; app services remain responsible for Unix timestamps, preset enums, and backend query serialization
- the next shared additions in this family should therefore center on richer popup `DatePicker` shells, preset controllers, active-filter chips, and normalization helpers for desktop date and datetime values

Desktop selection actions and overflow menus are now explicit framework responsibilities too:

- asset lists, admin tables, and editor surfaces repeatedly pair one visible action with an adjacent overflow trigger or a sticky multi-select action strip
- leading React UI systems consistently treat action menus and bulk-selection bars as first-class desktop patterns rather than letting them emerge as one-off combinations of buttons and dropdowns
- `ActionMenuButton` keeps trigger-plus-overflow composition in `actions`, while `BulkActionBar` keeps selection context, count summaries, sticky positioning, and clear affordances in a reusable desktop action surface

Resizable split workspaces are now explicit framework responsibilities too:

- `magic-studio-v2` repeats side-panel, notes, film, and timeline resizers across multiple packages
- `sdkwork-studio` and `openchat-admin` both maintain shell/sidebar resize handles and width persistence logic
- backend/admin and workspace-heavy PC apps need the same split-view affordance without reimplementing drag behavior
- `PanelGroup`, `Panel`, and `PanelResizeHandle` keep that concern in `layout` instead of spreading one-off resizer hooks and divider components through each app

Search and filtered-empty states are also explicit framework responsibilities now:

- `sdkwork-chat-pc-react` already carries a specialized empty-search state
- notes, backend/admin, and portal-style search panes repeat the same "no result for current keyword" pattern
- `EmptySearch` keeps that UX in the shared `feedback` layer instead of scattering one-off empty cards across apps

List filters and detail drawers are now explicit framework responsibilities as well:

- admin and list-heavy applications repeat the same search plus select plus action-strip composition above tables and listings
- drawer and modal inspection flows repeat the same `DetailItem` and key-value presentation pattern
- `FilterBar` keeps filter orchestration in `form`, `DescriptionList` keeps structured read-only details in `data-display`, `DetailDrawer` keeps the summary-plus-sections inspection shell in `patterns`, and `OperationDrawer` keeps edit-review drawers in the same pattern layer instead of pushing workflow chrome down into `Drawer`

Picker workflows are now explicit framework responsibilities too:

- `magic-studio-v2` repeats prompt pickers, asset pickers, workspace pickers, and film-entity pickers with the same centered shell, search or filter strip, optional navigation rail, loading or empty states, and confirmation footer
- top-tier desktop UI systems consistently keep this as a higher-order pattern instead of scattering every picker across app-local dialogs
- `PickerDialog` keeps that reusable shell in `patterns/picker`, composed on top of `Modal`, `InlineAlert`, `LoadingBlock`, and `EmptySearch`, while applications remain responsible for query orchestration, selection state, and item rendering
- `EntityPickerDialog` now keeps the reusable selection contract in the same `patterns/picker` family, adding shared single or multiple selection semantics, selected-summary footer behavior, confirm flows, and item-level render hooks without taking over fetching, routing, or business DTOs
- `PickerSelectionFooter` now keeps the shared summary, clear, cancel, and confirm action contract in the same family, so modal pickers and future anchored pickers can share one footer surface without cloning button rows
- `AnchoredPickerSurface` now keeps the reusable anchored shell in `patterns/picker`, composed on top of `Popover`, `InlineAlert`, `LoadingBlock`, and `EmptySearch`, so compact desktop selectors can share the same header, filter, footer, and viewport-aware chrome
- `magic-studio-v2` and `sdkwork-cloud-portal` also repeat anchored provider-model, workspace-project, and similar master-detail selectors that should not be rebuilt as one-off popovers
- `TwoPaneSelectorPopover` now keeps that anchored two-column picker contract in `patterns/picker`, reusing `AnchoredPickerSurface` for the shell while keeping controlled or inferred active sections, app-owned section and item rendering, and close-on-select behavior for local selection context without promoting simple selectors into modal workflows

Collection-grid shells are now explicit framework responsibilities too:

- `sdkwork-backend-react-web` already carries an app-local collection-grid shell for desktop admin listings
- gallery, asset, search, and card-oriented desktop pages repeat the same loading, empty, card-grid, and pagination choreography even when their item markup differs
- `CollectionGrid` keeps that collection orchestration in `data-display` instead of letting each app rebuild the same outer list-state shell around custom cards

Admin data-table surfaces are now explicit framework responsibilities too:

- desktop admin and operations screens repeatedly need dense row-based tables with selection, bulk actions, row actions, and column visibility that sit between raw table primitives and page-level CRUD shells
- leading React UI systems consistently ship a first-class data-table layer because keyboardable resource grids should not be rebuilt from bare `table` markup in every package
- `DataTable` keeps that desktop grid contract in `data-display`, composed on top of the base `Table` primitives plus shared selection and bulk-action affordances, instead of scattering app-local table wrappers across backend, portal, and settings packages

Ordered status-history surfaces are now explicit framework responsibilities too:

- `sdkwork-backend-react-web` already carries a local `Timeline` component and `sdkwork-cloud-portal` already normalizes withdrawal timeline entries for payment progress views
- finance, audit, delivery, and operation-history panels repeat the same vertical milestone shell even when the copy and actions differ
- `Timeline` keeps that progression-oriented rendering in `data-display` instead of scattering bespoke ordered status lists across apps

Markdown and dense detail presentation are now explicit framework responsibilities too:

- notes, release workflows, settings help surfaces, changelog drawers, and backend/admin detail views repeatedly need lightweight markdown rendering and dense read-only key-value presentation
- leading React UI systems consistently expose dedicated markdown or rich-content renderers and description/detail table patterns because these are infrastructure concerns, not business widgets
- `MarkdownViewer` keeps formatted help, release notes, and generated text display in `data-display`, while `KeyValueTable` keeps dense label-value inspection in a reusable surface that fits drawers, inspector rails, and settings summaries

Settings editors and desktop configuration rows are now explicit framework responsibilities too:

- `magic-studio-v2` centralizes setting-row composition in `SettingsWidgets`, and the same label plus description plus control plus reset pattern is repeated across provider, media, storage, and agent configuration pages
- sidebar-heavy notes and asset packages repeat collapsible grouping that is now absorbed by `SidebarSection`
- `SettingsField` and `SettingsSection` keep settings-page orchestration in `form` instead of letting each application invent another ad hoc row wrapper
- `SettingsCenter` and `DirtyStateBar` keep the higher-level settings navigation, search, and unsaved-change workflow in `patterns` instead of leaving every desktop app to rebuild a local settings shell

Tag editing and notification trays are now explicit framework responsibilities too:

- `sdkwork-notes`, `sdkwork-studio` community flows, and backend/admin content forms all repeat lightweight tag capture or chip-editing behavior
- `magic-studio-v2` and backend/admin shells already repeat notification-center panels and notification-feed item rendering
- `TagInput` keeps lightweight chip editing in `data-entry`, while `NotificationCenter` keeps notification-list presentation in `feedback`

Closable workspace tab strips are now explicit framework responsibilities as well:

- `sdkwork-desktop-settings` repeats pill-style open-file tabs with dirty-state dots and close affordances in the workspace editor panel
- editor-style SDKWORK applications need tab-strip chrome that is more opinionated than base `Tabs` but still lighter than a full shell
- `WorkspaceTabs` keeps that pattern in `navigation` instead of scattering per-app tab chip implementations

Desktop command menus are now explicit framework responsibilities too:

- leading React UI systems such as MUI, Ant Design, Mantine, Chakra UI, and shadcn all treat app and workspace navigation as a first-class domain instead of leaving desktop menus to ad hoc buttons
- desktop-class SDKWORK applications need predictable top-level menu chrome for file, view, and workspace commands without coupling shared code to any Tauri runtime menu bridge
- `Menubar` keeps that menu composition in `navigation` instead of forcing each app to invent a local top-menu shell

Wizard-style progression is now an explicit framework responsibility too:

- `sdkwork-backend-react-web`, `sdkwork-cloud-portal`, `sdkwork-studio`, and `sdkwork-desktop-settings` all repeat install, publish, or configuration-step guidance with only layout and state-tone differences
- top-tier React UI systems consistently ship dedicated stepper or steps primitives because multi-step workflow orientation should not be rebuilt in each wizard surface
- `Stepper` keeps that progression guidance in `navigation` instead of scattering app-local circles, connectors, and status text through setup or publish pages

Primary-plus-secondary action seams are now explicit framework responsibilities too:

- admin, portal, and editor flows repeatedly pair one dominant action with adjacent overflow choices such as publish variants, bulk execution variants, or create/import forks
- industry frameworks consistently expose this as a dedicated split-button family instead of scattered button-plus-dropdown pairings
- `SplitButton` keeps that action composition in `actions` instead of repeating local wrappers around `Button` plus `DropdownMenu`

Desktop bottom status chrome is now an explicit framework responsibility too:

- desktop editors, shells, and admin consoles frequently repeat a low-profile bottom bar for branch, sync, mode, runtime, or selection summaries
- top-tier UI systems place this in layout or app-shell structure, not inside page-local business components
- `StatusBar` keeps that concern in `layout` instead of scattering ad hoc footer rows through desktop windows

The upload system is now an explicit framework responsibility too:

- `sdkwork-backend-react-web` already carries app-local image and video upload shells
- studio and media-heavy desktop apps need local preview, file constraints, and type-specific affordances without re-implementing drag-and-drop surfaces
- screenshot-first and asset-heavy PC flows also need clipboard paste, folder intake, and single-slot replacement semantics
- the shared upload family keeps those concerns in `data-entry` instead of letting every app invent its own media uploader wrapper

Desktop shell chrome is now an explicit framework responsibility as well:

- `sdkwork-notes`, `sdkwork-studio`, `sdkwork-chat-pc-react`, and `magic-studio-v2` all repeat the same window control cluster with only runtime adapters changing
- multiple PC apps repeat the same glass title bar, centered navigation or workspace slot, and trailing action cluster composition
- asset, list, and panel pages repeat sticky action headers that are structurally richer than `PageHeader` but lighter than a full shell
- `DesktopWindowControls`, `DesktopTitleBar`, `DesktopAppHeader`, and `SectionHeader` absorb that duplication without coupling the framework to Tauri, Router, or app-specific account and search behavior

Full desktop window framing is now an explicit framework responsibility too:

- `sdkwork-studio`, `sdkwork-drive`, `sdkwork-notes-pc-react`, `sdkwork-chat-pc-react`, `openchat-react-pc`, `magic-studio-v2`, and backend desktop shells all repeat the same outer frame concerns around header chrome, navigation rail, content viewport, and bottom status regions
- leading React desktop systems consistently expose a canonical shell or dashboard layout instead of requiring each product to re-author its own top-level frame composition
- `DesktopShellFrame` keeps that outer frame in `patterns/desktop-shell`, composed on top of `AppShell`, `DesktopAppHeader`, `NavigationRail`, and `StatusBar`, instead of leaving each app to rebuild its own main window contract

List-detail and inspector-rich workbenches are now explicit framework responsibilities too:

- `sdkwork-studio`, `magic-studio-v2`, `sdkwork-notes-pc-react`, and backend/admin desktop packages all repeat the same left navigation or collection rail plus main content surface plus optional right inspection region
- top-tier desktop UI systems treat this as a first-class workspace composition seam because the value is in consistent resizing, surface hierarchy, and inspector affordances rather than in app-local wrappers
- `ListDetailWorkspace` keeps that orchestration in `patterns`, composed on top of `PanelGroup`, `WorkspacePanel`, and `InspectorRail`, instead of letting each app rebuild three-pane desktop layout scaffolding
- `InspectorRail` keeps the shared right-rail contract in `patterns/workspace`, including eyebrow, title, summary, meta, section composition, and footer action affordances
- `WorkspaceScaffold` keeps the broader editor-style shell in `patterns/workspace`, including optional header, toolbar, sidebar, inspector, and bottom panel slots without coupling the framework to app-specific editors
- the next highest-value composition gaps after `AnchoredPickerSurface` are now richer popup date picking, preset-driven date ranges, `TreeSelect`, `TransferList`, and explorer-grade item contracts that still repeat above the shared shell

Management and command workbenches are now explicit framework responsibilities too:

- backend/admin, portal, settings, and studio applications repeatedly compose one page-level identity header with filter bars, batch or selection affordances, a main data surface, and an adjacent inspector or detail region
- desktop-class applications also repeatedly need one keyboard-first search and action launcher that stays app-agnostic while wiring into local command handlers
- `ManagementWorkbench` keeps the generic list and operations scaffold in `patterns/workbench`, `CrudWorkbench` keeps the more opinionated resource CRUD seam composed on top of `DataTable`, and `SearchCommandPalette` keeps global search and command-launch UX in `patterns/command`, all built on top of existing primitives instead of encouraging more app-local shells

Restart-required remediation is now an explicit framework responsibility too:

- Tauri-backed settings and provider-management flows repeatedly need a persistent warning plus primary restart action when changes require a relaunch
- that UX should not be rebuilt as bespoke inline warning bars in each settings package
- `RestartRequiredNotice` keeps that remediation seam in `patterns/system`, composed on top of `InlineAlert` and `Button`

## Styling Model

The package uses Tailwind CSS v4 during framework build time so consumers can import shipped CSS instead of scanning the framework source inside every app.

This is important because the current SDKWORK PC applications do not share one pnpm workspace, so the UI framework must remain independently buildable and consumable.
