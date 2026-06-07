import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { InspectorPanel } from './InspectorPanel';

describe('InspectorPanel', () => {
  it('renders title, body, and footer in a lightweight inspector panel shell', () => {
    const { container } = render(
      <InspectorPanel footer={<button type="button">Apply</button>} title="Inspector">
        <div>Panel body</div>
      </InspectorPanel>,
    );

    expect(screen.getByText('Inspector')).toBeInTheDocument();
    expect(screen.getByText('Panel body')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Apply' })).toBeInTheDocument();
    expect(container.querySelector('[data-sdk-pattern="inspector-panel"]')).toHaveAttribute('data-slot', 'inspector-panel');
    expect(screen.getByText('Inspector').closest('[data-slot="inspector-panel-title"]')).toBeInTheDocument();
    expect(screen.getByText('Panel body').closest('[data-slot="inspector-panel-body"]')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Apply' }).closest('[data-slot="inspector-panel-footer"]')).toBeInTheDocument();
  });
});
