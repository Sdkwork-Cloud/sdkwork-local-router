# Framework Governance

`@sdkwork/ui-pc-react` is governed as a framework, not as a loose component bucket.

The package now enforces twenty hard contracts:

The generated governance coverage matrix is published at `/reference/framework-governance-matrix`. The generated documentation governance inventory is published at `/reference/documentation-governance-catalog`. Use them when you need to answer which audit tests and reference pages enforce a specific contract and which markdown surfaces are governed by those publication rules.

## 1. Theme Contract

Every SDKWORK token referenced by component source must be declared by the theme system and emitted as a CSS variable.

Current semantic groups:

- `brand`
- `surface`
- `text`
- `border`
- `state`
- `radius`
- `shadow`

Rules:

- Use `var(--sdk-...)` tokens instead of raw color values.
- Add new tokens in `src/theme/sdkwork-theme.ts` and `src/styles/sdkwork-ui.css` together.
- Do not reference undeclared tokens from components.
- Prefer reusing an existing semantic token before expanding the contract.
- `radius.field` is the canonical token for text inputs, selects, textareas, and other dense inline controls such as pagination items inside collection surfaces.
- `radius.field` is also the canonical token for dense selection rows such as command items, menu items, tree rows, option tiles, and compact collection shells.
- `radius.control` remains the shared token for generic action controls and compact shell chrome; do not reuse it for large form field surfaces by default.
- The baseline radius ladder is intentionally compact: `radius.field = 0.375rem`, `radius.control = 0.5rem`, `radius.panel = 1rem`, and `radius.pill = 999px`.

## 2. Rendered Metadata Presence Contract

Every rendered framework surface must expose stable SDKWORK metadata.

Rules:

- UI components expose `data-sdk-ui="<component-name>"` on the primary rendered surface.
- Pattern components expose `data-sdk-pattern="<pattern-name>"` on the primary surface.
- Named internal regions use `data-sdk-region="<region-name>"`.
- Meaningful owned interior anatomy surfaces should expose stable `data-slot="<slot-name>"` markers when the component publishes or tests those sub-surfaces as framework structure.
- `data-slot` is for exact internal anatomy, not a replacement for `data-sdk-ui` or `data-sdk-pattern` identity markers.
- Wrapper components that delegate to another framework component must still pass a stable marker through.

## 3. Runtime Metadata Identity Contract

Stable metadata is not enough; public framework surfaces must be uniquely identifiable.

Rules:

- Every cataloged public UI component with a real DOM surface exposes an exact kebab-case `data-sdk-ui` identity derived from its export name.
- Every cataloged public pattern with a real DOM surface exposes an exact kebab-case `data-sdk-pattern` identity derived from its export name.
- Delegated wrappers and convenience aliases must still stamp their own exact identity on the surface they own.
- Public root/context/provider/portal primitives that do not render their own stable DOM surface must be explicitly classified as abstract in the runtime metadata identity audit. They are never exempt implicitly.
- Runtime identity markers are framework API. Renaming or removing them is a governed breaking change.

This metadata exists for:

- framework audits
- end-to-end test targeting
- visual regression tooling
- downstream app instrumentation
- the generated runtime surface catalog at `/reference/runtime-surface-catalog`
- the generated public API structure catalog at `/reference/public-api-structure-catalog`

## 4. Direct Surface Override Contract

Public framework surfaces must stay open to composition, instrumentation, and consumer styling.

Rules:

- Every public pattern that owns a direct stable DOM surface exposes standard DOM root props on that same surface.
- At minimum, direct surfaces must accept and apply `className`, `style`, `id`, and `data-*` attributes on the primary element that carries the framework identity marker.
- Root prop passthrough is part of the framework API, not an optional convenience.
- Delegated overlay or primitive wrappers that do not own a direct root surface must expose explicit lower-surface override hooks instead of silently swallowing consumer props.

This contract aligns the framework with:

