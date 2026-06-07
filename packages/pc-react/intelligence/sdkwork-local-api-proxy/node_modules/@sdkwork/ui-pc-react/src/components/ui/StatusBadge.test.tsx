import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StatusBadge } from './status-badge';

describe('StatusBadge', () => {
  it('maps shared business status text into semantic SDKWORK tones', () => {
    render(<StatusBadge showIcon status="active" />);

    const badge = screen.getByText('active').closest('div');

    expect(badge).toBeInTheDocument();
    expect(badge).toHaveAttribute('data-variant', 'success');
    expect(badge).toHaveAttribute('data-slot', 'status-badge');
    expect(document.body.querySelector('[data-slot="status-badge-icon"]')).toBeInTheDocument();
    expect(screen.getByText('active')).toHaveAttribute('data-slot', 'status-badge-label');
  });
});
