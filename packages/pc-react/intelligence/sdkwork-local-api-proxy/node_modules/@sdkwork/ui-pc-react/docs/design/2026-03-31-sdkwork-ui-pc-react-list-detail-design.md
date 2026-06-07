# SDKWORK UI PC React List And Detail Design

## Scope

This iteration extends `@sdkwork/ui-pc-react` with two desktop-class framework surfaces that recur across audited PC React applications:

- `FilterBar` in the `form` domain
- `DescriptionList` in the `data-display` domain

The target is not a business widget. The target is reusable page infrastructure for list pages, admin search pages, settings workbenches, drawer details, and modal details.

## Audit Signals

The design is driven by repeated application patterns already present under `apps/`:

- `openchat/app/openchat-admin/packages/opencat-admin-ui/src/components/AdminPrimitives.tsx` already exposes a local `FilterBar`
- multiple `openchat-admin` pages repeat the same filter strip structure above tables and listings
- `sdkwork-drive/sdkwork-drive-pc-react/packages/sdkwork-drive-drive/src/components/DriveToolbar.tsx` mixes summary chips, filter controls, and action rows in a repeated list-page shell
- `sdkwork-desktop-settings/packages/sdkwork-codebox-usage/src/components/usage/RequestDetailPanel.tsx` repeats `DetailSection` plus `DetailItem` key-value presentation
- backend/admin and productivity flows keep rebuilding structured detail panels for drawer and modal contexts

## Rejected Alternatives

### Alternative 1: Build `DataGrid` first

Rejected for this iteration. The overlap is real, but the shape is still too close to app-specific data and interaction policy. Shipping a half-generic grid now would increase coupling.

### Alternative 2: Build `PanelGroup` / `ResizablePanel` first

Rejected for this iteration. Resizable desktop panes are valuable, but the interaction model and persistence rules still vary too much between apps. The abstraction risk is higher than the current reward.

### Alternative 3: Build only `ToolbarButton`

Rejected as the main iteration target. It is useful, but on its own it does not close the larger structural gap for list pages and detail drawers.

## Chosen Design

### `form` domain: `FilterBar`

`FilterBar` belongs in `form`, not `layout`, because it is a composition shell for filters and search controls rather than a purely presentational panel.

The initial family is:

- `FilterBar`
- `FilterBarSection`
- `FilterBarActions`

Responsibilities:

- host search, select, date, and toggle filters in a consistent desktop row
- support summary copy and result count text
- support a dedicated actions region for submit, reset, export, and view actions
- stay agnostic to React Hook Form so it can be used with raw controlled inputs or form bindings

Non-goals:

- no query-state management
- no business DTO assumptions
- no embedded pagination or data-table behavior

### `data-display` domain: `DescriptionList`

`DescriptionList` belongs in `data-display`, because it represents structured read-only information and should remain independent from form state.

The initial family is:

- `DescriptionList`
- `DescriptionItem`
- `DescriptionTerm`
- `DescriptionDetails`

Responsibilities:

- standardize key-value display in drawers, modals, and side panels
- support one-column and two-column layouts
- support dense values, multiline values, and optional monospace detail values

Non-goals:

- no editable controls
- no schema-driven rendering
- no domain-specific formatting logic

## Styling Direction

Both component families should stay aligned to the current claw-studio baseline:

- panel surfaces use semantic SDKWORK theme variables
- borders remain subtle and desktop-first
- spacing should support dense information without collapsing readability
- components must work in both light and dark themes through token usage only

## Testing Strategy

This iteration follows TDD:

1. Write failing tests for `FilterBar` and `DescriptionList`
2. Verify the failures are caused by missing exports / missing behavior
3. Implement the minimum semantic structure and styling to satisfy the tests
4. Re-run focused tests, then package-wide verification

## Documentation Impact

After implementation, the framework docs must be updated in lockstep:

- `README.md`
- `docs/index.md`
- `docs/guide/getting-started.md`
- `docs/reference/package.md`
- `docs/design/architecture.md`
- `docs/design/component-planning.md`
- `docs/design/migration-audit.md`
- `docs/design/pc-app-adoption-matrix.md`
