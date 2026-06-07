# SDKWORK UI PC React Upload Actions Design

## Scope

This iteration upgrades the shared upload family with two missing professional seams:

- inline rejection feedback
- item-level actions for preview, download, and retry

These capabilities should work across:

- `FileUpload`
- `ImageUpload`
- `VideoUpload`
- `AudioUpload`
- `DocumentUpload`

## Why This Matters

The current upload family already covers selection, previews, replacement, paste, directory upload, and clear-all behavior. The next repeated gap in real desktop flows is what happens after files appear in the list:

- rejected files need an immediate inline explanation, not only a callback
- uploaded assets often need a direct preview or open action
- persisted remote files need a quick download path
- failed uploads need a retry affordance without each app rebuilding list-level controls

Without these seams, consuming apps still need local wrappers around the shared upload list.

## Industry Signal

Leading upload systems expose this same interaction layer:

- Ant Design Upload explicitly supports preview and download list actions through `onPreview`, `showPreviewIcon`, and `showDownloadIcon`
- Chakra UI File Upload exposes list-level clear triggers and file-item action composition
- Mantine Dropzone pushes accept and reject state into the visible UI rather than limiting it to callbacks

SDKWORK should match that desktop-grade interaction model while staying UI-only and low-coupling.

## Alternatives

### Alternative 1: Keep callbacks only and leave the UI wiring to apps

This keeps the shared component smaller, but it preserves the exact duplication the framework is meant to remove.

### Alternative 2: Add a generic `renderItemActions` escape hatch first

This is flexible, but it is too abstract as the first shared step and would still force each app to rebuild the same preview, download, and retry controls.

### Alternative 3: Add a standard action layer plus visible rejection feedback

This is the best fit. It keeps the API focused on repeated desktop behaviors, stays easy to document and test, and still leaves room for a future render prop if a stronger cross-app need appears.

## Decision

Extend the upload family with:

- `showRejections?: boolean`
- `rejectionTitle?: string`
- `onPreviewItem?: (item: FileUploadItem) => void`
- `onDownloadItem?: (item: FileUploadItem) => void`
- `onRetryItem?: (item: FileUploadItem) => void`

The framework should:

- keep an internal last-rejection list for inline display
- render a warning `InlineAlert` when rejections occur and `showRejections` is enabled
- show preview and download actions when an item has a usable `url` or `previewUrl`, or when a callback is explicitly supplied
- show retry actions when an item is in error state and `onRetryItem` exists

## UI Direction

### Rejection Feedback

- rejection feedback should appear directly below the dropzone
- it should use `InlineAlert` with warning tone
- the copy should list the rejection messages for the current selection attempt

### Item Actions

- list items should expose compact text or ghost-button actions
- action placement should stay inside each item row or card, not outside the list
- `Preview` should be the primary non-destructive action
- `Download` should only appear when the item can resolve to a browser-openable URL
- `Retry` should only appear for error-state items

### Default Behavior

If a callback is not supplied and an item has a `url` or `previewUrl`, the framework may use a browser-native fallback such as `window.open` for preview and download intent.

## Non-Goals

This iteration should still avoid:

- transport-layer retries
- custom upload scheduling
- business-specific media inspectors
- a render-prop action API unless this standard action layer proves insufficient