- Radix composition guidance around prop spreading and ref-safe leaf components
- MUI's stable `className` / styling customization model
- React Aria's direct styling and data-attribute driven composition model

## 5. Authoring Contract

Reusable framework components follow the same authoring rules.

Rules:

- Export an explicit props type.
- Every public component exposes an exported `ComponentNameProps` contract, including primitive aliases and convenience wrappers.
- `forwardRef` components use an exported `ComponentNameProps` contract as the second generic.
- Public barrel entrypoints re-export component props contracts together with their component values, and those props contracts must remain published through every public aggregator that exposes the component.
- Use `forwardRef` when the rendered node matters to consumers.
- Every public component sets an explicit stable `displayName` that matches its exported component name exactly.
- Keep variants semantic, not page-local.
- Keep accessibility semantics at the component boundary.
- Prefer shared primitives over copy-pasted button, panel, field, and overlay shells.

## 6. Public API Contract

Framework entrypoints are treated as part of the product surface, not as incidental file wiring.

Rules:

- `src/components/ui/catalog.ts` defines the authoritative runtime export inventory.
- Each cataloged UI runtime export belongs to exactly one semantic domain barrel.
- Root package entrypoints re-export every cataloged runtime surface that they claim to publish.
- Public barrel entrypoints use exact `export *` forwarding so runtime values and props contracts travel together.
- The root package JavaScript entrypoint stays side-effect-free; consumers import `@sdkwork/ui-pc-react/styles.css` explicitly for framework styles.

## 7. Publication Contract

Package publication metadata and documentation are treated as framework surface, not release afterthoughts.

Rules:

- `package.json` export map entries must match the audited public subpath contract exactly.
- Vite library entry wiring must derive from the same publication contract used to audit package metadata.
- The package root JavaScript surface stays tree-shakeable; CSS side effects are declared explicitly through the stylesheet export.
- `sideEffects` metadata is CSS-only so consumers keep framework styles without disabling JavaScript tree shaking.
- Documentation import snippets must use only published package subpaths and real exported symbols.
- Documentation TypeScript and TSX snippets that import the framework must typecheck against local source entrypoints instead of drifting into unverified pseudocode.
- README export inventories must stay synchronized with the real package export map.

## 8. Install Boundary Contract

Framework verification must resolve against this package's own dependency graph.

Rules:

- Critical runtime and typing entrypoints must resolve from this package root.
- Do not allow `node_modules` links to drift into another app or workspace package.
- Treat cross-workspace dependency leakage as a framework integrity failure, not as a local machine quirk.
- Rebuild the local install against this package's lockfile when dependency entrypoints escape the package boundary.

## 9. Pattern Slot Props Contract

Composite pattern customization follows a single stable slot model.

Rules:

- Public composite patterns customize owned internal or delegated lower surfaces through structured `slotProps`.
- Public `slotProps` contracts are explicit exported `ComponentNameSlotProps` interfaces or type aliases. Do not publish anonymous inline slot objects on public props surfaces.
- Do not publish ad hoc top-level region props such as `headerClassName`, `bodyClassName`, `sidebarClassName`, or similar one-off DOM escape hatches.
- Direct root surface customization stays on the root itself through standard DOM props. `slotProps` is for named interior or delegated lower surfaces, not a second root prop channel.
- Every public slot key must map to exactly one stable owned surface. Do not reuse a single slot key to target multiple DOM nodes or multiple delegation layers.
- Slot prop values must accept the native props of the owned lower surface together with `data-*` attributes for instrumentation, testing, and app-side styling.
- Delegated overlay and picker patterns must forward slot props to the actual lower surface they own rather than trapping them at the wrapper boundary.

This contract aligns the framework with:

- MUI's slots and `slotProps` mental model for root versus interior structure
- Radix composition rules that require prop-spreading leaf surfaces
- React Aria's emphasis on `className`, `style`, and `data-*` driven styling and state targeting

