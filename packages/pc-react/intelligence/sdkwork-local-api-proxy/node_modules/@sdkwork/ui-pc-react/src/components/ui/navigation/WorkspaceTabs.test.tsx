import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { WorkspaceTabs } from './index';

describe('WorkspaceTabs', () => {
  it('renders closable workspace tabs and separates tab activation from close actions', () => {
    const onCloseTab = vi.fn();
    const onValueChange = vi.fn();

    render(
      <WorkspaceTabs
        actions={<button type="button">New tab</button>}
        items={[
          { id: 'notes', label: 'Notes.md', modified: true },
          { id: 'memory', label: 'Memory.md' },
        ]}
        onCloseTab={onCloseTab}
        onValueChange={onValueChange}
        value="notes"
      />,
    );

    expect(document.body.querySelector('[data-sdk-ui="workspace-tabs"]')).toHaveAttribute('data-slot', 'workspace-tabs');
    expect(document.body.querySelector('[data-slot="workspace-tabs-tablist"]')).toBeInTheDocument();
    expect(document.body.querySelector('[data-slot="workspace-tabs-actions"]')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Notes.md' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Notes.md' }).closest('[data-sdk-ui="workspace-tab"]')).toHaveAttribute('data-slot', 'workspace-tab');
    expect(screen.getByRole('tab', { name: 'Notes.md' })).toHaveAttribute('data-slot', 'workspace-tab-trigger');
    expect(screen.getByText('Notes.md')).toHaveAttribute('data-slot', 'workspace-tab-label');
    expect(document.body.querySelector('[data-slot="workspace-tab-modified-indicator"]')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close Memory.md' })).toHaveAttribute('data-slot', 'workspace-tab-close-button');

    fireEvent.click(screen.getByRole('tab', { name: 'Memory.md' }));
    expect(onValueChange).toHaveBeenCalledWith('memory');

    fireEvent.click(screen.getByRole('button', { name: 'Close Memory.md' }));
    expect(onCloseTab).toHaveBeenCalledWith('memory');
    expect(onValueChange).toHaveBeenCalledTimes(1);
  });
});
