# Migration Audit

## Target PC Application Landscape

For the more detailed app-by-app infrastructure baseline, see [PC App Adoption Matrix](./pc-app-adoption-matrix).

| Application | Current State | Shared UI Opportunity |
| --- | --- | --- |
| `claw-studio` | Has `@sdkwork/claw-ui` with Radix + CVA primitives and desktop overlays | High. Many primitives are generic and close to shared form already |
| `magic-studio-v2` | Uses `@sdkwork/react-commons` and local framework components | High. Desktop shell patterns, toolbar abstractions, and split-workspace layouts can converge first |
| `sdkwork-notes/sdkwork-notes-pc-react` | Uses `@sdkwork/notes-commons` with a smaller local component set | High. Button/dialog/surface components and note-editor toolbars can standardize quickly |
| `sdkwork-chat-pc-react` | Uses a homegrown UI foundation and theme system | Medium-high. Requires careful adapter strategy, but already has a strong `EmptySearch` migration seam |
| `sdkwork-cloud-portal` | Local UI package is layout-heavy, not design-system-heavy | Medium. More useful for shell and primitive adoption than direct replacement |
| `sdkwork-desktop-settings` | Already has `components.json` and shadcn adoption intent | High. Good fit for direct primitive reuse |
| `sdkwork-drive/sdkwork-drive-pc-react` | Has `@sdkwork/drive-ui`, largely duplicated from claw UI | Very high. Duplication is immediate evidence for consolidation |
| `openchat/app/openchat-react-pc` | Separate package family with PC modules | Medium. Best approached through primitive compatibility first |
| `sdkwork-backend-react-web/packages/sdkwork-react-backend-desktop` | Desktop package embedded in a broader backend web workspace | Medium. Good candidate for shell and theme token reuse |
| `sdkwork-auth/sdkwork-auth-pc-react` | PC React directory exists but is not materially scaffolded yet | Low today. Keep it aligned with the shared framework once implementation starts |

## Key Findings

### Finding 1

`sdkwork-claw-ui` and `sdkwork-drive-ui` are near-duplicates and should be treated as the clearest source material for shared primitives.

### Finding 2

`magic-studio-v2` already contains valuable desktop framework abstractions. Those should inform shared pattern APIs, but they need to be generalized and decoupled from app-specific styling.

### Finding 3

`sdkwork-chat-pc-react` has its own mature theme and component model, so migration should happen through compatibility adapters, not an abrupt replacement.

### Finding 4

There is no single repo-wide pnpm workspace covering all PC apps. Because of that, the UI framework must be independently buildable and publishable rather than depending on local `workspace:*` links across app folders.

### Finding 5

The audited PC React surface spans both standalone app roots and embedded desktop packages, so the framework must document path-based adoption guidance rather than assuming a uniform workspace layout.

### Finding 6

Shared display-heavy primitives are no longer speculative. The audit shows concrete overlap for tables, status badges, and dashboard metrics across `sdkwork-desktop-settings`, `sdkwork-react-backend-ui`, `magic-studio-v2`, and portal-style PC modules, which justifies promoting those surfaces into the framework instead of leaving them app-local.

### Finding 7

The notification stack is already converging on the same mental model. `claw-studio`, `sdkwork-notes`, `sdkwork-drive`, `sdkwork-desktop-settings`, and parts of `sdkwork-chat-pc-react` already use `sonner`, while `magic-studio-v2` and `sdkwork-backend-react-web` maintain local toast wrappers or stores with the same `success/error/warning/info` semantics. That makes a shared `feedback` domain with `Toaster` and `toast` a direct consolidation target rather than speculative framework work.

### Finding 8

Bounded numeric fields and panel-local alerts are repeated often enough to merit first-class framework treatment. Numeric retry, quota, amount, and settings inputs recur across `sdkwork-desktop-settings`, `claw-studio`, `sdkwork-cloud-portal`, `sdkwork-backend-react-web`, and `magic-studio-v2`, while inline warning and remediation blocks recur across upload, billing, admin, and desktop settings flows. That makes `NumberInput` and `InlineAlert` direct consolidation targets rather than later nice-to-have additions.

### Finding 9

Desktop action rows and filtered-result empty states are repeated often enough to justify shared abstractions. `magic-studio-v2` carries `ActionToolbar`-style patterns, `sdkwork-notes/sdkwork-notes-pc-react` repeats editor and search header actions, `sdkwork-chat-pc-react` and `openchat/app/openchat-react-pc` repeat rich-text toolbar toggles, `sdkwork-desktop-settings` and backend/admin packages repeat compact icon-trigger toolbars, and `sdkwork-chat-pc-react` already ships an `EmptySearch`-style component. That makes `Toolbar`, `ToolbarButton`, `IconButton`, and `EmptySearch` direct framework responsibilities rather than app-local conveniences.

### Finding 10

List filters and detail inspection panels are repeated often enough to justify framework ownership. `openchat-admin` already carries a local `FilterBar`, list-heavy apps repeat search plus select plus action strips above result sets, and `sdkwork-desktop-settings` usage panels repeat `DetailItem`-style key-value presentation inside drawers. That makes `FilterBar` and `DescriptionList` direct framework responsibilities rather than local helper fragments.

### Finding 11

Resizable panel layouts are repeated often enough to justify framework ownership. `magic-studio-v2` repeats split views and drag handles across generation, notes, film, chatppt, and editor packages; `claw-studio` and `openchat-admin` carry custom sidebar resize handles; backend/admin packages also repeat width persistence around shell chrome. That makes `PanelGroup`, `Panel`, and `PanelResizeHandle` direct framework responsibilities rather than app-local divider components and ad hoc hooks.

### Finding 12

Upload surfaces are repeated often enough to justify framework ownership. `sdkwork-backend-react-web` already carries app-local image and video upload wrappers, older desktop code carries richer upload queues and preview cards, and studio-style apps need image, video, audio, and document handling with the same desktop drag-and-drop and preview expectations. That makes the upload family a direct framework responsibility rather than a page-local helper.

### Finding 13

Desktop upload ergonomics are repeated too. Screenshot paste, folder imports, list reset actions, and single-slot replacement behaviors recur across media editing, document intake, backend/admin asset forms, and settings-style upload slots. Those behaviors should live in the shared upload family instead of being rebuilt as local wrappers around the same file input surface.

## Recommended Rollout

1. Standardize primitives and patterns in `sdkwork-ui-pc-react`.
2. Use duplicated packages as the first extraction source.
3. Migrate feedback, toolbar, split-workspace, upload, list-filter, and detail-inspection seams before business widgets that sit on top of them.
4. Migrate pattern-level consumers before business components.
5. Keep app-specific components local until shared behavior is proven.
