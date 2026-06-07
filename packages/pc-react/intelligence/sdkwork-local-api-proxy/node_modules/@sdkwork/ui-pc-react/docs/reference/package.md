# Package Reference

## Commands

```bash
pnpm install
pnpm test
pnpm build
pnpm typecheck
pnpm docs:dev
pnpm docs:build
```

## Governance

Framework standards are defined in `/reference/framework-governance`.

That rulebook covers:

- semantic token contract
- `data-sdk-ui` and `data-sdk-pattern` metadata requirements
- direct-surface root prop rules
- structured pattern `slotProps` rules for internal and delegated surfaces
- structured UI composite `slotProps` and `get*Props` rules for delegated and repeated surfaces
- structured collection container, item root, and item slot contracts for repeated collection surfaces
- reusable component authoring rules
- framework audit tests that guard against drift

The generated runtime inventory lives at `/reference/runtime-surface-catalog`, the generated public type inventory lives at `/reference/public-api-structure-catalog`, the generated governance coverage matrix lives at `/reference/framework-governance-matrix`, and the generated documentation governance inventory lives at `/reference/documentation-governance-catalog`. All four are emitted directly from the framework source contract.

## Pattern Surface Standard

Direct pattern surfaces stay open through normal root props. Internal and delegated lower surfaces are customized through named `slotProps`.

```tsx
<PickerDialog
  className="h-full"
  data-contract-root="picker-dialog"
  slotProps={{
    body: {
      className: 'p-0',
      'data-testid': 'picker-body',
    },
    sidebar: {
      id: 'picker-sidebar',
    },
  }}
  title="Choose asset"
>
  <AssetGrid />
</PickerDialog>
```

Rules of use:

- Use root `className`, `style`, `id`, and `data-*` on the pattern's primary surface.
- Use `slotProps` for named internal regions such as `body`, `header`, `footer`, `sidebar`, `items`, or other documented lower surfaces.
- Do not expect ad hoc region props such as `bodyClassName` or `headerClassName`; those are outside the framework contract.

## UI Composite Surface Standard

Composite UI components use the same model: direct root props stay on the owned surface, delegated or interior surfaces use `slotProps`, and repeated row or column surfaces use structured `get*Props` style contracts.

```tsx
<ActionMenuButton
  items={[{ key: 'archive', label: 'Archive' }]}
  menuOpen
  slotProps={{
    content: {
      className: 'min-w-[14rem]',
      'data-testid': 'actions-menu',
    },
  }}
>
  Actions
</ActionMenuButton>
```

```tsx
<DataTable
  columns={[
    {
      id: 'name',
      header: 'Name',
      headerProps: {
        className: 'whitespace-nowrap',
      },
      cell: (row) => row.name,
      cellProps: (row) => ({
        'data-row-name': row.name,
      }),
    },
  ]}
  getRowProps={(row) => ({
    'data-row-id': row.id,
  })}
  rows={[{ id: 'asset-1', name: 'Launch Brief' }]}
  slotProps={{
    toolbar: {
      className: 'justify-end',
    },
  }}
  toolbar={<button type="button">New asset</button>}
/>
```

Rules of use:

- Use `slotProps` for named interior or delegated surfaces such as dropdown content, dialog content, grids, headers, footers, or toolbars.
- Use `getRowProps`, `headerProps`, and `cellProps` when a component renders repeated structural surfaces.
- Keep `Table` as the thin semantic primitive for raw tabular markup. Use `DataTable` when you need framework chrome, selection, density, or built-in pagination.
- Do not expect isolated hooks such as `menuClassName`, `contentClassName`, `gridClassName`, `rowClassName`, or `headerClassName`; those are outside the framework contract.

## UI Collection Surface Standard

Collection-style UI components follow the same principle at item granularity: the collection root keeps direct root props, named collection regions use container `slotProps`, repeated item roots use `getItemProps`, repeated item interiors use `getItemSlotProps`, and public item components use item-level `slotProps`.

```tsx
<RichTree
  defaultExpandedIds={['workspace']}
  getItemProps={(item) =>
    item.id === 'workspace'
      ? {
          'data-row-id': item.id,
        }
      : undefined
  }
  getItemSlotProps={(item) =>
    item.id === 'workspace'
      ? {
          actions: {
            className: 'justify-end',
          },
          content: {
            className: 'rounded-[var(--sdk-radius-control)] ring-1 ring-transparent',
          },
        }
      : undefined
  }
  items={[
    {
      id: 'workspace',
      label: 'Workspace',
      children: [{ id: 'readme', label: 'README.md' }],
    },
  ]}
  renderActions={(item) => <button type="button">Open {item.id}</button>}
  slotProps={{
    tree: {
      className: 'min-h-32',
      'data-testid': 'resource-tree',
    },
  }}
/>
```

```tsx
<ActivityFeed
  getItemProps={(item) => ({
    'data-activity-id': item.id,
  })}
  getItemSlotProps={(item) =>
    item.unread
      ? {
          indicator: {
            className: 'ring-2 ring-[var(--sdk-color-brand-primary)]',
          },
          panel: {
            className: 'border-[var(--sdk-color-brand-primary)]/30',
          },
        }
      : undefined
  }
  items={[
    {
      id: 'release',
      title: 'Build completed',
      timestamp: '2026-04-01 10:30',
      unread: true,
    },
  ]}
  slotProps={{
    header: {
      className: 'sticky top-0',
    },
    list: {
      className: 'space-y-3',
    },
  }}
/>
```

