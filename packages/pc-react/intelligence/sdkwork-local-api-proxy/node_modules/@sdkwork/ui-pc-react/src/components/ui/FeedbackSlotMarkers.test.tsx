import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Button } from './button';
import { EmptySearch } from './feedback/empty-search';
import { InlineAlert } from './feedback/inline-alert';
import { EmptyState, LoadingBlock, StatusNotice } from './feedback/states';

function queryUi(name: string) {
  return document.body.querySelector(`[data-sdk-ui="${name}"]`);
}

function querySlot(name: string) {
  return document.body.querySelector(`[data-slot="${name}"]`);
}

afterEach(() => {
  cleanup();
});

describe('Feedback slot markers', () => {
  it('publishes stable slot markers for feedback shell anatomy surfaces', () => {
    render(
      <div>
        <EmptySearch keyword="invoice" onClear={() => undefined} />
        <InlineAlert
          actions={<Button size="sm">Resolve</Button>}
          description="Capacity is almost full."
          title="Storage warning"
          tone="warning"
        />
        <EmptyState
          actions={<Button size="sm">Create item</Button>}
          description="Nothing has been created yet."
          title="No items"
        />
        <LoadingBlock label="Syncing..." />
        <StatusNotice title="Heads up" tone="warning">
          Background sync is paused.
        </StatusNotice>
      </div>,
    );

    expect(queryUi('empty-search')).toHaveAttribute('data-slot', 'empty-search');
    expect(querySlot('empty-search-icon')).toBeInTheDocument();
    expect(screen.getByText('No results found for "invoice"').closest('[data-slot="empty-search-title"]')).toBeInTheDocument();
    expect(screen.getByText('Try a different keyword or clear the current search.').closest('[data-slot="empty-search-description"]')).toBeInTheDocument();
    expect(querySlot('empty-search-actions')).toBeInTheDocument();

    expect(queryUi('inline-alert')).toHaveAttribute('data-slot', 'inline-alert');
    expect(querySlot('inline-alert-icon')).toBeInTheDocument();
    expect(screen.getByText('Storage warning').closest('[data-slot="inline-alert-title"]')).toBeInTheDocument();
    expect(screen.getByText('Capacity is almost full.').closest('[data-slot="inline-alert-description"]')).toBeInTheDocument();
    expect(querySlot('inline-alert-actions')).toBeInTheDocument();

    expect(queryUi('empty-state')).toHaveAttribute('data-slot', 'empty-state');
    expect(screen.getByText('No items').closest('[data-slot="empty-state-title"]')).toBeInTheDocument();
    expect(screen.getByText('Nothing has been created yet.').closest('[data-slot="empty-state-description"]')).toBeInTheDocument();
    expect(querySlot('empty-state-actions')).toBeInTheDocument();

    expect(queryUi('loading-block')).toHaveAttribute('data-slot', 'loading-block');
    expect(querySlot('loading-block-indicator')).toBeInTheDocument();
    expect(screen.getByText('Syncing...').closest('[data-slot="loading-block-label"]')).toBeInTheDocument();

    expect(queryUi('status-notice')).toHaveAttribute('data-slot', 'status-notice');
    expect(screen.getByText('Heads up').closest('[data-slot="status-notice-title"]')).toBeInTheDocument();
    expect(screen.getByText('Background sync is paused.').closest('[data-slot="status-notice-body"]')).toBeInTheDocument();
  });
});
