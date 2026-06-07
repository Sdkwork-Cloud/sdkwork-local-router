# SDKWORK UI PC React Desktop Shell Plan

## Goal

Standardize the shared desktop top-chrome layer across SDKWORK PC React applications.

## Completed Slice

- add `DesktopWindowControls` with a runtime-agnostic controller contract
- add `DesktopTitleBar` for shared drag-region-safe top bar composition
- add `DesktopAppHeader` for brand plus center-slot plus action-slot desktop headers
- add `SectionHeader` for sticky list and workspace subheaders
- reorganize `patterns` into `app-shell`, `desktop-shell`, and `workspace`
- keep top-level pattern files as compatibility re-export facades

## Next Iteration

- extract a shared status-bar pattern if the same bottom chrome repeats across more than one PC app
- decide whether route tabs and desktop menubar should live under `navigation` or `patterns`
- audit whether settings pages need a dedicated `SettingsSection` or can stay on `SectionHeader` plus `FormSection`
