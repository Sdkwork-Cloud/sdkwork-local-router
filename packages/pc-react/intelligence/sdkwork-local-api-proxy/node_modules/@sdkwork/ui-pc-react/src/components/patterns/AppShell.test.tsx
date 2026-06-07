import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AppShell } from './AppShell';
import { SDKWORK_DARK_THEME } from '../../theme';

describe('AppShell', () => {
  it('renders standard PC application regions', () => {
    const { container } = render(
      <AppShell
        header={<div>Header</div>}
        sidebar={<div>Sidebar</div>}
        content={<div>Workspace</div>}
        footer={<div>Footer</div>}
      />,
    );

    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Sidebar')).toBeInTheDocument();
    expect(screen.getByText('Workspace')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
    expect(container.firstElementChild).toHaveAttribute('data-slot', 'app-shell');
    expect(container.querySelector('[data-sdk-region="header"]')).toHaveAttribute('data-slot', 'app-shell-header');
    expect(container.querySelector('[data-sdk-region="body"]')).toHaveAttribute('data-slot', 'app-shell-body');
    expect(container.querySelector('[data-sdk-region="sidebar"]')).toHaveAttribute('data-slot', 'app-shell-sidebar');
    expect(container.querySelector('[data-sdk-region="content"]')).toHaveAttribute('data-slot', 'app-shell-content');
    expect(container.querySelector('[data-sdk-region="footer"]')).toHaveAttribute('data-slot', 'app-shell-footer');
  });

  it('applies theme variables and shell data markers to the root element', () => {
    const { container } = render(<AppShell content={<div>Workspace</div>} />);
    const shell = container.firstElementChild;

    expect(shell).toHaveAttribute('data-sdk-shell', 'app');
    expect(shell).toHaveStyle(`--sdk-color-surface-canvas: ${SDKWORK_DARK_THEME.surface.canvas}`);
  });
});
