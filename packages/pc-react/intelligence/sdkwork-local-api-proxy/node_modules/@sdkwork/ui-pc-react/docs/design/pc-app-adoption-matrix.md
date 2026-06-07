# PC App Adoption Matrix

## Scope

This matrix records the current PC React application landscape under `apps/` and identifies the best first migration seam for `@sdkwork/ui-pc-react`.

## Adoption Matrix

| Application path | Current UI basis | Styling stack | shadcn status | Recommended first migration seam |
| --- | --- | --- | --- | --- |
| `claw-studio/packages/sdkwork-claw-desktop` | `@sdkwork/claw-ui` local Radix + CVA package | Tailwind CSS v4 in desktop and shell packages | shadcn-compatible patterns, but no official registry file | Extract duplicated primitives, `PanelGroup`-style sidebar resizing, screenshot-friendly upload surfaces, and anchor the default SDKWORK theme preset here first |
| `magic-studio-v2` | `@sdkwork/react-commons` plus local workspace abstractions | Tailwind CSS v4 with `tailwindcss-animate` at workspace root | No `components.json`, custom shared layer | Adopt shared theme provider, `Toolbar`, `ToolbarButton`, `PanelGroup`, the upload family with paste and replacement semantics, and shell patterns before primitive-by-primitive replacement |
| `sdkwork-notes/sdkwork-notes-pc-react` | `@sdkwork/notes-commons` and `@sdkwork/notes-shell` | Tailwind CSS v4 | No explicit shadcn registry | Replace theme tokens, button/card/dialog surfaces, editor toolbars, then converge shell panels |
| `sdkwork-chat-pc-react` | `@sdkwork/openchat-pc-ui` plus a large app-specific package family | Tailwind CSS v3 | No registry, not Radix-first | Start with theme-token compatibility, `EmptySearch`, and shell wrappers, then phase primitives in module by module |
| `sdkwork-cloud-portal` | `sdkwork-pc-portal-ui` and layout-heavy local packages | Vite + React 19 workspace, no obvious Tailwind baseline in root package | No registry | Use shared shell, card, stat-card, button, and popover patterns first; keep portal-specific marketing surfaces local |
| `sdkwork-desktop-settings` | In-app shadcn/Radix component layer | Tailwind CSS v3.4 with broad Radix coverage | Has `components.json` | Direct primitive mapping candidate; easiest path to shared package consumption, including `Toolbar`, `ToolbarButton`, `PanelGroup`, and `IconButton` |
| `sdkwork-drive/sdkwork-drive-pc-react` | `@sdkwork/drive-ui`, near-duplicate of claw UI | Tailwind CSS v4 | shadcn-compatible patterns, no registry file | Consolidate with claw-derived primitives immediately after claw baseline hardens |
| `openchat/app/openchat-react-pc` | `@sdkwork/openchat-pc-ui` and package-local UI modules | Tailwind CSS v3.3 | No registry | Introduce shared styles, avatar/tabs/popover/progress, then migrate cross-cutting primitives |
| `sdkwork-backend-react-web/packages/sdkwork-react-backend-desktop` | `@sdkwork/react-backend-ui` plus backend-specific workspace packages | Package-local build with no visible Tailwind root in desktop package | No registry | Consume shared theme tokens, table, status-badge, toolbar, panel-group, description-list, upload family, navigation, and shell-level patterns; keep backend widgets local |
| `sdkwork-auth/sdkwork-auth-pc-react` | No material scaffold yet | No current stack to preserve | No registry | Start directly on `@sdkwork/ui-pc-react` with zero compatibility debt |

## Migration Tiers

### Tier 1: Direct consolidation

- `claw-studio`
- `sdkwork-drive/sdkwork-drive-pc-react`
- `sdkwork-desktop-settings`

These applications already sit closest to a shared shadcn/Radix mental model.

### Tier 2: Pattern-first convergence

- `magic-studio-v2`
- `sdkwork-notes/sdkwork-notes-pc-react`
- `sdkwork-backend-react-web/packages/sdkwork-react-backend-desktop`

These should adopt shell, theme, and surface conventions before replacing every local primitive.

### Tier 3: Compatibility-led migration

- `sdkwork-chat-pc-react`
- `openchat/app/openchat-react-pc`
- `sdkwork-cloud-portal`

These applications have enough local UI identity that shared package adoption should begin with low-risk wrappers and theme contracts, not broad forced rewrites.

### Tier 4: Greenfield adoption

- `sdkwork-auth/sdkwork-auth-pc-react`

This path should use `@sdkwork/ui-pc-react` from day one instead of creating a new local UI base.

## Rollout Standard

1. Adopt `@sdkwork/ui-pc-react/styles.css` and `SdkworkThemeProvider`.
2. Mount the shared `components/ui/feedback` `Toaster` and replace direct `sonner` or app-local toast store imports with the framework `toast` facade.
3. Replace duplicated `Toolbar`, `ToolbarButton`, `PanelGroup`, `IconButton`, `EmptySearch`, the upload family, `FilterBar`, and `DescriptionList` seams before touching heavier business widgets.
4. Replace duplicated primitives before touching business widgets.
5. Migrate `DesktopWindowControls`, `DesktopTitleBar`, `DesktopAppHeader`, `SectionHeader`, and other shell or panel composition seams next.
6. Leave app-specific cards, editors, and workflow widgets local until they prove cross-app reuse.
