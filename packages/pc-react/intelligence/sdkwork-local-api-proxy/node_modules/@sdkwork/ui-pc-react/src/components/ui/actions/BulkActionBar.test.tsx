import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '../button';
import { BulkActionBar } from './index';

describe('BulkActionBar', () => {
  it('renders selection summary, actions, and clear affordance for batch operations', () => {
    const onClear = vi.fn();

    render(
      <BulkActionBar
        actions={<Button size="sm">Export</Button>}
        count={3}
        description="Apply shared operations to the current selection."
        meta="24 total results"
        onClear={onClear}
        title="Rows selected"
        tone="info"
      />,
    );

    expect(document.body.querySelector('[data-sdk-ui="bulk-action-bar"]')).toHaveAttribute('data-slot', 'bulk-action-bar');
    expect(screen.getByText('3')).toHaveAttribute('data-slot', 'bulk-action-bar-count');
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Rows selected')).toHaveAttribute('data-slot', 'bulk-action-bar-title');
    expect(screen.getByText('Apply shared operations to the current selection.')).toHaveAttribute('data-slot', 'bulk-action-bar-description');
    expect(screen.getByText('24 total results')).toHaveAttribute('data-slot', 'bulk-action-bar-meta');
    expect(document.body.querySelector('[data-slot="bulk-action-bar-actions"]')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Export' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Clear' })).toHaveAttribute('data-slot', 'bulk-action-bar-clear-button');

    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(onClear).toHaveBeenCalledTimes(1);
  });
});