## 10. Composite UI Slot Props Contract

Composite UI components follow the same structured customization model as patterns.

Rules:

- Public composite UI components customize delegated or internal lower surfaces through structured `slotProps`.
- Do not publish isolated top-level region styling hooks such as `menuClassName`, `contentClassName`, `gridClassName`, or similar one-off class-only escape hatches.
- Keep low-level primitives such as `Table` structurally thin. Framework chrome, dense selection affordances, built-in pagination, and rows-per-page controls belong on higher-order composites such as `DataTable`, not on the primitive semantic shell.
- Dense collection pagination should use compact field-scale geometry instead of panel-scale or oversized control rounding.
- When a composite UI component owns repeated structural surfaces such as rows, headers, or cells, expose structured `get*Props`, `headerProps`, or `cellProps` contracts instead of narrower `*ClassName` callbacks.
- Slot keys and structured surface callbacks must map to exact owned surfaces. One key or callback target must not implicitly control multiple DOM layers.
- Slot and surface prop values must accept the native props of the owned surface together with `data-*` attributes.

This contract aligns the framework with:

- MUI's slot-based component structure model
- Radix composition and prop-spreading requirements for leaf surfaces
- React Aria's styling model based on direct props and stable data attributes

## 11. Collection UI Item Surface Contract

Collection-style UI components standardize repeated owned item surfaces the same way the framework standardizes composite interiors.

Rules:

- Collection roots keep direct root customization on the collection root itself through standard DOM props.
- Named non-root collection regions such as headers, lists, empty shells, or tree containers use container `slotProps`.
- Data-driven repeated item roots use structured callbacks such as `getItemProps` instead of ad hoc `itemClassName` or wrapper-only styling hooks.
- Data-driven repeated item internals use structured callbacks such as `getItemSlotProps`, with each slot key targeting one exact owned item surface.
- Public collection item components that own internal regions, such as `ActivityFeedItem`, `NotificationCenterItem`, `StepperItem`, or `WorkspaceTab`, expose item-level `slotProps` for those interior surfaces.
- Semantic content hooks such as `renderLabel`, `renderActions`, or item content fields can customize content, but they do not replace framework surface-prop contracts.
- Item root props, item slot props, and container slot props must accept the native props of the exact owned surface together with `data-*` attributes.

This contract aligns the framework with:

- MUI's root-versus-slot structure and collection-oriented component customization model
- Radix composition guidance that keeps owned leaf surfaces open to prop spreading
- React Aria's collection styling model built around direct props and stable `data-*` state hooks

## 12. Public Structured Surface Type Contract

Public structured surface APIs are governed as first-class framework contracts, not as incidental TypeScript syntax.

Rules:

- Public structured surface fields such as `getRowProps`, `headerProps`, `cellProps`, `getItemProps`, and `getItemSlotProps` must reference explicit named exported `*Props` or `*PropsResolver` contracts.
- Do not publish anonymous function signatures, anonymous inline object shapes, or raw imported generic helpers such as `SlotProps<...>` directly on public props contracts for governed structured surfaces.
- When a structured surface accepts both direct props and a resolver form, publish each branch as its own named exported contract instead of hiding one branch behind an anonymous inline callback type.
- The named structured surface helper types referenced by public props must remain exported through the owning public barrel and the root package entrypoint.

This contract aligns the framework with:

- MUI's documented slots and typed surface override model
- React Aria's explicit collection and item surface contracts
- Radix composition guidance that keeps leaf prop boundaries explicit and reusable

## 13. Public Semantic Callback Type Contract

Public semantic data callbacks are framework API and must read like stable contracts, not anonymous TypeScript fragments.

Rules:

