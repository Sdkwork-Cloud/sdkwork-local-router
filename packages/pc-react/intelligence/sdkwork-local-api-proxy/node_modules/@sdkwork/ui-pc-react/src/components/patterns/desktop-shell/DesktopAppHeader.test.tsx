import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DesktopAppHeader } from './DesktopAppHeader';
import type { DesktopWindowController } from './DesktopWindowControls';

function createWindowController(): DesktopWindowController {
  return {
    closeWindow: vi.fn().mockResolvedValue(undefined),
    getPlatform: vi.fn().mockReturnValue('desktop'),
    isWindowMaximized: vi.fn().mockResolvedValue(false),
    maximizeWindow: vi.fn().mockResolvedValue(undefined),
    minimizeWindow: vi.fn().mockResolvedValue(undefined),
    restoreWindow: vi.fn().mockResolvedValue(undefined),
    subscribeWindowMaximized: vi.fn().mockResolvedValue(() => undefined),
  };
}

describe('DesktopAppHeader', () => {
  it('renders shared brand, center content, actions, and desktop controls', async () => {
    const { container } = render(
      <DesktopAppHeader
        actions={<button type="button">Search</button>}
        badge={<span>DEV</span>}
        brandMark={<span aria-hidden="true">M</span>}
        center={<button type="button">Workspace switcher</button>}
        subtitle="Shared shell"
        title="SDKWORK Studio"
        windowController={createWindowController()}
      />,
    );

    expect(screen.getByText('SDKWORK Studio')).toBeInTheDocument();
    expect(screen.getByText('Shared shell')).toBeInTheDocument();
    expect(screen.getByText('DEV')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Workspace switcher' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: 'Minimize window' })).toBeInTheDocument();
    expect(container.querySelector('[data-sdk-pattern="desktop-app-header"]')).toHaveAttribute('data-slot', 'desktop-app-header');
    expect(container.querySelector('[data-sdk-pattern="desktop-title-bar"]')).toHaveAttribute('data-slot', 'desktop-app-header-bar');
    expect(container.querySelector('[data-sdk-region="desktop-app-header-brand"]')).toHaveAttribute('data-slot', 'desktop-app-header-brand');
    expect(container.querySelector('[data-sdk-region="desktop-app-header-title"]')).toHaveAttribute('data-slot', 'desktop-app-header-title');
    expect(container.querySelector('[data-sdk-region="desktop-app-header-subtitle"]')).toHaveAttribute('data-slot', 'desktop-app-header-subtitle');
  });
});