```tsx
<Stepper
  aria-label="Publish workflow"
  getItemProps={({ index }) =>
    index === 1
      ? {
          'data-step-id': 'review',
        }
      : undefined
  }
  orientation="vertical"
>
  <StepperItem status="complete" title="Configure" />
  <StepperItem
    slotProps={{
      connector: {
        className: 'bg-[var(--sdk-color-brand-primary)]/40',
      },
      content: {
        className: 'border-[var(--sdk-color-brand-primary)]/30',
      },
    }}
    status="current"
    title="Review"
  />
  <StepperItem status="upcoming" title="Publish" />
</Stepper>
```

Rules of use:

- Use collection root props on the collection root only.
- Use container `slotProps` for named collection regions such as tree wrappers, feed headers, feed lists, or empty shells.
- Use `getItemProps` for repeated item roots and `getItemSlotProps` for repeated item internals on data-driven collections.
- Use item-level `slotProps` on public collection item components such as `ActivityFeedItem`, `NotificationCenterItem`, `StepperItem`, or `WorkspaceTab`.
- Do not expect ad hoc hooks such as `itemClassName`, `indicatorClassName`, `connectorClassName`, or similar single-surface escape hatches.


## Exports

All documented subpath exports publish both runtime JS and matching declaration files, so TypeScript consumers can import from root or by domain without losing types.

### Root

```ts
import {
  ActivityFeed,
  ActionMenuButton,
  AnchoredPickerSurface,
  AppShell,
  BulkActionBar,
  Button,
  CollectionGrid,
  DataTable,
  RichTree,
  DesktopAppHeader,
  DesktopShellFrame,
  DetailDrawer,
  EntityPickerDialog,
  OperationDrawer,
  PickerDialog,
  PickerSelectionFooter,
  TwoPaneSelectorPopover,
  CrudWorkbench,
  DirtyStateBar,
  EmptySearch,
  IconButton,
  InspectorRail,
  ListDetailWorkspace,
  ManagementWorkbench,
  Menubar,
  MarkdownViewer,
  NotificationCenter,
  Panel,
  PanelGroup,
  PanelResizeHandle,
  RestartRequiredNotice,
  SdkworkThemeProvider,
  SearchCommandPalette,
  SettingsField,
  SplitButton,
  Stepper,
  StatusBar,
  TagInput,
  Toolbar,
  ToolbarButton,
  KeyValueTable,
  WorkspaceScaffold,
  WorkspaceTabs,
} from '@sdkwork/ui-pc-react';
```

### Theme

```ts
import {
  SDKWORK_DARK_THEME,
  SDKWORK_LIGHT_THEME,
  SDKWORK_DARK_THEME,
  SDKWORK_LIGHT_THEME,
  createSdkworkTheme,
  createThemeCssVariables,
} from '@sdkwork/ui-pc-react/theme';
```

### Primitive Components

```ts
import {
  Avatar,
  Button,
  Combobox,
  Command,
  ConfirmDialog,
  ContextMenu,
  CollectionGrid,
  DataTable,
  DateInput,
  DateRangeField,
  DateRangePicker,
  DateTimeRangeField,
  DateTimeInput,
  DescriptionList,
  Drawer,
  Dialog,
  DropdownMenu,
  EmptySearch,
  NotificationCenter,
  ImageUpload,
  VideoUpload,
  AudioUpload,
  DocumentUpload,
  FileUpload,
  Form,
  FormField,
  FilterBar,
  IconButton,
  InlineAlert,
  Input,
  Menubar,
  Modal,
  NumberInput,
  Panel,
  PanelGroup,
  PanelResizeHandle,
  RichTree,
  SettingsField,
  SettingsSection,
  SidebarSection,
  Popover,
  Progress,
  RadioGroup,
  Select,
  SegmentedControl,
  Skeleton,
  SplitButton,
  StatCard,
  StatusBar,
  StatusBadge,
  TagInput,
  Table,
  Toolbar,
  ToolbarButton,
  Toaster,
  Tree,
  Tooltip,
  Tabs,
  WorkspaceTabs,
  toast,
} from '@sdkwork/ui-pc-react/components/ui';
```

### Actions Domain

```ts
import {
  Button,
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  ActionMenuButton,
  BulkActionBar,
  IconButton,
  SplitButton,
  ToolbarButton,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from '@sdkwork/ui-pc-react/components/ui/actions';
```

```tsx
export function PublishActions() {
  return (
    <div className="space-y-3">
      <SplitButton
        items={[
          { key: 'duplicate', label: 'Duplicate item', shortcut: 'Ctrl+D' },
          { key: 'archive', label: 'Archive draft' },
        ]}
        menuLabel="More publish actions"
        onClick={() => console.info('publish')}
      >
        Publish
      </SplitButton>
      <ActionMenuButton
        items={[
          { key: 'history', label: 'View publish history' },
          { key: 'rollback', label: 'Rollback release', tone: 'danger' },
        ]}
      >
        More actions
      </ActionMenuButton>
      <BulkActionBar
        actions={<Button size="sm">Archive 3 drafts</Button>}
        count={3}
        title="Selected drafts"
      />
    </div>
  );
}
```

