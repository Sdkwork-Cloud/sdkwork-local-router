# Getting Started

## Install

```bash
pnpm install
```

If your app uses the `components/ui/form` domain, align `react-hook-form` with the package peer dependency in the consuming app.

To consume the package directly from the repository main branch instead of a registry release:

```bash
pnpm add "https://github.com/Sdkwork-Cloud/sdkwork-ui.git#main&path:/sdkwork-ui-pc-react"
```

The repository tracks the prebuilt `dist` assets, so git installs work directly without requiring consumer-side lifecycle-script allowlists.

## Run The Core Checks

```bash
pnpm test
pnpm build
pnpm docs:build
```

## Consume The Package

```tsx
import '@sdkwork/ui-pc-react/styles.css';
import { AppShell, Button, PageHeader } from '@sdkwork/ui-pc-react';
```

For desktop forms, keep orchestration in `form` and standalone controls in `data-entry`:

```tsx
import {
  FilterBar,
  FilterBarActions,
  FilterBarSection,
  Form,
  FormActions,
  FormControl,
  FormField,
  FormGrid,
  FormItem,
  FormLabel,
  FormMessage,
  FormSection,
} from '@sdkwork/ui-pc-react/components/ui/form';
import { Input } from '@sdkwork/ui-pc-react/components/ui/data-entry';
```

For list filtering and detail drawers:

```tsx
import { Button } from '@sdkwork/ui-pc-react/components/ui/actions';
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@sdkwork/ui-pc-react/components/ui/data-entry';
import { DescriptionDetails, DescriptionItem, DescriptionList, DescriptionTerm } from '@sdkwork/ui-pc-react/components/ui/data-display';
import { FilterBar, FilterBarActions, FilterBarSection } from '@sdkwork/ui-pc-react/components/ui/form';

export function UsersPageChrome() {
  return (
    <>
      <FilterBar summary="Showing 24 matching users" title="User Filters">
        <FilterBarSection>
          <Input aria-label="Search users" placeholder="Search users" />
          <Select defaultValue="all">
            <SelectTrigger aria-label="User status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
            </SelectContent>
          </Select>
        </FilterBarSection>
        <FilterBarActions>
          <Button variant="secondary">Reset</Button>
          <Button>Apply filters</Button>
        </FilterBarActions>
      </FilterBar>

      <DescriptionList columns={2}>
        <DescriptionItem>
          <DescriptionTerm>Request ID</DescriptionTerm>
          <DescriptionDetails mono>req_123456</DescriptionDetails>
        </DescriptionItem>
        <DescriptionItem>
          <DescriptionTerm>Status</DescriptionTerm>
          <DescriptionDetails>Completed</DescriptionDetails>
        </DescriptionItem>
      </DescriptionList>
    </>
  );
}
```

For desktop headers, editor chrome, overflow actions, selection action bars, search-empty states, and split workspaces:

```tsx
import { ActionMenuButton, BulkActionBar, Button, IconButton, ToolbarButton } from '@sdkwork/ui-pc-react/components/ui/actions';
import { ActivityFeed, EmptySearch, Toaster, toast } from '@sdkwork/ui-pc-react/components/ui/feedback';
import { Panel, PanelGroup, PanelResizeHandle, Toolbar, ToolbarGroup, ToolbarSpacer } from '@sdkwork/ui-pc-react/components/ui/layout';
import { MoreHorizontal, Search, SlidersHorizontal } from 'lucide-react';

export function SearchWorkspace() {
  return (
    <>
      <Toolbar aria-label="Search workspace actions">
        <ToolbarGroup>
          <IconButton aria-label="Search notes" variant="ghost">
            <Search className="h-4 w-4" />
          </IconButton>
          <ToolbarButton aria-label="Toggle filters" pressed shortcut="Ctrl+Shift+F">
            <SlidersHorizontal className="h-4 w-4" />
          </ToolbarButton>
        </ToolbarGroup>
        <ToolbarSpacer />
        <ToolbarGroup>
          <ActionMenuButton
            aria-label="Open bulk actions"
            items={[
              { key: 'archive', label: 'Archive selection' },
              { key: 'export', label: 'Export results' },
            ]}
          >
            <MoreHorizontal className="h-4 w-4" />
            More
          </ActionMenuButton>
          <Button variant="secondary">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button onClick={() => toast.success('Created new note')}>New note</Button>
        </ToolbarGroup>
      </Toolbar>
      <PanelGroup direction="horizontal">
        <Panel defaultSize={26} minSize={20}>
          <div className="rounded-[var(--sdk-radius-panel)] border border-[var(--sdk-color-border-default)] p-4">
            Sidebar
          </div>
        </Panel>
        <PanelResizeHandle withHandle />
        <Panel defaultSize={74}>
          <EmptySearch keyword="agent workflow" onClear={() => undefined} />
        </Panel>
      </PanelGroup>
      <ActivityFeed
        className="mt-4"
        items={[]}
        title="Recent activity"
      />
      <BulkActionBar
        actions={<Button size="sm">Archive 3 items</Button>}
        count={3}
        description="Apply shared actions to the current filtered selection."
        title="Selected notes"
      />
      <Toaster />
    </>
  );
}
```