- Public semantic data callbacks such as `cell`, `renderItem`, `renderSection`, `renderLabel`, `renderActions`, `rowActions`, `getItemKey`, `getRowId`, `getItemId`, `getSectionId`, `getItemLabel`, `getSectionLabel`, `getItemDescription`, `getSectionDescription`, `getItemBadge`, `getRowSelectionLabel`, `confirmLabel`, `selectionSummary`, and `loadChildren` must reference explicit named exported `*Renderer`, `*Resolver`, or `*Handler` contracts.
- Do not publish anonymous inline function signatures for governed semantic callbacks on public framework contracts.
- When a public semantic field accepts both static content and a callback branch, the callback branch must still be a named exported contract rather than an inline function union member.
- Named semantic callback contracts referenced by public props must remain exported through the owning public barrel and the root package entrypoint.

This contract aligns the framework with:

- MUI X's explicit renderer and resolver callback model for data components
- React Aria's collection render contract design
- Radix's preference for explicit reusable public type surfaces instead of ad hoc inline callback shapes

## 14. Public Event Handler Type Contract

Public event handlers are framework API and must be published as stable named contracts, not as throwaway inline callbacks.

Rules:

- Public `on*` event fields on exported framework `*Props` contracts must reference explicit named exported `*Handler` types.
- Do not publish anonymous inline function signatures for public event handlers on framework props contracts.
- Named event handler contracts referenced by public props must remain exported through the owning public barrel and the root package entrypoint.
- Prefer reusing one handler contract across sibling public props in the same module when they describe the same event payload shape.

This contract aligns the framework with:

- MUI's stable typed callback surface for controlled and uncontrolled component APIs
- React Aria's event-oriented collection and selection callbacks
- Radix's reusable explicit prop contract style for leaf and controlled primitives

## 15. Public Auxiliary Callback Type Contract

Public auxiliary contracts beyond `*Props` are still framework API and must publish function-valued members through stable named contracts, not anonymous inline signatures.

Rules:

- Exported public non-`Props` contracts such as item models, selection contexts, service APIs, controller contracts, result objects, and option bags must reference explicit named exported `*Handler`, `*Renderer`, `*Resolver`, `*Subscriber`, `*Factory`, or `*Unsubscribe` contracts for every governed function-valued member.
- Do not publish anonymous inline function property types, anonymous method signatures, anonymous call signatures, or anonymous function branches hidden inside exported union or intersection helper types on governed public auxiliary contracts.
- Named auxiliary callback contracts referenced by public contracts must remain exported through the owning public barrel and the root package entrypoint.
- Prefer reusing one auxiliary callback contract across sibling public fields in the same module when they describe the same payload and lifecycle shape.

This contract aligns the framework with:

- MUI X's named typed callback model for reusable grid and data infrastructure helpers
- React Aria's explicit render and action context contracts for collection state
- Radix's preference for explicit composable public type surfaces over anonymous callback fragments

## 16. Public Helper Type Publication Contract

Public framework contracts must not depend on hidden same-file helper types. If a named helper becomes part of a public contract, it is public API.

Rules:

- Exported public framework contracts such as `*Props`, `*SlotProps`, `*Context`, `*Entry`, `*Api`, `*Controller`, `*Result`, and `*Options` must not reference same-module named helper types that remain private.
- Any same-file named helper type referenced by an exported public contract must itself be explicitly exported from the source module.
- Those helper types must remain published through the owning public barrel and the root package entrypoint.
- When a shared base props helper becomes public, its own callback fields must still follow the framework's named handler, renderer, and resolver contracts instead of leaking anonymous inline signatures.

This contract aligns the framework with:

- MUI's practice of publishing reusable associated helper and slot types together with component APIs
- React Aria's explicit export of collection state, render, and helper type surfaces
- Radix's preference for clear public prop and composition boundaries over hidden type indirection

## 17. Catalog Runtime Completeness Contract

`uiComponentCatalog` is the framework's authoritative runtime inventory, so the contract must hold in both directions.

Rules:

- Every public runtime component export published through `src/components/ui/index.ts` or `src/components/patterns/index.ts` must appear in `src/components/ui/catalog.ts`.
- Each catalog entry continues to belong to exactly one semantic domain bucket.
- Runtime-only helper primitives such as triggers, overlays, portals, content shells, scrollbars, and item subcomponents are still governed runtime surface when they are publicly exported.
- Adding a new public runtime export without cataloging it is a framework contract failure, even if the export is otherwise published correctly.

This contract aligns the framework with:

- MUI's explicit public runtime component inventories across package entrypoints and docs
- React Aria's authoritative export-driven component surface model
- Radix's principle that every published primitive is deliberate public framework API

## 18. Field Shell Slot Props Contract

Field-like composite controls often keep native form props on an inner input while still owning framework shell surfaces such as wrappers, steppers, and calendar triggers. Those shell surfaces are public framework API and must stay customizable.

Rules:

- Public field-like composite UI controls that render an owned shell or owned add-on surfaces while keeping primary form props on an inner control must expose explicit named `slotProps` for those owned shell surfaces.
- Root shell customization must not be trapped behind the inner input's native prop channel.
- Owned add-on surfaces such as steppers, stepper buttons, calendar buttons, and similar field chrome must expose exact slot keys and accept native props together with `data-*` attributes.
- Top-level native form props may continue to target the inner control, but shell customization must remain available through the field's published slot contract.

This contract aligns the framework with:

- MUI's field and picker slot model for root shells and owned auxiliary controls
- React Aria's field-wrapper composition guidance for direct surface styling and instrumentation
- Radix composition guidance that keeps owned leaf surfaces open instead of hiding them behind wrapper internals

## 19. UI Direct Surface Ref Contract

Public UI runtime surfaces that own their exact framework marker must also own a stable ref contract.

Rules:

- Every public UI runtime component published through `src/components/ui/index.ts` that directly renders an intrinsic DOM surface carrying its exact kebab-case `data-sdk-ui` identity must be declared with `React.forwardRef`.
- The forwarded ref must attach to that same intrinsic DOM surface that carries the exact framework identity marker.
- Abstract primitives such as roots, portals, providers, and other no-DOM exports remain explicitly out of scope until they own a real intrinsic runtime surface.
- Delegated wrappers that pass their marker through another component remain governed by the lower owned surface contract until they render their own intrinsic marked root.

This contract aligns the framework with:

- MUI's composition model where public component refs target the stable root surface
- Radix composition guidance that requires public leaf surfaces to spread props and forward refs
- React Aria's expectation that composed surfaces remain directly focusable, measurable, and instrumentable

## 20. Pattern Direct Surface Ref Contract

Public pattern runtime surfaces that own their exact framework marker must also own a stable ref contract.

Rules:

- Every public pattern component published through `src/components/patterns/index.ts` that directly renders an intrinsic DOM surface carrying its exact kebab-case `data-sdk-pattern` identity must be declared with `React.forwardRef`.
- The forwarded ref must attach to that same intrinsic DOM surface that carries the exact framework identity marker.
- Abstract shells, delegated wrappers, and other public pattern exports that do not themselves own an intrinsic marked surface remain governed by lower-surface composition contracts until they render their own intrinsic marked root.
- Generic public pattern components must preserve their published generic call ergonomics while still satisfying the framework authoring contract around explicit exported `ComponentNameProps`.

This contract aligns the framework with:

- MUI's composition model where public pattern shells remain measurable and focus-targetable through a stable root ref
- Radix composition guidance that requires public leaf surfaces to spread props and forward refs
- React Aria's expectation that composed overlays, shells, and pickers remain directly instrumentable at the owned surface boundary

## Audit Coverage

The generated runtime inventory is published at `/reference/runtime-surface-catalog`, the generated public type inventory is published at `/reference/public-api-structure-catalog`, the generated governance coverage matrix is published at `/reference/framework-governance-matrix`, and the generated documentation governance inventory is published at `/reference/documentation-governance-catalog`. These pages are emitted from source and guarded by sync tests, so the references drift only when the source contract drifts.

