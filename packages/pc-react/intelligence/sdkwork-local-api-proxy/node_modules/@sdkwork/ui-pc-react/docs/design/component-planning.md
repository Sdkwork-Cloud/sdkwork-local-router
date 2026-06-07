# Component Planning

## Planning Principles

- High cohesion: each component should have one clear UI responsibility
- Low coupling: no business logic or app-local contracts in shared primitives
- Desktop-first ergonomics: spacing, paneling, navigation, and multi-region layout matter
- Migration-friendly APIs: shared components should absorb obvious duplication first

## Domain Directory Model

| Domain | Current components | Responsibility |
| --- | --- | --- |
| `actions` | `Button`, `IconButton`, `ToolbarButton`, `SplitButton`, `ActionMenuButton`, `BulkActionBar`, `Command`, `CommandDialog`, `CommandInput`, `CommandItem` | Command triggers, palette actions, split-button affordances, action-menu composition, bulk-selection action strips, compact icon affordances, toolbar toggles, and keyboard-first action surfaces |
| `data-entry` | `Input`, `Textarea`, `Checkbox`, `Switch`, `Select`, `Label`, `RadioGroup`, `Slider`, `Combobox`, `DateInput`, `DateTimeInput`, `DateRangeField`, `DateTimeRangeField`, `DateRangePicker`, `NumberInput`, `SegmentedControl`, `TagInput`, `FileUpload`, `ImageUpload`, `VideoUpload`, `AudioUpload`, `DocumentUpload` | Standalone value input primitives, richer selection controls, desktop date and datetime range entry, popover calendar range picking, bounded numeric entry, segmented selection, lightweight chip editing, and a typed desktop upload family with previews, replacement, paste, directory intake, inline rejection feedback, and remote item actions but no form-state opinion |
| `form` | `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`, `FormSection`, `FormGrid`, `FormActions`, `SettingsField`, `SettingsSection`, `FilterBar`, `FilterBarSection`, `FilterBarActions` | Field orchestration, validation feedback, desktop form composition, settings-page row orchestration, section grouping, and reusable list-filter shells |
| `data-display` | `Badge`, `Avatar`, `Tabs`, `CollectionGrid`, `DataTable`, `RichTree`, `DescriptionList`, `MarkdownViewer`, `KeyValueTable`, `Table`, `Timeline`, `Tree`, `StatusBadge`, `StatCard` | Identity, status, metric, hierarchy, collection-grid shells, admin-resource tables, ordered status-history surfaces, structured information display, rich text rendering, dense detail inspection, and desktop detail inspection |
| `feedback` | `ActivityFeed`, `EmptyState`, `LoadingBlock`, `StatusNotice`, `Progress`, `Skeleton`, `InlineAlert`, `EmptySearch`, `NotificationCenter`, `Toaster`, `toast` | Empty, loading, progress, status messaging, filtered-result empty states, activity histories, panel-local inline alerts, desktop notification panels, and global desktop notifications |
| `layout` | `Card`, `PanelGroup`, `Panel`, `PanelResizeHandle`, `SidebarSection`, `Separator`, `ScrollArea`, `Toolbar`, `ToolbarGroup`, `ToolbarSpacer`, `ToolbarSeparator`, `StatusBar`, `StatusBarSection`, `StatusBarItem` | Structural surfaces, resizable workspaces, collapsible sidebar groupings, bottom status chrome, region wrappers, and reusable workspace action-row composition |
| `navigation` | `Breadcrumb`, `Menubar`, `Stepper`, `Pagination`, `WorkspaceTabs` | Reusable route context, app-menu navigation, step-based workflow guidance, paging, and desktop workspace tab-strip primitives |
| `overlays` | `Dialog`, `Modal`, `ConfirmDialog`, `Drawer`, `ContextMenu`, `HoverCard`, `Popover`, `DropdownMenu`, `Tooltip` | Blocking, confirmation, anchored, side-panel, and layered interactions |
| `patterns` | `AppShell`, `PageHeader`, `NavigationRail`, `DesktopShellFrame`, `WorkspacePanel`, `InspectorPanel`, `InspectorRail`, `SettingsCenter`, `DirtyStateBar`, `ListDetailWorkspace`, `ManagementWorkbench`, `CrudWorkbench`, `SearchCommandPalette`, `WorkspaceScaffold`, `RestartRequiredNotice`, `DesktopWindowControls`, `DesktopTitleBar`, `DesktopAppHeader`, `DetailDrawer`, `OperationDrawer`, `AnchoredPickerSurface`, `PickerDialog`, `EntityPickerDialog`, `PickerSelectionFooter`, `TwoPaneSelectorPopover`, `DetailDrawerSection`, `DetailDrawerMetrics`, `DetailDrawerMetric`, `SectionHeader` | Desktop application composition patterns |