For dense inspector details and lightweight markdown rendering:

```tsx
import { KeyValueTable, MarkdownViewer } from '@sdkwork/ui-pc-react/components/ui/data-display';

export function AssetInspector() {
  return (
    <div className="space-y-4">
      <KeyValueTable
        rows={[
          { label: 'Asset ID', mono: true, value: 'asset_01HXYZ' },
          { label: 'Owner', value: 'SDKWORK Ops' },
          { label: 'Status', tone: 'success', value: 'Ready' },
        ]}
      />
      <MarkdownViewer
        content={[
          '# Release Notes',
          '',
          '- Shared upload pipeline enabled',
          '- Desktop shell tokens aligned to SDKWORK baseline',
        ].join('\n')}
      />
    </div>
  );
}
```

For desktop admin lists and bulk-selection flows:

```tsx
import { Button } from '@sdkwork/ui-pc-react/components/ui/actions';
import { DataTable } from '@sdkwork/ui-pc-react/components/ui/data-display';

export function AssetTable() {
  return (
    <DataTable
      columns={[
        { id: 'name', header: 'Name', cell: (row) => row.name },
        { id: 'owner', header: 'Owner', cell: (row) => row.owner },
        { id: 'status', header: 'Status', cell: (row) => row.status },
      ]}
      getRowId={(row) => row.id}
      rowActions={(row) => <Button size="sm" variant="ghost">Open {row.name}</Button>}
      rows={[
        { id: 'asset-1', name: 'Launch Brief', owner: 'SDKWORK Ops', status: 'Ready' },
        { id: 'asset-2', name: 'Moodboard', owner: 'Design Team', status: 'Review' },
      ]}
      selectable
      selectedRowIds={['asset-1']}
      selectionBar={{
        actions: <Button size="sm">Archive selection</Button>,
        title: 'Selected assets',
      }}
      title="Assets"
      toolbar={<Button variant="secondary">New asset</Button>}
    />
  );
}
```

For shared route navigation and pagination:

```tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@sdkwork/ui-pc-react/components/ui/navigation';
```

For desktop command surfaces, modal workflows, tree navigation, rich inputs, date-range filters, upload flows, and secondary panes:

```tsx
import { CommandDialog } from '@sdkwork/ui-pc-react/components/ui/actions';
import { AudioUpload, Combobox, DateInput, DateRangePicker, DateTimeInput, DateTimeRangeField, DocumentUpload, FileUpload, ImageUpload, NumberInput, VideoUpload } from '@sdkwork/ui-pc-react/components/ui/data-entry';
import { RichTree, Tree } from '@sdkwork/ui-pc-react/components/ui/data-display';
import { ConfirmDialog, ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerTitle, HoverCard, HoverCardContent, HoverCardTrigger, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalTitle } from '@sdkwork/ui-pc-react/components/ui/overlays';
```

For higher-order desktop shells, workbenches, command launchers, and restart notices:

