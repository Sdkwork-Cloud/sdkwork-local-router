import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import {
  DesktopWindowControls,
  type DesktopWindowController,
} from './DesktopWindowControls';

interface TestWindowController extends DesktopWindowController {
  emitMaximized: (value: boolean) => void;
}

function createWindowController(
  overrides: Partial<DesktopWindowController> = {},
): TestWindowController {
  let listener: ((value: boolean) => void) | null = null;

  const controller: DesktopWindowController = {
    closeWindow: vi.fn().mockResolvedValue(undefined),
    getPlatform: vi.fn().mockReturnValue('desktop'),
    isWindowMaximized: vi.fn().mockResolvedValue(false),
    maximizeWindow: vi.fn().mockResolvedValue(undefined),
    minimizeWindow: vi.fn().mockResolvedValue(undefined),
    restoreWindow: vi.fn().mockResolvedValue(undefined),
    subscribeWindowMaximized: vi.fn().mockImplementation(async (next) => {
      listener = next;
      return () => {
        listener = null;
      };
    }),
    ...overrides,
  };

  return {
    ...controller,
    emitMaximized: (value) => {
      listener?.(value);
    },
  };
}

describe('DesktopWindowControls', () => {
  it('renders nothing when the controller is unavailable on desktop', () => {
    const { container } = render(<DesktopWindowControls controller={null} />);

    expect(container.firstChild).toBeNull();
  });

  it('renders nothing on web controllers', () => {
    const controller = createWindowController({
      getPlatform: vi.fn().mockReturnValue('web'),
    });
    const { container } = render(<DesktopWindowControls controller={controller} />);

    expect(container.firstChild).toBeNull();
  });

  it('invokes minimize, maximize, restore, and close actions as window state changes', async () => {
    const controller = createWindowController();

    const { container } = render(<DesktopWindowControls controller={controller} />);

    fireEvent.click(await screen.findByRole('button', { name: 'Minimize window' }));
    fireEvent.click(screen.getByRole('button', { name: 'Maximize window' }));
    fireEvent.click(screen.getByRole('button', { name: 'Close window' }));

    expect(controller.minimizeWindow).toHaveBeenCalledTimes(1);
    expect(controller.maximizeWindow).toHaveBeenCalledTimes(1);
    expect(controller.closeWindow).toHaveBeenCalledTimes(1);

    controller.emitMaximized(true);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Restore window' })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: 'Restore window' }));

    expect(container.querySelector('[data-sdk-pattern="desktop-window-controls"]')).toHaveAttribute('data-slot', 'desktop-window-controls');
    expect(screen.getByRole('button', { name: 'Minimize window' })).toHaveAttribute('data-slot', 'desktop-window-controls-minimize');
    expect(screen.getByRole('button', { name: 'Restore window' })).toHaveAttribute('data-slot', 'desktop-window-controls-maximize');
    expect(screen.getByRole('button', { name: 'Close window' })).toHaveAttribute('data-slot', 'desktop-window-controls-close');
    expect(controller.restoreWindow).toHaveBeenCalledTimes(1);
  });

  it('prefers shell bridge labels over English defaults', async () => {
    const controller = createWindowController();
    const themeModule = await import('../../../theme');
    const SdkworkShellBridgeProvider = (themeModule as Record<string, any>).SdkworkShellBridgeProvider;

    render(
      <SdkworkShellBridgeProvider
        messages={{
          windowControls: {
            close: '关闭窗口',
            maximize: '最大化窗口',
            minimize: '最小化窗口',
            restore: '还原窗口',
          },
        }}
      >
        <DesktopWindowControls controller={controller} />
      </SdkworkShellBridgeProvider>,
    );

    expect(await screen.findByRole('button', { name: '最小化窗口' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '最大化窗口' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '关闭窗口' })).toBeInTheDocument();
  });
});
