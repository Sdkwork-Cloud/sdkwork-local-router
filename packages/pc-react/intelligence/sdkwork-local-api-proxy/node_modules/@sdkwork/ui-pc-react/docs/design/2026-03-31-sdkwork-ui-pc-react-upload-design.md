# SDKWORK UI PC React Upload System Design

## Scope

This iteration upgrades the `data-entry` domain from a single generic `FileUpload` control into a cohesive desktop upload family:

- `FileUpload`
- `ImageUpload`
- `VideoUpload`
- `AudioUpload`
- `DocumentUpload`

The goal is to give audited PC React applications one shared upload surface for images, videos, audio assets, and general documents without coupling the UI framework to any backend upload service.

## Audit Signal

Repeated upload seams already exist across the SDKWORK PC application family:

- `sdkwork-backend-react-web` carries app-local image and video upload shells
- older backup code contains richer upload queues, preview cards, and retry-oriented state handling
- `magic-studio-v2` and `claw-studio` both rely on media-heavy workflows that need previews, file constraints, and desktop-safe drag-and-drop

The duplication is not business logic. It is reusable upload UI infrastructure, so it belongs in the framework.

## External Benchmark

Current leading React UI systems point to the same architectural pattern:

- Ant Design Upload emphasizes a controlled `fileList`, multiple list presentations, preview handling, and constraint-aware upload flow
- Mantine Dropzone focuses on drag-and-drop state, accept and reject handling, and strong file-type ergonomics
- Chakra UI File Upload exposes a composable upload surface with explicit slots for trigger, dropzone, and file list
- shadcn/ui does not ship a first-party upload family, which means SDKWORK must own this abstraction instead of leaking app-local implementations

## Alternatives

### Alternative 1: Keep only one generic `FileUpload`

This preserves a small API surface, but it pushes image preview, audio and video affordances, file-type presets, and layout duplication back into consuming apps.

### Alternative 2: Add thin wrapper components around the current file input

This is better than the status quo, but it still keeps too much logic in one large file and makes it hard to extend the upload family cleanly.

### Alternative 3: Build a dedicated upload subdirectory with a shared foundation and media-specific wrappers

This is the best decision. It gives SDKWORK a professional directory boundary, keeps the shared upload data model centralized, and lets each media variant ship opinionated defaults without coupling to backend upload adapters.

## Decision

Implement an `upload` family under `src/components/ui/data-entry/upload/`.

The family should:

- keep `FileUpload` as the generic top-level upload component
- add `ImageUpload`, `VideoUpload`, `AudioUpload`, and `DocumentUpload` as typed presets
- centralize file matching, size formatting, media-kind inference, and preview resolution in shared helpers
- support both list and grid presentation, with image uploads defaulting to grid and the others defaulting to list
- render previews for local files and controlled remote URLs without introducing any backend upload dependency
- preserve the existing controlled or uncontrolled value model through `value`, `defaultValue`, and `onValueChange`

## API Direction

### Shared Item Model

`FileUploadItem` remains the transport shape between framework and consumers, but it should grow to support richer preview cases:

- stable `id`
- `name`, `size`, `type`, `status`
- optional `progress` and `error`
- optional local `file`
- optional remote `url`
- optional `previewUrl`
- optional semantic `kind`

### Shared Component Props

The base component should own:

- drag-and-drop plus click-to-browse behavior
- `accept`, `maxFiles`, `maxSize`, `multiple`
- `label` and `description`
- `variant` and `listType`
- rejection callbacks through `onReject`

### Specialized Wrappers

- `ImageUpload`: defaults to `accept="image/*"` and grid preview cards
- `VideoUpload`: defaults to `accept="video/*"` and video preview rows
- `AudioUpload`: defaults to `accept="audio/*"` and audio playback rows
- `DocumentUpload`: defaults to a document-friendly accept preset for PDFs, Office assets, markdown, text, JSON, and archive-like attachments

## Styling Direction

The upload family should stay aligned to SDKWORK theme tokens instead of hard-coded app colors:

- border, surface, and focus states from semantic token variables
- panel and control radii from `--sdk-radius-panel` and `--sdk-radius-control`
- media cards and metadata rows styled like desktop inspector content instead of mobile upload chips

This keeps the family aligned to the `claw-studio` visual baseline while remaining highly configurable.

## Directory Decision

The upload family should move into a dedicated subdirectory:

- `src/components/ui/data-entry/upload/file-upload.tsx`
- `src/components/ui/data-entry/upload/upload-dropzone.tsx`
- `src/components/ui/data-entry/upload/upload-item.tsx`
- `src/components/ui/data-entry/upload/upload-types.ts`
- `src/components/ui/data-entry/upload/upload-utils.ts`
- `src/components/ui/data-entry/upload/index.ts`

The package should continue re-exporting the family through:

- `src/components/ui/data-entry/index.ts`
- `src/components/ui/index.ts`

## Explicit Non-Goals

This iteration should not introduce:

- backend upload adapters
- provider-specific presigned URL logic
- queue retry orchestration
- business-only media generators

Those stay in consuming apps until a shared cross-app contract is proven.