```tsx
import {
  AnchoredPickerSurface,
  CrudWorkbench,
  DesktopShellFrame,
  EntityPickerDialog,
  InspectorRail,
  ManagementWorkbench,
  PickerDialog,
  PickerSelectionFooter,
  RestartRequiredNotice,
  SearchCommandPalette,
  TwoPaneSelectorPopover,
  WorkspaceScaffold,
} from '@sdkwork/ui-pc-react/components/patterns';
```

For CRUD-oriented desktop resource management:

```tsx
import { Button } from '@sdkwork/ui-pc-react/components/ui/actions';
import { CrudWorkbench } from '@sdkwork/ui-pc-react/components/patterns/workbench';

export function AssetCrudPage() {
  return (
    <CrudWorkbench
      actions={<Button variant="secondary">Create asset</Button>}
      detail={{
        children: <div>Selected asset metadata</div>,
        title: 'Inspector',
      }}
      editor={{
        children: <div>Asset editor form</div>,
        title: 'Editor',
      }}
      table={{
        columns: [
          { id: 'name', header: 'Name', cell: (row) => row.name },
          { id: 'status', header: 'Status', cell: (row) => row.status },
        ],
        getRowId: (row) => row.id,
        rows: [
          { id: 'asset-1', name: 'Launch Brief', status: 'Ready' },
          { id: 'asset-2', name: 'Moodboard', status: 'Review' },
        ],
        selectable: true,
        selectedRowIds: ['asset-1'],
        selectionBar: {
          actions: <Button size="sm">Archive selection</Button>,
          title: 'Selected assets',
        },
        title: 'Assets',
      }}
      title="Asset management"
    />
  );
}
```

```tsx
export function AssetPickerLauncher() {
  return (
    <PickerDialog
      description="Use the shared picker shell for asset, prompt, and workspace selection flows."
      filters={<Button variant="secondary">Images</Button>}
      footer={(
        <PickerSelectionFooter
          confirmDisabled={false}
          confirmLabel="Confirm selection"
          summary="24 assets"
        />
      )}
      open
      resultsSummary="24 assets"
      sidebar={<div className="text-sm">Collections and sources</div>}
      title="Choose asset"
    >
      <div className="rounded-[var(--sdk-radius-panel)] border p-4 text-sm">
        Your asset grid or result list goes here.
      </div>
    </PickerDialog>
  );
}
```

```tsx
import { Button } from '@sdkwork/ui-pc-react/components/ui/actions';
import { AnchoredPickerSurface } from '@sdkwork/ui-pc-react/components/patterns';

export function ModelPickerSurface() {
  return (
    <AnchoredPickerSurface
      defaultOpen
      description="Use the anchored shell for compact provider, model, project, and preset selectors."
      filters={<Button size="sm" variant="secondary">OpenAI</Button>}
      footer={<div className="text-xs text-[var(--sdk-color-text-secondary)]">12 options</div>}
      resultsSummary="12 options"
      title="Choose model"
      trigger={<Button variant="secondary">Open model picker</Button>}
    >
      <div className="grid gap-2">
        <button className="rounded-[var(--sdk-radius-field)] border p-3 text-left text-sm" type="button">
          GPT-4.1
        </button>
        <button className="rounded-[var(--sdk-radius-field)] border p-3 text-left text-sm" type="button">
          o4-mini
        </button>
      </div>
    </AnchoredPickerSurface>
  );
}
```

```tsx
import { PickerSelectionFooter } from '@sdkwork/ui-pc-react/components/patterns';

export function AssetPickerFooter() {
  return (
    <PickerSelectionFooter
      confirmDisabled={false}
      confirmLabel="Attach selection"
      onCancel={() => console.info('close-picker')}
      onClear={() => console.info('clear-selection')}
      onConfirm={() => console.info('confirm-selection')}
      showClear
      summary="2 assets selected"
    />
  );
}
```