Framework drift is prevented by source-level audit tests:

- `src/theme/theme-contract.test.ts`
- `src/components/ui/framework-contract.test.ts`
- `src/components/ui/authoring-contract.test.ts`
- `src/runtime-metadata-identity-contract.test.ts`
- `src/pattern-direct-surface-contract.test.tsx`
- `src/pattern-slot-props-api-contract.test.ts`
- `src/pattern-slot-props-contract.test.tsx`
- `src/public-slot-props-api-contract.test.ts`
- `src/ui-slot-props-api-contract.test.ts`
- `src/ui-slot-props-contract.test.tsx`
- `src/ui-collection-surface-api-contract.test.ts`
- `src/ui-collection-surface-contract.test.tsx`
- `src/public-structured-surface-types-contract.test.ts`
- `src/public-semantic-callback-types-contract.test.ts`
- `src/public-event-handler-types-contract.test.ts`
- `src/public-auxiliary-callback-types-contract.test.ts`
- `src/public-helper-types-contract.test.ts`
- `src/catalog-runtime-export-completeness-contract.test.ts`
- `src/ui-field-shell-slot-props-api-contract.test.ts`
- `src/ui-field-shell-slot-props-contract.test.tsx`
- `src/ui-direct-surface-ref-contract.test.ts`
- `src/pattern-direct-surface-ref-contract.test.ts`
- `src/public-api-contract.test.ts`
- `src/public-props-contract.test.ts`
- `src/public-props-api-contract.test.ts`
- `src/public-api-structure-catalog-docs-contract.test.ts`
- `src/runtime-surface-catalog-docs-contract.test.ts`
- `src/docs-governance-catalog-docs-contract.test.ts`
- `src/display-name-contract.test.ts`
- `src/barrel-contract.test.ts`
- `src/package-publish-contract.test.ts`
- `src/docs-governance-manifest-contract.test.ts`
- `src/docs-contract.test.ts`
- `src/docs-snippet-typecheck-contract.test.ts`
- `src/install-contract.test.ts`

These tests fail when:

- a component references an undeclared token
- the stylesheet and runtime token contract diverge
- a rendered component file lacks stable SDKWORK metadata
- a cataloged public surface lacks an exact kebab-case runtime identity marker or an explicit abstract no-DOM exemption
- a direct-surface public pattern stops accepting or applying standard DOM root props on its primary surface
- a composite public pattern falls back to ad hoc internal `*ClassName` props instead of a structured `slotProps` contract
- a public `slotProps` field degrades into an anonymous inline type instead of a named exported slot contract
- a public pattern slot stops forwarding to the exact owned lower surface it claims to represent
- a composite public UI component falls back to isolated region class hooks instead of structured slot or surface prop contracts
- a data-oriented UI component exposes row or column styling through narrow `*ClassName` hooks instead of full surface props
- a collection-style UI component keeps repeated item surfaces trapped behind semantic-only render hooks instead of structured collection props
- a public collection item component owns internal regions but exposes no item-level `slotProps` contract
- a public structured surface field collapses back to an anonymous inline function, anonymous object, or unpublished helper type
- a public semantic data callback falls back to an anonymous inline function instead of a named exported renderer, resolver, or handler contract
- a public event handler falls back to an anonymous inline function instead of a named exported handler contract
- a public non-props auxiliary contract falls back to an anonymous function-valued field, callable signature, or hidden inline callback branch instead of a named exported callback contract
- a public framework contract references a same-file helper type that remains private or unpublished
- a public runtime component export is published through a public entrypoint but missing from `uiComponentCatalog`
- a composite field control keeps shell or add-on customization trapped behind the inner input API instead of publishing explicit `slotProps`
- a public UI runtime component owns an exact intrinsic marked surface but does not forward its ref to that same surface
- a public pattern component owns an exact intrinsic marked surface but does not forward its ref to that same surface
- a public component lacks an explicit exported `ComponentNameProps` contract
- a public component props contract exists in source but is missing from a public package entrypoint
- a public component lacks an explicit exact-match `displayName` assignment
- a `forwardRef` component relies on an inline or non-exported props contract
- a cataloged runtime export is missing from its public entrypoint or leaks across multiple domain barrels
- a public barrel entrypoint curates exports instead of exact star re-export forwarding
- the published export map or stylesheet side-effect metadata drifts from the framework publication contract
- the governed documentation manifest drifts so framework import audits and snippet typecheck coverage no longer describe the same documentation surface
- the generated documentation governance catalog drifts from the governed documentation manifest or markdown analysis output
- a documented import path or imported symbol no longer matches the published package surface
- a documented TypeScript or TSX example that imports the framework no longer typechecks against the local source-backed package surface
- a critical dependency entrypoint resolves outside this package root

