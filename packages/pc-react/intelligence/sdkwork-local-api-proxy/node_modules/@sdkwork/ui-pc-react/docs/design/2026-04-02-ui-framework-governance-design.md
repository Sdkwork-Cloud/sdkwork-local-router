# UI Framework Governance Design

## Goal

Turn `@sdkwork/ui-pc-react` from a growing component library into a framework-governed UI system with enforceable standards for tokens, component contracts, accessibility, structure, and testing.

## Decision

Use a contract-first governance model:

1. Define a strict framework contract for theme tokens, rendered component metadata, and component authoring rules.
2. Encode the contract as automated audit tests so framework drift becomes a failing test, not a style preference.
3. Refactor existing components to conform to the contract instead of adding compatibility aliases for legacy behavior.

This matches the strongest ideas from modern UI ecosystems:

- Radix, Base UI, and React Aria separate behavior contracts from branded surfaces.
- MUI, Ant Design, Chakra UI, and Mantine emphasize category clarity, documented APIs, and predictable discoverability.
- shadcn-style systems keep primitives composable and close to implementation, but still benefit from a project-specific framework rulebook.

## Why This Approach

### Option A: Keep polishing components one by one

This improves local quality, but the framework keeps drifting because nothing enforces shared rules.

### Option B: Rewrite the library around a new abstraction layer

This is expensive, destabilizing, and unnecessary because the current package already has a strong layered foundation.

### Option C: Add governance rules plus targeted refactors

This produces the highest long-term quality for the least waste. It keeps the current architecture, removes drift, and raises the standard for every future component.

This is the chosen approach.

## Framework Contract

### 1. Theme Contract

The theme layer must expose a closed semantic token set.

Rules:

- Every token used in component source must be defined by the theme contract.
- Every theme token must map to a CSS custom property.
- The base stylesheet must declare the full default token set.
- No component may reference undeclared tokens.
- Interaction emphasis tokens belong in the theme contract, not ad hoc inline strings.

The immediate correction is to close the current gaps around hover emphasis and soft elevation shadows.

### 2. Rendered Metadata Contract

Every rendered framework surface must expose a stable machine-readable identity.

Rules:

- Every UI component must expose `data-sdk-ui="<component-name>"` on its primary rendered surface.
- Every pattern component must expose `data-sdk-pattern="<pattern-name>"` or `data-sdk-region="<region-name>"` on meaningful layout surfaces.
- Slot markers such as `data-slot` are allowed only for true internal parts, not as a replacement for framework identity.
- Overlay families identify the rendered content surface, not the invisible state root.

This enables automated auditing, E2E targeting, design QA, and downstream app instrumentation.

### 3. Component Authoring Contract

Every reusable component must follow the same framework authoring rules.

Rules:

- Export an explicit props type.
- Use `forwardRef` when the rendered node is externally meaningful.
- Set a stable `displayName`.
- Prefer semantic DOM structure first, Radix primitives second, and wrapper-only abstraction last.
- Expose variants only when they represent framework-level semantics, not page-local styling convenience.
- Prefer token-backed classes over raw colors.
- Use shared base primitives for repeated button, field, panel, and overlay affordances.

### 4. Accessibility Contract

Accessibility must be part of the component contract, not a follow-up concern.

Rules:

- Interactive components must have an accessible name path.
- Stateful controls must expose the correct ARIA attributes for their role.
- Landmark and section components must wire labels and descriptions predictably.
- Overlay surfaces must preserve Radix dialog/menu semantics and focus management.
- Composite desktop components must expose meaningful regions for navigation and testing.

### 5. Testing Contract

The framework must test standards, not only behavior.

Rules:

- Add audit tests for theme token completeness.
- Add audit tests for component metadata coverage.
- Keep behavior tests for complex controls and patterns.
- Treat standards regressions as first-class test failures.

## Scope Of This Iteration

This iteration will standardize the framework in four passes:

1. Close the theme contract and eliminate undeclared token usage.
2. Add automated governance audits for tokens, metadata, and exports.
3. Refactor core primitives and key desktop patterns to expose consistent framework metadata.
4. Update reference docs so future component additions follow the same contract.

## Non-Goals

- No visual redesign of the framework brand language.
- No compatibility aliases for old unstable contracts.
- No package split or monorepo restructuring.
- No page-level feature work outside the shared UI framework.

## Success Criteria

- No component source references undeclared SDKWORK theme tokens.
- Core primitives and patterns expose consistent framework metadata.
- Audit tests fail when a new component violates the contract.
- Documentation explains the standard clearly enough for future contributors to follow without tribal knowledge.