```tsx
import { Button } from '@sdkwork/ui-pc-react/components/ui/actions';
import { EntityPickerDialog } from '@sdkwork/ui-pc-react/components/patterns';

const assets = [
  { id: 'asset-1', name: 'Launch Brief' },
  { id: 'asset-2', name: 'Moodboard' },
];

export function AssetEntityPickerLauncher() {
  return (
    <EntityPickerDialog
      getItemLabel={(item) => item.name}
      items={assets}
      open
      resultsSummary="2 assets"
      selectionMode="multiple"
      title="Choose assets"
      renderItem={({ item, selected, toggleSelection }) => (
        <button
          aria-pressed={selected}
          className="rounded-[var(--sdk-radius-panel)] border p-4 text-left text-sm"
          onClick={toggleSelection}
          type="button"
        >
          {item.name}
        </button>
      )}
      onConfirm={(selectedItems, selectedIds) => {
        console.info(selectedItems, selectedIds);
      }}
    />
  );
}
```

```tsx
import { Button } from '@sdkwork/ui-pc-react/components/ui/actions';
import { TwoPaneSelectorPopover } from '@sdkwork/ui-pc-react/components/patterns';

const modelSections = [
  {
    section: { id: 'openai', name: 'OpenAI' },
    items: [
      { id: 'gpt-4.1', name: 'GPT-4.1', description: 'General-purpose reasoning and desktop copilots.', badge: 'Default' },
      { id: 'o4-mini', name: 'o4-mini', description: 'Fast assistant interactions for inline tools.' },
    ],
  },
  {
    section: { id: 'anthropic', name: 'Anthropic' },
    items: [
      { id: 'claude-sonnet-4', name: 'Claude Sonnet 4', description: 'Balanced writing and coding support.' },
    ],
  },
];

export function ModelSelectorPopover() {
  return (
    <TwoPaneSelectorPopover
      defaultValue="gpt-4.1"
      getItemBadge={(item) => item.badge}
      getItemDescription={(item) => item.description}
      getSectionLabel={(section) => section.name}
      onValueChange={(value, model, provider) => {
        console.info({ value, model, provider });
      }}
      sections={modelSections}
      trigger={<Button variant="secondary">Choose model</Button>}
    />
  );
}
```

```tsx
export function AssetIntakePanel() {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <ImageUpload allowPaste clearable label="Project images" maxFiles={8} />
      <VideoUpload clearable label="Project videos" maxFiles={2} />
      <AudioUpload label="Voice tracks" maxFiles={4} />
      <DocumentUpload clearable directory label="Supporting documents" maxFiles={10} rejectionTitle="Some files need attention" />
    </div>
  );
}
```

For remote file queues and richer desktop upload actions:

```tsx
import type { FileUploadItem } from '@sdkwork/ui-pc-react/components/ui/data-entry';
import { FileUpload } from '@sdkwork/ui-pc-react/components/ui/data-entry';

const queuedAssets: FileUploadItem[] = [
  {
    id: 'asset-1',
    kind: 'document',
    name: 'brief.pdf',
    size: 2048,
    status: 'success',
    type: 'application/pdf',
    url: 'https://cdn.sdkwork.local/brief.pdf',
  },
  {
    error: 'Upload failed',
    id: 'asset-2',
    kind: 'document',
    name: 'archive.zip',
    size: 4096,
    status: 'error',
    type: 'application/zip',
  },
];

export function RemoteQueuePanel() {
  return (
    <FileUpload
      label="Queued assets"
      onDownloadItem={(item) => console.info('download', item.id)}
      onPreviewItem={(item) => console.info('preview', item.id)}
      onRetryItem={(item) => console.info('retry', item.id)}
      value={queuedAssets}
    />
  );
}
```

For bounded numeric settings and panel-local desktop messaging:

```tsx
import { NumberInput } from '@sdkwork/ui-pc-react/components/ui/data-entry';
import { InlineAlert } from '@sdkwork/ui-pc-react/components/ui/feedback';

export function SettingsPanel() {
  return (
    <div className="space-y-4">
      <InlineAlert
        description="Keep retries below 10 to avoid throttling the desktop sync worker."
        title="Recommended guardrail"
        tone="info"
      />
      <NumberInput aria-label="Retry count" defaultValue={3} max={10} min={0} step={1} />
    </div>
  );
}
```