### Data Entry Domain

```ts
import { AudioUpload, Combobox, DateInput, DateRangeField, DateRangePicker, DateTimeInput, DateTimeRangeField, DocumentUpload, FileUpload, ImageUpload, Input, NumberInput, Select, TagInput, Textarea, VideoUpload } from '@sdkwork/ui-pc-react/components/ui/data-entry';
import type { FileUploadItem } from '@sdkwork/ui-pc-react/components/ui/data-entry';
```

```tsx
export function UploadShowcase() {
  const remoteItems: FileUploadItem[] = [
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

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <ImageUpload allowPaste clearable label="Images" maxFiles={6} />
      <VideoUpload label="Videos" maxFiles={2} />
      <AudioUpload label="Audio" maxFiles={4} />
      <DocumentUpload clearable directory label="Documents" maxFiles={12} rejectionTitle="Some documents need attention" />
      <FileUpload
        clearable
        label="Mixed attachments"
        onDownloadItem={(item) => console.info('download', item.id)}
        onPreviewItem={(item) => console.info('preview', item.id)}
        onRetryItem={(item) => console.info('retry', item.id)}
        value={remoteItems}
      />
    </div>
  );
}
```

The upload family supports:

- `allowPaste`, `directory`, `clearable`, and `replaceOnMax` for desktop intake ergonomics
- `showRejections` and `rejectionTitle` for inline validation feedback
- `onPreviewItem`, `onDownloadItem`, and `onRetryItem` for remote file actions and retry queues

```tsx
export function TagEditor() {
  return (
    <TagInput
      defaultValue={['desktop', 'sdkwork']}
      onValueChange={(nextTags) => console.info(nextTags)}
      placeholder="Add keyword"
    />
  );
}
```

