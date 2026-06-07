# SDKWORK UI PC React Upload Ergonomics Design

## Scope

This iteration hardens the upload family for real desktop workflows by adding four professional behaviors:

- single-file replacement when `maxFiles` is `1`
- directory upload support
- clipboard paste upload support
- list-level clear-all actions

These capabilities apply to the full upload family:

- `FileUpload`
- `ImageUpload`
- `VideoUpload`
- `AudioUpload`
- `DocumentUpload`

## Why This Slice Matters

The first upload-family iteration established typed wrappers and media previews, but desktop applications still need higher-order intake ergonomics:

- images are often added through screenshot paste
- document and asset-heavy apps often upload entire folders
- single-slot image and video inputs typically replace the current file instead of rejecting the next one
- multi-file editors and asset panels need explicit bulk clear affordances

Without these behaviors, consuming apps still have to wrap the shared upload surface with local glue code.

## Industry Signal

Leading React UI upload systems converge on these workflow patterns:

- Ant Design Upload supports `maxCount` replacement-style flows, directory upload, paste intake, and list management
- Mantine Dropzone emphasizes desktop intake paths such as drag-and-drop plus controlled acceptance boundaries
- Chakra UI File Upload exposes composable trigger and list layers, which makes bulk actions and specialized intake affordances straightforward

SDKWORK should offer the same desktop-grade ergonomics while preserving the current low-coupling, shadcn-style composition model.

## Alternatives

### Alternative 1: Keep the current upload family and leave these workflows to consuming apps

This keeps the shared API smaller, but it pushes highly repeated desktop behavior back into local wrappers and weakens the value of the upload framework.

### Alternative 2: Add app-specific "smart uploader" composites inside the UI package

This would overreach and start coupling the shared framework to business or backend upload flows.

### Alternative 3: Extend the existing upload family with desktop-native intake ergonomics

This is the right choice. It preserves the current UI-only contract while making the shared upload family strong enough to replace common local wrappers.

## Decision

Extend the shared upload contract with the following capabilities:

- `replaceOnMax` to replace existing files instead of rejecting new ones when the selection limit is reached
- `directory` to enable folder selection in supported browsers
- `allowPaste` to accept pasted files from the clipboard when the upload surface is focused
- `clearable` plus `onClear` to support a list-level reset action

These behaviors should remain optional, variant-agnostic, and theme-aware.

## API Direction

### New Props

- `allowPaste?: boolean`
- `clearable?: boolean`
- `directory?: boolean`
- `onClear?: () => void`
- `replaceOnMax?: boolean`

### Default Behavior

- when `maxFiles === 1`, `replaceOnMax` should default to `true`
- for larger multi-file lists, `replaceOnMax` should default to `false`
- `allowPaste`, `directory`, and `clearable` should default to `false`

### UI Behavior

- clear-all action should live near the upload label and description block
- paste support should only react while the upload root is focused or while the document target is inside the component tree
- directory mode should remain a thin browser capability toggle with no special path processing in the UI layer

## Non-Goals

This iteration should still avoid:

- upload transport logic
- file system traversal abstractions beyond browser-native folder selection
- business-specific media processing
- retry queues or background upload orchestration
