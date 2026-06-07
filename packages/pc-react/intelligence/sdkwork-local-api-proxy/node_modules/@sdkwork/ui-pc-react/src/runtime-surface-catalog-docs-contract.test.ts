import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const generatedCatalogPath = resolve('docs/reference/runtime-surface-catalog.md');
const generatorScriptPath = resolve('scripts/generate-runtime-surface-catalog.mjs');

describe('runtime surface catalog docs contract', () => {
  function findCatalogRow(markdown: string, surfaceName: string) {
    return markdown
      .split('\n')
      .find((line) => line.startsWith(`| \`${surfaceName}\``));
  }

  it('publishes a generated runtime surface catalog reference page', () => {
    expect(existsSync(generatedCatalogPath)).toBe(true);

    const markdown = readFileSync(generatedCatalogPath, 'utf8');

    expect(markdown).toContain('# Runtime Surface Catalog');
    expect(markdown).toContain('<!-- Generated file. Do not edit directly. -->');
    expect(markdown).toContain('## UI Surfaces');
    expect(markdown).toContain('## Pattern Surfaces');
  });

  it('captures delegated inner pattern anatomy for forwardRef wrapper exports', () => {
    const markdown = readFileSync(generatedCatalogPath, 'utf8');

    expect(markdown).toContain('`entity-picker-dialog-items`');
    expect(markdown).toContain('`entity-picker-pagination`');
    expect(markdown).toContain('`two-pane-selector-items`');
    expect(markdown).toContain('`two-pane-selector-section-trigger`');
  });

  it('inherits delegated lower-shell anatomy when a wrapper republishes child slotProps', () => {
    const markdown = readFileSync(generatedCatalogPath, 'utf8');
    const entityPickerDialogRow = findCatalogRow(markdown, 'EntityPickerDialog');
    const twoPaneSelectorPopoverRow = findCatalogRow(markdown, 'TwoPaneSelectorPopover');

    expect(entityPickerDialogRow).toContain('`picker-dialog-body`');
    expect(entityPickerDialogRow).toContain('`picker-dialog-header`');
    expect(entityPickerDialogRow).toContain('`picker-dialog-sidebar`');
    expect(twoPaneSelectorPopoverRow).toContain('`anchored-picker-body`');
    expect(twoPaneSelectorPopoverRow).toContain('`anchored-picker-content`');
    expect(twoPaneSelectorPopoverRow).toContain('`anchored-picker-surface`');
  });

  it('inherits delegated anatomy for thin cross-file wrapper surfaces', () => {
    const markdown = readFileSync(generatedCatalogPath, 'utf8');
    const confirmDialogRow = findCatalogRow(markdown, 'ConfirmDialog');
    const dirtyStateBarRow = findCatalogRow(markdown, 'DirtyStateBar');

    expect(confirmDialogRow).toContain('`modal-content`');
    expect(confirmDialogRow).toContain('`modal-header`');
    expect(confirmDialogRow).toContain('`modal-footer`');
    expect(confirmDialogRow).not.toContain('`button`');
    expect(dirtyStateBarRow).toContain('`inline-alert`');
    expect(dirtyStateBarRow).toContain('`inline-alert-actions`');
    expect(dirtyStateBarRow).toContain('`inline-alert-title`');
  });

  it('keeps the generated runtime surface catalog synchronized with the source scanner', () => {
    const result = spawnSync(process.execPath, [generatorScriptPath, '--stdout'], {
      cwd: process.cwd(),
      encoding: 'utf8',
    });

    expect(result.status, result.stderr || result.stdout).toBe(0);
    expect(result.stdout).toBe(readFileSync(generatedCatalogPath, 'utf8'));
  }, 20_000);
});