## Physical Structure Standard

New composite families should be placed inside their owning domain folder instead of extending the flat root registry:

```text
src/components/ui
  actions/
    action-menu-button.tsx
    bulk-action-bar.tsx
    command.tsx
    icon-button.tsx
    split-button.tsx
    toolbar-button.tsx
    index.ts
  data-entry/
    combobox.tsx
    date-input.tsx
    date-range-picker.tsx
    upload/
      file-upload.tsx
      upload-dropzone.tsx
      upload-item.tsx
      upload-presets.tsx
      upload-types.ts
      upload-utils.ts
      index.ts
    number-input.tsx
    tag-input.tsx
    index.ts
  data-display/
    data-grid.tsx
    data-table.tsx
    description-list.tsx
    key-value-table.tsx
    markdown-viewer.tsx
    timeline.tsx
    tree.tsx
    index.ts
  feedback/
    activity-feed.tsx
    empty-search.tsx
    inline-alert.tsx
    notification-center.tsx
    toast.tsx
    index.ts
  form/
    filter-bar.tsx
    form.tsx
    form-layout.tsx
    settings-field.tsx
    settings-section.tsx
    index.ts
  layout/
    panel-group.tsx
    sidebar-section.tsx
    status-bar.tsx
    toolbar.tsx
    index.ts
  navigation/
    menubar.tsx
    stepper.tsx
    workspace-tabs.tsx
    index.ts
  overlays/
    context-menu.tsx
    drawer.tsx
    hover-card.tsx
    modal.tsx
    index.ts
src/components/patterns
  app-shell/
    AppShell.tsx
    NavigationRail.tsx
    PageHeader.tsx
    index.ts
  command/
    SearchCommandPalette.tsx
    index.ts
  desktop-shell/
    DesktopWindowControls.tsx
    DesktopTitleBar.tsx
    DesktopAppHeader.tsx
    DesktopShellFrame.tsx
    index.ts
  detail/
    DetailDrawer.tsx
    OperationDrawer.tsx
    index.ts
  picker/
    AnchoredPickerSurface.tsx
    PickerDialog.tsx
    EntityPickerDialog.tsx
    PickerSelectionFooter.tsx
    TwoPaneSelectorPopover.tsx
    index.ts
  settings/
    SettingsCenter.tsx
    index.ts
  system/
    RestartRequiredNotice.tsx
    index.ts
  workbench/
    CrudWorkbench.tsx
    ManagementWorkbench.tsx
    index.ts
  workspace/
    InspectorRail.tsx
    WorkspaceScaffold.tsx
    WorkspacePanel.tsx
    InspectorPanel.tsx
    ListDetailWorkspace.tsx
    SectionHeader.tsx
    index.ts
```

This is the structure SDKWORK should keep extending. Small existing primitives remain stable where they are today, but new desktop component families should enter through the domain folders.

## Why `form` Is Separate From `data-entry`

`data-entry` and `form` solve different problems and should not be collapsed into one folder:

- `data-entry` is for controls that can be dropped anywhere, including filters, settings panes, inline editors, and popovers
- `form` is for field binding, validation presentation, labeling, descriptions, sectioning, settings rows, action rows, and the desktop layout rules around full forms
- this split follows the same cohesion boundary used by leading React UI systems, where field primitives stay reusable and form orchestration stays composable
- app teams can depend on raw inputs without inheriting React Hook Form, while full form pages can import a higher-level, more productive API

## Desktop Pattern Inventory