## Contributor Workflow

When adding or changing a component:

1. Start from the closest existing domain pattern.
2. Add or preserve exact-match `data-sdk-ui`, `data-sdk-pattern`, and `data-sdk-region` markers.
3. Add or preserve stable `data-slot` markers on meaningful owned anatomy surfaces that the component treats as public framework structure.
4. If a public direct surface owns its DOM root, keep that same root open to standard DOM props instead of trapping `className`, `style`, `id`, or `data-*`.
5. If a composite pattern exposes named internal or delegated regions, publish stable `slotProps` keys instead of ad hoc top-level region props.
6. If a composite UI component exposes internal or delegated regions, publish `slotProps` instead of isolated region class hooks.
7. If a data-oriented UI component exposes row, header, or cell customization, use structured props contracts instead of `*ClassName` callbacks.
8. If a collection-style UI component renders repeated owned item surfaces, use `getItemProps`, `getItemSlotProps`, or item-level `slotProps` instead of app-local wrappers or semantic-only surface hooks.
9. Name and export structured surface helper types so public callbacks and prop values resolve through explicit `*Props` or `*PropsResolver` contracts.
10. Name and export semantic renderer, resolver, and handler callback types instead of publishing anonymous inline callback signatures on public framework contracts.
11. Name and export public event handler callback types instead of publishing anonymous inline `on*` signatures.
12. Name and export callback helper contracts for public non-`Props` auxiliary APIs instead of publishing anonymous function-valued members or callable unions.
13. Export and publish every same-file named helper type referenced by a public framework contract instead of hiding public type dependencies behind private aliases.
14. Keep each slot name one-to-one with a single owned surface.
15. Keep `uiComponentCatalog` synchronized bidirectionally with public runtime exports; a published runtime component must be cataloged and a cataloged runtime component must stay published.
16. Regenerate `/reference/runtime-surface-catalog`, `/reference/public-api-structure-catalog`, and `/reference/documentation-governance-catalog` so the published runtime, public-type, and documentation-governance inventories stay synchronized with source-level contracts.
17. If a public export has no DOM surface, classify it explicitly as abstract instead of silently skipping metadata identity.
18. If a composite field keeps native props on an inner control, expose owned shell and add-on surfaces through named `slotProps` instead of trapping shell customization at the wrapper boundary.
19. If a public UI runtime component owns an intrinsic exact-marked root surface, declare it with `React.forwardRef` and attach that ref to the same root node.
20. If a public pattern component owns an intrinsic exact-marked root surface, declare it with `React.forwardRef` and attach that ref to the same root node.
21. Keep styling token-backed.
22. Keep primitives structurally thin; move framework-owned dense chrome and built-in pagination into the higher-order composite instead of bloating low-level table or list shells.
23. Add or update behavior tests when behavior changes.
24. Run governance audits plus full package verification before closing the work.
