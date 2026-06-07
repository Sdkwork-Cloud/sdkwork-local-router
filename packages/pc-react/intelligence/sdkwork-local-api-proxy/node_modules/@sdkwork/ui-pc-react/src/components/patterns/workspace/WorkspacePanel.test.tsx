import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from '../../ui/button';
import { WorkspacePanel } from './WorkspacePanel';

describe('WorkspacePanel', () => {
  it('renders a reusable workspace panel shell with header, actions, and body', () => {
    const { container } = render(
      <WorkspacePanel
        actions={<Button size="sm">Refresh</Button>}
        description="Shared panel shell for desktop workspace regions."
        title="Assets"
      >
        <div>Panel content</div>
      </WorkspacePanel>,
    );

    expect(screen.getByText('Assets')).toBeInTheDocument();
    expect(screen.getByText('Shared panel shell for desktop workspace regions.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Refresh' })).toBeInTheDocument();
    expect(screen.getByText('Panel content')).toBeInTheDocument();
    expect(container.querySelector('[data-sdk-pattern="workspace-panel"]')).toHaveAttribute('data-slot', 'workspace-panel');
    expect(container.querySelector('[data-sdk-region="workspace-panel-header"]')).toHaveAttribute('data-slot', 'workspace-panel-header');
    expect(screen.getByText('Assets')).toHaveAttribute('data-slot', 'workspace-panel-title');
    expect(screen.getByText('Shared panel shell for desktop workspace regions.')).toHaveAttribute('data-slot', 'workspace-panel-description');
    expect(container.querySelector('[data-sdk-region="workspace-panel-body"]')).toHaveAttribute('data-slot', 'workspace-panel-body');
  });
});
