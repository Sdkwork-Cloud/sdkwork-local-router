import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { NavigationRail } from './NavigationRail';

describe('NavigationRail', () => {
  it('renders header, navigation content, and footer for app rails', () => {
    const { container } = render(
      <NavigationRail footer={<div>Footer</div>} header={<div>Header</div>}>
        <button type="button">Library</button>
      </NavigationRail>,
    );

    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Library' })).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
    expect(container.querySelector('[data-sdk-pattern="navigation-rail"]')).toHaveAttribute('data-slot', 'navigation-rail');
    expect(screen.getByText('Header').closest('[data-slot="navigation-rail-header"]')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Library' }).closest('[data-slot="navigation-rail-body"]')).toBeInTheDocument();
    expect(screen.getByText('Footer').closest('[data-slot="navigation-rail-footer"]')).toBeInTheDocument();
  });
});