For analytics, log windows, and preset-aware time filters:

```tsx
import { DateTimeRangeField } from '@sdkwork/ui-pc-react/components/ui/data-entry';
import { Button } from '@sdkwork/ui-pc-react/components/ui/actions';

export function ActivityTimeFilter() {
  return (
    <DateTimeRangeField
      actions={
        <>
          <Button size="sm" variant="secondary">Reset</Button>
          <Button size="sm">Apply</Button>
        </>
      }
      endLabel="End time"
      presets={[
        {
          label: '24h',
          range: { start: '2026-04-01T12:00', end: '2026-04-02T12:00' },
          value: '24h',
        },
        {
          label: '7d',
          range: { start: '2026-03-26T12:00', end: '2026-04-02T12:00' },
          value: '7d',
        },
      ]}
      startLabel="Start time"
      validate={(value) =>
        value.start && value.end && value.start > value.end
          ? 'Start time must be before end time'
          : null
      }
    />
  );
}
```

Use `DateTimeRangeField` for inline datetime windows and preset-driven audit filters. Reserve `DateRangePicker` for calendar-first date-only range selection inside a popover.

For shared desktop notifications:

```tsx
import { InlineAlert, Toaster, toast } from '@sdkwork/ui-pc-react/components/ui/feedback';

export function FeedbackBootstrap() {
  return (
    <>
      <InlineAlert description="Local warnings stay inline; cross-workspace feedback should use toast." tone="warning" />
      <button onClick={() => toast.success('Settings saved')}>Notify</button>
      <Toaster />
    </>
  );
}
```

## Theme Baseline

`SdkworkThemeProvider` defaults to the `sdkwork-studio` desktop visual baseline through the SDKWORK compatibility theme exports.

```tsx
import '@sdkwork/ui-pc-react/styles.css';
import { SdkworkThemeProvider } from '@sdkwork/ui-pc-react';

export function App() {
  return (
    <SdkworkThemeProvider
      defaultTheme="light"
      overrides={{
        brand: {
          primary: '#0f766e',
        },
        radius: {
          panel: '2rem',
        },
      }}
    >
      <div>SDKWORK desktop app</div>
    </SdkworkThemeProvider>
  );
}
```

For explicit preset-based theme creation:

```ts
import { createSdkworkTheme } from '@sdkwork/ui-pc-react/theme';

const theme = createSdkworkTheme({
  preset: 'sdkwork',
  colorMode: 'dark',
  surface: {
    panel: '#111827',
  },
});
```

## What This Package Solves

- A single shared PC UI baseline for SDKWORK React apps
- shadcn-style primitives built on accessible Radix foundations
- a dedicated desktop form system on top of React Hook Form
- shared `FilterBar` composition for list pages, search pages, and admin-style workbenches
- shared `DescriptionList` composition for drawers, modals, and detail inspection panels
- advanced desktop interaction primitives for command palettes, action menus, bulk action bars, workspace toolbars, toolbar buttons, split workspaces, activity feeds, inspector rails, icon-trigger actions, modal workflows, drawers, context menus, hover cards, trees, comboboxes, date inputs, datetime inputs, date-range pickers, number inputs, uploads, inline alerts, markdown rendering, key-value detail tables, desktop data tables, search-empty states, and toast notifications
- desktop-grade composition patterns for full-window shells, CRUD workbenches, list and admin workbenches, search command launchers, and restart-required notices
- a standard desktop shell structure across app families
- a documented migration target for app-local UI packages

## Intended Consumers

- `sdkwork-studio`
- `magic-studio-v2`
- `sdkwork-notes/sdkwork-notes-pc-react`
- `sdkwork-chat-pc-react`
- `sdkwork-cloud-portal`
- `sdkwork-desktop-settings`
- `sdkwork-drive/sdkwork-drive-pc-react`
- `openchat/app/openchat-react-pc`
- `sdkwork-backend-react-web/packages/sdkwork-react-backend-desktop`
