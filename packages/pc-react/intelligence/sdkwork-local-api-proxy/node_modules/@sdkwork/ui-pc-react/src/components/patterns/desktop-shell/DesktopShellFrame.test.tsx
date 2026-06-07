import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { StatusBar, StatusBarItem, StatusBarSection } from '../../ui/layout';
import {
  DesktopShellFrame,
} from './DesktopShellFrame';
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

describe('DesktopShellFrame', () => {
  it('renders a full desktop frame with app header, navigation rail, content, and status bar', async () => {
    const { container } = render(
      <DesktopShellFrame
        actions={<button type="button">Search</button>}
        content={<div>Workspace content</div>}
        navigation={<button type="button">Assets</button>}
        navigationFooter={<button type="button">Settings</button>}
        navigationHeader={<div>SDKWORK</div>}
        statusBar={
          <StatusBar>
            <StatusBarSection>
              <StatusBarItem label="Sync" value="Ready" />
            </StatusBarSection>
          </StatusBar>
        }
        subtitle="Desktop shell"
        title="Sdkwork Studio"
        windowController={createWindowController()}
      />,
    );

    expect(screen.getByText('Sdkwork Studio')).toBeInTheDocument();
    expect(screen.getByText('Desktop shell')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Assets' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Settings' })).toBeInTheDocument();
    expect(screen.getByText('Workspace content')).toBeInTheDocument();
    expect(screen.getByText('Ready')).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: 'Minimize window' })).toBeInTheDocument();
    expect(container.querySelector('[data-sdk-pattern="desktop-shell-frame"]')).toHaveAttribute('data-slot', 'desktop-shell-frame');
    expect(container.querySelector('[data-sdk-shell="app"]')).toHaveAttribute('data-slot', 'desktop-shell-frame-shell');
    expect(container.querySelector('[data-sdk-pattern="desktop-app-header"]')).toHaveAttribute('data-slot', 'desktop-shell-frame-header');
    expect(container.querySelector('[data-sdk-pattern="navigation-rail"]')).toHaveAttribute('data-slot', 'desktop-shell-frame-navigation');
    expect(container.querySelector('[data-sdk-region="desktop-shell-content"]')).toHaveAttribute('data-slot', 'desktop-shell-frame-content');
  });
});