| Pattern | Purpose |
| --- | --- |
| `AppShell` | Standard app frame with header, sidebar, content, footer |
| `PageHeader` | Consistent page identity and action placement |
| `NavigationRail` | Shared left-side desktop navigation column |
| `DesktopShellFrame` | Shared full-window desktop shell built from app header, navigation rail, content viewport, and status bar |
| `WorkspacePanel` | Primary working area wrapper |
| `InspectorPanel` | Secondary detail/configuration column |
| `InspectorRail` | Rich desktop detail rail with header slots, summary, and section composition |
| `SettingsCenter` | Shared desktop settings scaffold with navigation, search, and main content composition |
| `DirtyStateBar` | Sticky unsaved-state bar for settings and configuration pages |
| `ListDetailWorkspace` | Shared split-workbench scaffold for list, main content, and inspector/detail panes |
| `ManagementWorkbench` | Shared admin and operations scaffold for page header, filters, selection state, main workspace, and optional detail rail |
| `CrudWorkbench` | Shared CRUD-oriented scaffold that composes `DataTable`, selection actions, optional detail, and optional editor regions without owning data fetching |
| `SearchCommandPalette` | Shared desktop command launcher for global search, grouped actions, and keyboard-driven workflows |
| `WorkspaceScaffold` | General desktop editor/workspace shell with header, toolbar, resizable side panes, and bottom panels |
| `RestartRequiredNotice` | Shared restart-required warning and action pattern for desktop settings and runtime changes |
| `DesktopWindowControls` | Runtime-agnostic desktop minimize, maximize, restore, and close controls |
| `DesktopTitleBar` | Shared drag-region-safe top chrome for desktop applications |
| `DesktopAppHeader` | Brand, center navigation, actions, and window-controls composition |
| `DetailDrawer` | Shared inspection shell with summary, metrics, and section composition for desktop drawers |
| `OperationDrawer` | Shared edit and review drawer shell with header actions, optional sidebar context, and footer commit flows |
| `AnchoredPickerSurface` | Shared anchored picker shell with viewport-aware chrome, optional header and filters, shared body states, and footer slots for compact desktop selection workflows |
| `PickerDialog` | Shared modal picker shell with filter slots, optional sidebar navigation, and unified loading, error, and empty states |
| `EntityPickerDialog` | Shared modal picker workflow with single or multiple selection semantics, reusable confirm footer behavior, and item render contracts |
| `PickerSelectionFooter` | Shared picker footer that standardizes selection summaries, clear affordances, cancel actions, and confirm actions across modal and anchored pickers |
| `TwoPaneSelectorPopover` | Shared anchored two-pane picker for provider-model, workspace-project, and similar master-detail selectors with controlled or inferred active groups |
| `SectionHeader` | Sticky list, panel, and workspace subheader composition with actions and secondary content |

## Next-Wave Catalog

The framework directory model is intentionally broader than the current implementation slice. Based on shadcn/ui, MUI, Ant Design, Chakra UI, Mantine, and modern desktop-oriented React kits, the next shared components should expand by domain family rather than as one-off files.

| Domain | Candidate components |
| --- | --- |
| `actions` | `CommandBar`, `HotkeyHint`, `ActionGroup`, `InlineConfirmAction` |
| `data-entry` | `DatePicker`, `PresetRangePicker`, `FilterTabs`, `ActiveFilterChips`, `ColorPicker`, `PinInput`, `TokenInput` |
| `form` | `FieldArray`, `SearchForm`, `SettingsForm`, `StepForm`, `SchemaBridge`, `JsonEditorField` |
| `data-display` | `MetricTable`, `DiffViewer`, `CodeBlock`, `EntitySummaryCard` |
| `feedback` | `Result`, `Tour`, `CommandStatus` |
| `layout` | `WorkspaceSplitView`, `DockLayout` |
| `navigation` | `NavMenu`, `RouteTabs`, `TreeNavigation`, `WizardNav` |
| `overlays` | `Sheet`, `AlertDialog`, `InspectorFlyout`, `Lightbox` |
| `patterns` | `ActivityCenter`, `ResourceExplorer`, `SettingsWorkbench`, `WorkbenchDrawer` |

This keeps the framework scalable without forcing app teams to relearn the directory structure each time the catalog grows.

## Audit-Driven Priorities

The current implementation order is based on actual PC app overlap observed in the audit:

- `Table` is already present in `sdkwork-desktop-settings` and `sdkwork-react-backend-ui`, so a shared primitive reduces direct duplication immediately
- `StatusBadge` patterns already exist in `claw-studio`, `sdkwork-drive`, and `sdkwork-react-backend-ui`
- dashboard-like metric cards recur across portal, backend, and studio-style pages, which justifies `StatCard`
- `Command`, `Tree`, `RichTree`, `Drawer`, the upload family, `ContextMenu`, `HoverCard`, `Combobox`, and `DateInput` are now implemented because the same overlap appeared repeatedly across backend, studio, settings, drive, and notes-style desktops
- `DateTimeInput`, `DateRangeField`, `DateTimeRangeField`, and `DateRangePicker` are now implemented because desktop-settings, chat-pc search, drive, and claw analytics repeatedly need native datetime windows, preset-aware range entry, and reusable popover calendar range shells
- `NumberInput` is now implemented because bounded numeric fields recur across `sdkwork-desktop-settings`, `claw-studio`, `sdkwork-cloud-portal`, `sdkwork-backend-react-web`, and `magic-studio-v2`
- the toast layer is now implemented because direct `sonner` usage and app-local toast wrappers recur across `claw-studio`, `sdkwork-notes`, `sdkwork-drive`, `sdkwork-desktop-settings`, `sdkwork-chat-pc-react`, `magic-studio-v2`, and `sdkwork-backend-react-web`
- `InlineAlert` is now implemented because panel-local warnings, remediation hints, and success notices recur across upload flows, settings pages, backend/admin confirmation panels, and should not all be promoted into global toast traffic
- the modal layer is now implemented because `sdkwork-drive`, `magic-studio-v2`, `sdkwork-desktop-settings`, and backend/admin packages all repeat the same centered modal shell and confirm-dialog structure above raw `Dialog`
- `Toolbar` and `IconButton` are now implemented because `magic-studio-v2`, `sdkwork-notes/sdkwork-notes-pc-react`, `sdkwork-desktop-settings`, and backend/admin packages all repeat compact action rows, editor command strips, and icon-trigger surfaces
- `ToolbarButton` is now implemented because notes editors, chat rich-text editors, OpenChat PC modules, and Magic Studio timeline toolbars all repeat the same active/compact toolbar action seam with only styling differences
- `SplitButton` is now implemented because backend/admin pages and desktop workflows repeatedly pair one primary action with adjacent secondary choices through ad hoc button-plus-menu seams
- `ActionMenuButton` and `BulkActionBar` are now implemented because admin tables, selection-heavy lists, and editor surfaces repeatedly need overflow actions and sticky multi-select action rows without rebuilding local button-plus-dropdown seams
- `PanelGroup` is now implemented because Magic Studio, Claw shell, OpenChat admin shell, and backend-style desktop workspaces all repeat resizer handles, split views, and persisted sidebar widths
- `StatusBar` is now implemented because desktop windows repeatedly need a low-profile bottom chrome for branch, sync, mode, or selection summaries without coupling that structure to any business module
- `EmptySearch` is now implemented because `sdkwork-chat-pc-react` already ships a focused empty-search state and the same filtered-result pattern recurs across notes, backend/admin, and portal-style search panes
- `FilterBar` is now implemented because admin and list-heavy applications repeat the same search plus select plus action-strip composition above tables and result sets
- `CollectionGrid` is now implemented because backend/admin and asset-style desktop pages repeat the same loading, empty, card-grid, and pagination shell above custom item markup
- `DataTable` is now implemented because desktop admin, settings, and portal packages repeatedly need dense row-based tables with selection, row actions, bulk operations, and hidden-column control without rebuilding local table wrappers
- `DescriptionList` is now implemented because drawer and modal inspection flows repeat the same key-value detail presentation in settings, backend/admin, and usage analytics surfaces
- `MarkdownViewer` and `KeyValueTable` are now implemented because notes, release help, inspector rails, settings summaries, and backend/admin detail views repeatedly need lightweight markdown rendering and dense read-only label-value presentation
- `Timeline` is now implemented because backend/admin and portal-style payment flows already repeat ordered milestone and status-history presentation
- `SettingsSection`, `SettingsField`, and `SidebarSection` are now implemented because `magic-studio-v2`, notes-style sidebars, and settings-heavy desktop apps repeat the same grouping plus label plus description plus control orchestration
- `SegmentedControl` is now implemented because property editors and view-switch strips in `magic-studio-v2` repeat the same compact segmented selection pattern
- `WorkspaceTabs` is now implemented because `sdkwork-desktop-settings` repeats closable, dirty-state workspace tabs that sit between generic `Tabs` and app-local editor chrome
- `Menubar` is now implemented because `navigation` was the thinnest domain and desktop-class applications need a shared top-menu shell for file, view, and workspace commands
- `Stepper` is now implemented because `sdkwork-backend-react-web`, `sdkwork-cloud-portal`, `claw-studio`, and `sdkwork-desktop-settings` all repeat step-based wizard or publish-flow guidance with only styling differences
- `TagInput` is now implemented because notes inspectors, community posting flows, and content-management editors repeat the same lightweight tag chip editing pattern
- `NotificationCenter` is now implemented because backend/admin and `magic-studio-v2` already repeat notification tray layouts and notification-feed item rendering
- the desktop shell family is now implemented because `sdkwork-notes`, `claw-studio`, `sdkwork-chat-pc-react`, and `magic-studio-v2` all repeat window controls, glass title bars, top navigation bands, and sticky action headers with only runtime adapters or slot content changing
- `DetailDrawer` and `OperationDrawer` are now implemented because `sdkwork-backend-react-web`, `sdkwork-desktop-settings`, and `claw-studio` all repeat local inspection and operation drawer shells with summary, metrics, edit actions, and structured sections
- `SettingsCenter` and `DirtyStateBar` are now implemented because `claw-studio`, `magic-studio-v2`, `sdkwork-chat-pc-react`, `openchat-react-pc`, and `sdkwork-desktop-settings` all repeat settings navigation, search, and unsaved-change affordances above the shared settings field system
- `ListDetailWorkspace` is now implemented because `claw-studio`, `magic-studio-v2`, `sdkwork-notes-pc-react`, and `sdkwork-backend-react-web` all repeat list-sidebar plus main workspace plus inspector/detail layouts with only sizing and header details changing
- `ManagementWorkbench`, `CrudWorkbench`, `DesktopShellFrame`, `SearchCommandPalette`, and `RestartRequiredNotice` are now implemented because backend/admin, settings, and desktop shell families repeat those same composition seams across multiple audited apps
- `ActivityFeed` is now implemented because backend/admin, settings, drive, and portal-style desktop apps all repeat audit histories, review queues, and operation timelines that should not live in ad hoc cards
- `InspectorRail` and `WorkspaceScaffold` are now implemented because notes, drive, desktop-settings, cloud-portal, and magic-studio repeatedly rebuild the same editor-plus-inspector-plus-bottom-panel shell with only slot content, sizing, and metadata changing
- `PickerDialog` is now implemented because `magic-studio-v2` repeats prompt pickers, asset pickers, and workspace pickers with the same header, filter, state, and confirmation shell while differing only in data source and row rendering
- `EntityPickerDialog` is now implemented because `magic-studio-v2`, `sdkwork-cloud-portal`, and other desktop apps repeat the same selected-summary footer, single or multiple selection rules, and confirm affordances above `PickerDialog`
- `PickerSelectionFooter` is now implemented because those same picker flows repeat the same summary text, clear action, cancel action, and confirm action row even when body rendering and selection state stay app-owned
- `AnchoredPickerSurface` is now implemented because `magic-studio-v2`, `claw-studio`, `sdkwork-chat-pc-react`, and desktop settings style selectors repeat the same anchored trigger, compact header or filters, loading or empty states, and footer-aware popover shell above raw `Popover`
- `TwoPaneSelectorPopover` is now implemented because `magic-studio-v2`, `sdkwork-cloud-portal`, and related desktop apps repeat the same anchored two-pane provider-model or workspace-project selector state while differing only in shell chrome and item rendering
- the next highest-value shared gaps from the same audit are richer popup date picking, `PresetRangePicker`, `FilterTabs`, `ActiveFilterChips`, `TreeSelect`, `TransferList`, explorer-shell composition, and deeper right-side workbench drawer or settings-shell patterns above the current `DetailDrawer` and `OperationDrawer` family

## Components Explicitly Left Out Of The First Iteration

- Business modules such as chat message items, portal product cards, or studio-specific canvases
- App-specific route chrome
- App-specific data table abstractions

Those belong in consuming apps until the shared usage pattern is proven across multiple consumers.
