import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PageHeader } from './PageHeader';

describe('PageHeader', () => {
  it('renders eyebrow, title, description, and actions for app pages', () => {
    const { container } = render(
      <PageHeader
        actions={<button type="button">Create</button>}
        description="Shared app page heading shell."
        eyebrow="Workspace"
        title="Assets"
      />,
    );

    expect(screen.getByText('Workspace')).toBeInTheDocument();
    expect(screen.getByText('Assets')).toBeInTheDocument();
    expect(screen.getByText('Shared app page heading shell.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument();
    expect(container.querySelector('[data-sdk-pattern="page-header"]')).toHaveAttribute('data-slot', 'page-header');
    expect(screen.getByText('Workspace')).toHaveAttribute('data-slot', 'page-header-eyebrow');
    expect(screen.getByText('Assets')).toHaveAttribute('data-slot', 'page-header-title');
    expect(screen.getByText('Shared app page heading shell.')).toHaveAttribute('data-slot', 'page-header-description');
  });
});