```tsx
export function ActivityTimeFilter() {
  return (
    <DateTimeRangeField
      actions={<button type="button">Apply</button>}
      endLabel="End time"
      presets={[
        {
          label: '24h',
          range: { start: '2026-04-01T12:00', end: '2026-04-02T12:00' },
          value: '24h',
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

Use `DateRangeField` or `DateTimeRangeField` for inline dual-input filters. Use `DateRangePicker` when the interaction should center on calendar selection inside a popover.

### Form Domain

```ts
import {
  FilterBar,
  FilterBarActions,
  FilterBarSection,
  Form,
  FormActions,
  FormControl,
  FormDescription,
  FormField,
  FormGrid,
  FormItem,
  FormLabel,
  FormMessage,
  FormSection,
  SettingsField,
  SettingsSection,
} from '@sdkwork/ui-pc-react/components/ui/form';
import { Input, Select } from '@sdkwork/ui-pc-react/components/ui/data-entry';
```

```tsx
export function SettingsPanel() {
  return (
    <SettingsSection
      description="Desktop-wide preferences for providers and workspace behavior."
      title="Workspace"
    >
      <SettingsField
        controlId="workspace-name"
        description="Shown in the desktop header and recent-workspace switchers."
        label="Workspace name"
      >
        <Input id="workspace-name" placeholder="SDKWORK Studio" />
      </SettingsField>
    </SettingsSection>
  );
}
```

### Feedback Domain

```ts
import {
  ActivityFeed,
  EmptySearch,
  EmptyState,
  InlineAlert,
  LoadingBlock,
  NotificationCenter,
  NotificationCenterItem,
  Progress,
  Skeleton,
  SdkworkToaster,
  StatusNotice,
  Toaster,
  sdkToast,
  toast,
} from '@sdkwork/ui-pc-react/components/ui/feedback';
```

```tsx
export function NotificationsPanel() {
  return (
    <div className="space-y-4">
      <ActivityFeed
        items={[
          {
            description: 'The desktop release pipeline published a new QA build.',
            id: 'build',
            meta: 'Release pipeline',
            timestamp: '2026-04-01 10:30',
            title: 'Build finished',
            tone: 'success',
            unread: true,
          },
        ]}
        onItemSelect={(id) => console.info('select-activity', id)}
      />
      <NotificationCenter
        getItemSlotProps={(item) =>
          item.id === 'build'
            ? {
                title: {
                  className: 'text-[var(--sdk-color-brand-primary)]',
                },
              }
            : undefined
        }
        items={[
          {
            content: 'Workspace build completed successfully.',
            id: 'build',
            timeLabel: 'just now',
            title: 'Build finished',
            tone: 'success',
            unread: true,
          },
        ]}
        onClear={() => console.info('clear')}
        onItemSelect={(id) => console.info('select', id)}
        onMarkAllAsRead={() => console.info('mark-all-read')}
      />
    </div>
  );
}
```

### Layout Domain

```ts
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Panel,
  PanelGroup,
  PanelResizeHandle,
  ScrollArea,
  Separator,
  SidebarSection,
  StatusBar,
  StatusBarItem,
  StatusBarSection,
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarSpacer,
} from '@sdkwork/ui-pc-react/components/ui/layout';
```

```tsx
export function WindowStatus() {
  return (
    <StatusBar>
      <StatusBarSection>
        <StatusBarItem label="Branch" value="main" />
        <StatusBarItem>Ready</StatusBarItem>
      </StatusBarSection>
      <StatusBarSection align="end">
        <StatusBarItem label="Sync" value="Live" />
      </StatusBarSection>
    </StatusBar>
  );
}
```

### Navigation Domain

```ts
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  Stepper,
  StepperItem,
  MenubarTrigger,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  WorkspaceTab,
  WorkspaceTabs,
} from '@sdkwork/ui-pc-react/components/ui/navigation';
```

```tsx
export function DesktopMenuBar() {
  return (
    <Menubar value="file">
      <MenubarMenu value="file">
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New workspace
            <MenubarShortcut>Ctrl+N</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
```

```tsx
export function WorkspaceTabStrip() {
  return (
    <WorkspaceTabs
      getItemSlotProps={({ selected }) =>
        selected
          ? {
              label: {
                className: 'tracking-[0.01em]',
              },
            }
          : undefined
      }
      items={[
        { id: 'overview', label: 'Overview.md' },
        { id: 'memory', label: 'Memory.md', modified: true },
      ]}
      slotProps={{
        tabList: {
          className: 'pb-1',
        },
      }}
      onCloseTab={(id) => console.info('close', id)}
      onValueChange={(id) => console.info('activate', id)}
      value="memory"
    />
  );
}
```

```tsx
export function PublishWorkflow() {
  return (
    <Stepper aria-label="Publish workflow">
      <StepperItem description="Configure providers and runtime guards." status="complete" title="Configure" />
      <StepperItem description="Validate assets and release notes." status="current" title="Review" />
      <StepperItem description="Ship the workspace update to production." title="Publish" />
    </Stepper>
  );
}
```

### Catalog

```ts
import { uiComponentCatalog } from '@sdkwork/ui-pc-react/components/ui/catalog';
```

Use `/reference/runtime-surface-catalog` when you need the generated source-of-truth list of public runtime markers, regions, and owned slot anatomy.

Use `/reference/public-api-structure-catalog` when you need the generated source-of-truth list of public props contracts, slot contracts, structured surface helpers, and callback contracts.

Use `/reference/documentation-governance-catalog` when you need the generated source-of-truth list of governed markdown pages, import-audit coverage, and snippet-typecheck scope.

### Data Display Domain

```ts
import {
  CollectionGrid,
  DataTable,
  DescriptionDetails,
  DescriptionItem,
  DescriptionList,
  DescriptionTerm,
  KeyValueTable,
  MarkdownViewer,
  RichTree,
  StatCard,
  StatusBadge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Timeline,
  Tree,
} from '@sdkwork/ui-pc-react/components/ui/data-display';
```

```tsx
export function AssetGrid() {
  const items = [
    { id: 'asset-1', title: 'Launch Brief', type: 'Document' },
    { id: 'asset-2', title: 'Moodboard', type: 'Image' },
  ];

  return (
    <CollectionGrid
      items={items}
      emptyDescription="Try adjusting your filters or create a new asset."
      emptyTitle="No assets"
      pagination={<div className="text-xs text-muted-foreground">Page 1 of 1</div>}
      renderItem={(item) => (
        <div className="rounded-[var(--sdk-radius-panel)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] p-4">
          <div className="text-sm font-semibold text-[var(--sdk-color-text-primary)]">{item.title}</div>
          <div className="mt-1 text-xs text-[var(--sdk-color-text-muted)]">{item.type}</div>
        </div>
      )}
    />
  );
}
```

```tsx
export function AssetTable() {
  return (
    <DataTable
      columns={[
        { id: 'name', header: 'Name', cell: (row) => row.name },
        { id: 'owner', header: 'Owner', cell: (row) => row.owner },
        { id: 'status', header: 'Status', cell: (row) => row.status },
      ]}
      getRowId={(row) => row.id}
      rowActions={(row) => <button type="button">Open {row.name}</button>}
      rows={[
        { id: 'asset-1', name: 'Launch Brief', owner: 'SDKWORK Ops', status: 'Ready' },
        { id: 'asset-2', name: 'Moodboard', owner: 'Design Team', status: 'Review' },
      ]}
      pagination={{
        defaultPage: 1,
        defaultPageSize: 10,
        pageSizeOptions: [10, 20, 50],
      }}
      selectable
      selectedRowIds={['asset-1']}
      selectionBar={{
        actions: <button type="button">Archive selection</button>,
        title: 'Selected assets',
      }}
      footer={<span className="text-xs text-[var(--sdk-color-text-muted)]">Synced just now</span>}
      title="Assets"
      toolbar={<button type="button">New asset</button>}
    />
  );
}
```

`DataTable` owns the full table footer contract: page summary, rows-per-page selector, and compact pagination controls. Keep raw `Table` for semantic markup; use `DataTable` when the framework should own dense data-surface chrome.

```tsx
export function AssetSummary() {
  return (
    <div className="space-y-4">
      <KeyValueTable
        rows={[
          { label: 'Asset ID', mono: true, value: 'asset_01HXYZ' },
          { label: 'Status', tone: 'success', value: 'Ready' },
          { label: 'Owner', value: 'SDKWORK Ops' },
        ]}
      />
      <MarkdownViewer
        content={[
          '# Reviewer Notes',
          '',
          '- Approved for staging',
          '- Awaiting final screenshot bundle',
        ].join('\n')}
      />
    </div>
  );
}
```

```tsx
export function ResourceTree() {
  return (
    <RichTree
      checkable
      defaultExpandedIds={['workspace']}
      items={[
        {
          id: 'workspace',
          label: 'Workspace',
          description: 'Shared desktop resources',
          children: [
            { id: 'brief', label: 'Launch Brief.md' },
            { id: 'roadmap', label: 'Roadmap.md' },
          ],
        },
      ]}
      renderActions={(item) => <button type="button">Open {item.id}</button>}
      selectionMode="multiple"
    />
  );
}
```

```tsx
export function PayoutTimeline() {
  return (
    <Timeline
      items={[
        {
          id: 'submitted',
          title: 'Submitted request',
          description: 'Funds were requested for the default payout account.',
          status: 'done',
          timestamp: '2026-03-31 09:00',
        },
        {
          id: 'review',
          title: 'Finance review',
          description: 'The finance team is validating the payout details.',
          status: 'current',
          timestamp: '2026-03-31 09:15',
        },
        {
          id: 'transferred',
          title: 'Transferred',
          content: <button type="button">View receipt</button>,
          status: 'success',
        },
      ]}
    />
  );
}
```

### Overlay Domain

```ts
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ConfirmDialog,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Popover,
  Tooltip,
} from '@sdkwork/ui-pc-react/components/ui/overlays';
```

### Desktop Patterns

```ts
import { DesktopShellFrame } from '@sdkwork/ui-pc-react/components/patterns/desktop-shell';
import { AnchoredPickerSurface, EntityPickerDialog, PickerDialog, PickerSelectionFooter, TwoPaneSelectorPopover } from '@sdkwork/ui-pc-react/components/patterns/picker';
import { SearchCommandPalette } from '@sdkwork/ui-pc-react/components/patterns/command';
import { RestartRequiredNotice } from '@sdkwork/ui-pc-react/components/patterns/system';
import { CrudWorkbench, ManagementWorkbench } from '@sdkwork/ui-pc-react/components/patterns/workbench';
import { SettingsCenter } from '@sdkwork/ui-pc-react/components/patterns/settings';
import { InspectorRail, ListDetailWorkspace, SectionHeader, WorkspacePanel, WorkspaceScaffold } from '@sdkwork/ui-pc-react/components/patterns/workspace';
```

```ts
import {
  AppShell,
  AnchoredPickerSurface,
  DesktopAppHeader,
  DesktopShellFrame,
  DetailDrawer,
  EntityPickerDialog,
  OperationDrawer,
  PickerDialog,
  PickerSelectionFooter,
  TwoPaneSelectorPopover,
  CrudWorkbench,
  DetailDrawerMetric,
  DetailDrawerMetrics,
  DetailDrawerSection,
  DirtyStateBar,
  InspectorRail,
  ListDetailWorkspace,
  ManagementWorkbench,
  RestartRequiredNotice,
  SearchCommandPalette,
  SettingsCenter,
  DesktopTitleBar,
  DesktopWindowControls,
  NavigationRail,
  SectionHeader,
  WorkspaceScaffold,
  WorkspacePanel,
} from '@sdkwork/ui-pc-react/components/patterns';
```

```ts
import type { DesktopWindowController } from '@sdkwork/ui-pc-react/components/patterns';
```

```tsx
export function AssetDetailDrawer() {
  return (
    <DetailDrawer
      description="Review the latest sync health, ownership, and workspace metadata."
      footer={
        <div className="flex justify-end">
          <button className="rounded-[var(--sdk-radius-control)] border px-3 py-2 text-sm" type="button">
            Close
          </button>
        </div>
      }
      open
      title="Asset Detail"
    >
      <DetailDrawerMetrics>
        <DetailDrawerMetric helper="30 day window" label="Downloads" value="12,430" />
        <DetailDrawerMetric label="Error rate" tone="warning" value="1.7%" />
      </DetailDrawerMetrics>
      <DetailDrawerSection description="Shared desktop detail rows fit naturally here." title="Overview">
        <dl className="grid gap-3 text-sm">
          <div className="grid gap-1">
            <dt className="text-muted-foreground">Owner</dt>
            <dd>SDKWORK Ops</dd>
          </div>
          <div className="grid gap-1">
            <dt className="text-muted-foreground">Region</dt>
            <dd>ap-southeast-1</dd>
          </div>
        </dl>
      </DetailDrawerSection>
    </DetailDrawer>
  );
}
```

```tsx
export function AssetOperationDrawer() {
  return (
    <OperationDrawer
      actions={<button type="button">Duplicate</button>}
      badge={<span className="rounded-full border px-2 py-0.5 text-xs">Draft</span>}
      description="Use the shared operation shell for edit, review, approval, and commit flows."
      footer={
        <div className="flex justify-end gap-2">
          <button className="rounded-[var(--sdk-radius-control)] border px-3 py-2 text-sm" type="button">
            Cancel
          </button>
          <button className="rounded-[var(--sdk-radius-control)] border px-3 py-2 text-sm" type="button">
            Save changes
          </button>
        </div>
      }
      open
      sidebar={<div className="text-sm">Validation, checklist, or related metadata lives here.</div>}
      title="Edit Asset"
    >
      <div className="rounded-[var(--sdk-radius-panel)] border p-4 text-sm">Shared form or review content goes here.</div>
    </OperationDrawer>
  );
}
```

```tsx
export function ModelPickerSurface() {
  return (
    <AnchoredPickerSurface
      defaultOpen
      description="Use the anchored shell for compact provider, model, and preset selectors."
      filters={<button type="button">OpenAI</button>}
      footer={<div className="text-xs text-[var(--sdk-color-text-secondary)]">12 options</div>}
      resultsSummary="12 options"
      title="Choose model"
      trigger={<button type="button">Open model picker</button>}
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
export function AssetPickerDialog() {
  return (
    <PickerDialog
      actions={<button type="button">Refresh</button>}
      description="Use the shared picker shell for asset, prompt, or workspace selection flows."
      filters={<button type="button">Images</button>}
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
      <div className="rounded-[var(--sdk-radius-panel)] border p-4 text-sm">Your asset grid or result list goes here.</div>
    </PickerDialog>
  );
}
```

```tsx
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
export function AssetEntityPickerDialog() {
  const assets = [
    { id: 'asset-1', name: 'Launch Brief' },
    { id: 'asset-2', name: 'Moodboard' },
  ];

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
          className="rounded-[var(--sdk-radius-field)] border p-4 text-left text-sm"
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
export function ProviderModelSelector() {
  const sections = [
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

  return (
    <TwoPaneSelectorPopover
      defaultValue="gpt-4.1"
      getItemBadge={(item) => item.badge}
      getItemDescription={(item) => item.description}
      getSectionLabel={(section) => section.name}
      onValueChange={(value, model, provider) => {
        console.info({ value, model, provider });
      }}
      sections={sections}
      trigger={<button type="button">Choose model</button>}
    />
  );
}
```

```tsx
export function AssetWorkbench() {
  return (
    <ListDetailWorkspace
      content={{
        children: <div className="text-sm">Main editor surface</div>,
        description: 'Shared workspace content area',
        title: 'Workspace',
      }}
      detail={{
        children: <div className="text-sm">Selection metadata and quick actions</div>,
        title: 'Inspector',
      }}
      sidebar={{
        children: <div className="text-sm">Collection filters and asset list</div>,
        title: 'Assets',
      }}
    />
  );
}
```

```tsx
export function EditorWorkspace() {
  return (
    <WorkspaceScaffold
      header={<SectionHeader description="Shared desktop editor shell." title="Media workspace" />}
      inspector={{
        children: <div className="text-sm">Selection metadata and actions</div>,
        summary: 'Compose sections, metrics, and actions inside the right rail.',
        title: 'Inspector',
      }}
      main={{
        children: <div className="h-full min-h-[16rem] bg-[var(--sdk-color-surface-panel-muted)] p-6 text-sm">Editor canvas</div>,
        slotProps: {
          body: {
            className: 'p-0',
          },
        },
        title: 'Canvas',
      }}
      sidebar={{
        children: <div className="text-sm">Assets and collections</div>,
        title: 'Library',
      }}
      bottomPanel={{
        children: <div className="text-sm">Recent activity, logs, or output panels</div>,
        title: 'Activity',
      }}
    />
  );
}
```

```tsx
export function DesktopShellExample() {
  return (
    <DesktopShellFrame
      actions={<button type="button">Search</button>}
      content={<div className="p-6 text-sm">Desktop content viewport</div>}
      navigation={<button type="button">Assets</button>}
      navigationFooter={<button type="button">Settings</button>}
      navigationHeader={<div className="text-sm font-semibold">SDKWORK</div>}
      statusBar={<div className="px-3 py-2 text-xs text-muted-foreground">Ready</div>}
      subtitle="Shared desktop shell"
      title="Sdkwork Studio"
    />
  );
}
```

```tsx
export function AdminWorkbench() {
  return (
    <ManagementWorkbench
      actions={<button type="button">Create</button>}
      description="Shared list and operations surface for desktop admin pages."
      detail={{
        children: <div className="text-sm">Selected row detail</div>,
        title: 'Inspector',
      }}
      filters={<div className="rounded-[var(--sdk-radius-panel)] border p-4 text-sm">Filters go here</div>}
      main={{
        children: <div className="text-sm">Table or grid content</div>,
        title: 'Entities',
      }}
      selectionBar={<div className="text-sm">3 rows selected</div>}
      title="Entity operations"
    />
  );
}
```

```tsx
export function AssetCrudWorkbench() {
  return (
    <CrudWorkbench
      actions={<button type="button">Create asset</button>}
      detail={{
        children: <div className="text-sm">Selected asset detail</div>,
        title: 'Inspector',
      }}
      editor={{
        children: <div className="text-sm">Editor form goes here.</div>,
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
          actions: <button type="button">Archive selection</button>,
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
export function GlobalSearchLauncher() {
  return (
    <>
      <SearchCommandPalette
        groups={[
          {
            heading: 'Workspace',
            items: [{ id: 'settings', label: 'Open settings', shortcut: 'Ctrl+,' }],
          },
        ]}
        open
      />
      <RestartRequiredNotice onRestart={() => console.info('restart')} />
    </>
  );
}
```

```tsx
export function DesktopSettingsCenter() {
  return (
    <div className="space-y-4">
      <SettingsCenter
        activeItem="appearance"
        description="Manage shared desktop preferences and workspace defaults."
        sections={[
          {
            items: [
              { id: 'appearance', label: 'Appearance', keywords: ['theme', 'color'] },
              { id: 'accounts', label: 'Accounts' },
            ],
            title: 'Workspace',
          },
        ]}
        title="Settings"
      >
        <div className="text-sm">Current settings form goes here.</div>
      </SettingsCenter>
      <DirtyStateBar
        actions={
          <div className="flex gap-2">
            <button className="rounded-[var(--sdk-radius-control)] border px-3 py-2 text-sm" type="button">
              Reset
            </button>
            <button className="rounded-[var(--sdk-radius-control)] border px-3 py-2 text-sm" type="button">
              Save changes
            </button>
          </div>
        }
        description="Unsaved updates will apply to the current workspace."
        title="You have unsaved changes"
      />
    </div>
  );
}
```

### Stylesheet

```ts
import '@sdkwork/ui-pc-react/styles.css';
```

## Integration Contract

- Consumers should import the package stylesheet.
- Git-based consumers can install the package from the repository main branch; the repository tracks prebuilt `dist` assets so installation works directly without consumer-side lifecycle-script allowlists.
- Consumers can use `SdkworkThemeProvider` for scoped theming.
- `SDKWORK_LIGHT_THEME` and `SDKWORK_DARK_THEME` are the canonical preset exports.
- `SDKWORK_LIGHT_THEME` and `SDKWORK_DARK_THEME` remain stable compatibility aliases for the default SDKWORK baseline.
- `uiComponentCatalog` is exported for docs, playgrounds, and app-side component discovery without hard-coding directory knowledge.
- Consumers using `components/ui/form` should align to the exported `react-hook-form` peer range.
- Mount `components/ui/feedback` `Toaster` once near the app root so toast notifications inherit the active SDKWORK theme.
- The shared `toast` and `sdkToast` exports are `sonner`-compatible on purpose, which keeps migration cost low for apps already calling `toast.success()` and related helpers.
- Use `components/ui/data-entry` when you need standalone controls and `components/ui/form` when you need bound fields, validation messages, or desktop form layouts.
- Use `TagInput` for note labels, content tags, and lightweight keyword management instead of rebuilding chip editors in each app.
- Use `SettingsField` for label, description, error, modified-state, and reset orchestration in settings pages instead of rebuilding app-local setting rows.
- Use `FilterBar` when a page is primarily about searching, narrowing, or bulk-operating on a result set; keep it out of app-local page wrappers unless the behavior is truly bespoke.
- Use `NumberInput` for bounded numeric settings, quota controls, retry counts, and other step-based desktop fields instead of rebuilding app-local steppers.
- Use `components/ui/navigation` for shared breadcrumb, `Menubar`, `Stepper`, pagination, `WorkspaceTab`, and `WorkspaceTabs` primitives instead of rebuilding route chrome, app menus, publish progress chrome, or editor tab strips per app.
- Use `components/ui/actions` for command palettes, `SplitButton` primary-plus-secondary actions, `ToolbarButton` editor toggles, and `IconButton`-driven compact actions instead of rebuilding workspace launchers per app.
- Use `ActionMenuButton` when a desktop surface needs one visible trigger with an overflow menu, and use `BulkActionBar` when selection state should materialize as a sticky multi-item action surface instead of another app-local banner.
- Use `StatusBar` for branch, sync, runtime mode, cursor, or selection summaries at the bottom of desktop windows before introducing app-local footer chrome.
- Use `components/ui/layout` `PanelGroup` before introducing app-local split view, resizer, or sidebar-width hooks in desktop workspaces.
- Use `components/ui/data-entry` for reusable comboboxes, date inputs, datetime inputs, date-range inputs, and upload inputs before adding app-local selection or picker widgets.
- Use `InlineAlert` for panel-local warnings, success guidance, and contextual remediation without promoting every message to a toast.
- Use `NotificationCenter` and `NotificationCenterItem` for desktop notification trays and side panels instead of carrying per-app notification list shells.
- Use `EmptySearch` for filtered list, command result, and search drawer empty states before shipping app-local "no result" cards.
- Use `components/ui/feedback` for toast notifications and inline status states before introducing app-local notification stores or local Sonner wrappers.
- Use `ActivityFeed` for operation history, approval trails, sync logs, and release history before rebuilding app-local audit/event cards.
- Use `components/ui/data-display` for reusable `CollectionGrid` collection shells, `DataTable` admin/resource grids, tables, trees, metric cards, and status labels before introducing app-local dashboard widgets.
- Keep raw `Table` usage for semantic or low-level tabular markup. Reach for `DataTable` when the surface needs framework-owned border, compact radius, selection, built-in page summary, rows-per-page selection, and pagination controls.
- Use `RichTree` when a desktop surface needs multi-select, checkbox cascade, lazy expansion, row actions, or richer node metadata; keep search inputs, file IO, and business mutations in the app or higher-order workbench layer.
- Use `MarkdownViewer` for release notes, help text, AI-generated summaries, and settings guidance instead of shipping app-local markdown renderers in each desktop package.
- Use `KeyValueTable` for dense read-only entity details in drawers, inspectors, and summary cards before rebuilding another label-value list around raw `div` or `dl` markup.
- Use `Timeline` for payout progress, audit history, deployment history, or workflow milestone presentation before rebuilding app-local ordered status lists.
- Use `DescriptionList` for structured read-only detail panels before rebuilding ad hoc `DetailItem` cards in drawers and modals.
- Use `components/ui/layout` for `Toolbar`-based workspace chrome, `PanelGroup` split views, header actions, and editor command rows before introducing app-local action bars.
- Use `components/ui/overlays` for standard modal shells, confirm flows, drawers, context menus, hover previews, and anchored surfaces before introducing app-local side panels.
- Use `DesktopWindowControls` with a thin runtime adapter instead of rebuilding minimize, maximize, restore, and close chrome per app.
- Use `DesktopTitleBar` and `DesktopAppHeader` for desktop top bars so brand, centered navigation, action slots, and window controls converge on one layout contract.
- Use `DesktopShellFrame` for the outer window contract when an app needs a canonical desktop header plus navigation rail plus content viewport plus bottom status region instead of reassembling `AppShell` manually in every app.
- Use `SettingsCenter` for desktop settings navigation plus search plus main configuration composition before introducing app-local settings shells.
- Use `DirtyStateBar` for unsaved settings, reset, and save affordances before introducing app-local floating save strips or duplicate inline warning bars.
- Use `DetailDrawer` for right-side inspection, entity metrics, and structured read-only sections before introducing app-local detail side panels.
- Use `OperationDrawer` for right-side edit, review, approval, and commit workflows with header actions, optional sidebar context, and footer action rows before introducing app-local `OperationDrawer`, `AssetDrawer`, or hand-built operation side panels.
- Use `AnchoredPickerSurface` for compact anchored selectors that still need shared title, filter, loading, empty, or footer chrome before rebuilding app-local popover shells for provider, preset, workspace, or model selection.
- Use `PickerDialog` for modal selection flows that need shared header chrome, search or filter slots, optional navigation sidebar, and consistent loading, error, or empty states before introducing app-local asset, prompt, or workspace picker shells.
- Use `EntityPickerDialog` when a modal picker also needs shared single or multiple selection state, selected-summary footer behavior, confirm disable rules, and app-defined item rendering before rebuilding agent, prompt, asset, or workspace picker workflows.
- Use `PickerSelectionFooter` when a picker body is custom or app-owned but the bottom summary, clear action, cancel action, and confirm action should converge on one shared desktop footer contract.
- Use `TwoPaneSelectorPopover` for anchored provider, workspace, model, or project selectors that need a left-side context switcher and a right-side choice list without escalating into a modal workflow.
- Use `InspectorRail` for persistent right-side detail, property, and quick-action rails before introducing another app-local `DetailsPanel`, `PropertyPanel`, or `InspectorSidebar`.
- Use `ListDetailWorkspace` for desktop split workbenches that combine collection navigation, a main content pane, and an optional inspector/detail region before introducing app-local three-pane layout wrappers.
- Use `ManagementWorkbench` for admin, backend, and operations pages that combine page identity, filter chrome, selection state, a main collection surface, and an optional inspector before introducing another app-local workbench shell.
- Use `CrudWorkbench` when a desktop resource page is fundamentally list-detail-edit CRUD on top of `DataTable`; keep fetching, routing, and mutation orchestration in the app layer.
- Use `WorkspaceScaffold` for editor-style shells that combine page identity, a command row, a resizable sidebar, a main surface, an inspector rail, and an optional bottom panel before introducing another app-local split-workspace scaffold.
- Use `SearchCommandPalette` for global search and quick actions instead of wiring another bespoke command launcher around `cmdk`.
- Use `RestartRequiredNotice` when desktop or Tauri flows need to communicate that a relaunch is required for changes to apply instead of rebuilding one-off warning rows in each settings page.
- Use `SectionHeader` for sticky list, workspace, and asset-center subheaders before building more app-local `SectionHeader` or `AssetCenterHeader` variants.
- Business-specific components should stay outside the framework until they become truly shared.

## Theme Factory Example

```ts
const theme = createSdkworkTheme({
  preset: 'sdkwork',
  colorMode: 'light',
  brand: {
    primary: '#0f766e',
  },
  radius: {
    field: '0.375rem',
    control: '0.5rem',
    panel: '1rem',
  },
});

const cssVariables = createThemeCssVariables(theme);
```

The default radius ladder is `field = 0.375rem`, `control = 0.5rem`, `panel = 1rem`, and `pill = 999px`. `radius.field` controls text inputs, selects, textareas, segmented field surfaces, and dense inline collection controls such as pagination items. `radius.control` remains the shared action-control radius for generic buttons and compact shell chrome.
