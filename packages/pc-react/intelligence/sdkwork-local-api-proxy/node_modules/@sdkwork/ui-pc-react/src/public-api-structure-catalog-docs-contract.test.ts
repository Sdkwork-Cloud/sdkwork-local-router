import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const generatedCatalogPath = resolve('docs/reference/public-api-structure-catalog.md');
const generatorScriptPath = resolve('scripts/generate-public-api-structure-catalog.mjs');

describe('public API structure catalog docs contract', () => {
  function findCatalogRow(markdown: string, surfaceName: string) {
    return markdown
      .split('\n')
      .find((line) => line.startsWith(`| \`${surfaceName}\``));
  }

  it('publishes a generated public API structure catalog reference page', () => {
    expect(existsSync(generatedCatalogPath)).toBe(true);

    const markdown = readFileSync(generatedCatalogPath, 'utf8');

    expect(markdown).toContain('# Public API Structure Catalog');
    expect(markdown).toContain('<!-- Generated file. Do not edit directly. -->');
    expect(markdown).toContain('## UI Surfaces');
    expect(markdown).toContain('## Pattern Surfaces');
  });

  it('captures slot, surface, and callback contracts for high-structure UI components', () => {
    const markdown = readFileSync(generatedCatalogPath, 'utf8');
    const dataTableRow = findCatalogRow(markdown, 'DataTable');
    const workspaceTabsRow = findCatalogRow(markdown, 'WorkspaceTabs');

    expect(dataTableRow).toContain('`DataTableProps`');
    expect(dataTableRow).toContain('`DataTableSlotProps`');
    expect(dataTableRow).toContain('`DataTableRowPropsResolver`');
    expect(dataTableRow).toContain('`DataTableColumn`');
    expect(dataTableRow).toContain('`DataTableSortingChangeHandler`');
    expect(dataTableRow).toContain('`DataTableRowActionsRenderer`');

    expect(workspaceTabsRow).toContain('`WorkspaceTabsProps`');
    expect(workspaceTabsRow).toContain('`WorkspaceTabsSlotProps`');
    expect(workspaceTabsRow).toContain('`WorkspaceTabPropsResolver`');
    expect(workspaceTabsRow).toContain('`WorkspaceTabItem`');
    expect(workspaceTabsRow).toContain('`WorkspaceTabCloseHandler`');
    expect(workspaceTabsRow).toContain('`WorkspaceTabValueChangeHandler`');
  });

  it('captures callback-heavy pattern contracts without collapsing them into anonymous docs', () => {
    const markdown = readFileSync(generatedCatalogPath, 'utf8');
    const entityPickerDialogRow = findCatalogRow(markdown, 'EntityPickerDialog');
    const twoPaneSelectorPopoverRow = findCatalogRow(markdown, 'TwoPaneSelectorPopover');

    expect(entityPickerDialogRow).toContain('`EntityPickerDialogProps`');
    expect(entityPickerDialogRow).toContain('`EntityPickerDialogSlotProps`');
    expect(entityPickerDialogRow).toContain('`EntityPickerDialogItemRenderer`');
    expect(entityPickerDialogRow).toContain('`EntityPickerDialogConfirmHandler`');
    expect(entityPickerDialogRow).toContain('`EntityPickerSelectionMode`');

    expect(twoPaneSelectorPopoverRow).toContain('`TwoPaneSelectorPopoverProps`');
    expect(twoPaneSelectorPopoverRow).toContain('`TwoPaneSelectorPopoverSlotProps`');
    expect(twoPaneSelectorPopoverRow).toContain('`TwoPaneSelectorPopoverItemRenderer`');
    expect(twoPaneSelectorPopoverRow).toContain('`TwoPaneSelectorPopoverSectionRenderer`');
    expect(twoPaneSelectorPopoverRow).toContain('`TwoPaneSelectorPopoverValueChangeHandler`');
  });

  it('keeps the generated public API structure catalog synchronized with the source scanner', () => {
    const result = spawnSync(process.execPath, [generatorScriptPath, '--stdout'], {
      cwd: process.cwd(),
      encoding: 'utf8',
    });

    expect(result.status, result.stderr || result.stdout).toBe(0);
    expect(result.stdout).toBe(readFileSync(generatedCatalogPath, 'utf8'));
  }, 20_000);
});
