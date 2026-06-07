import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

describe('sdkwork shell bridge provider', () => {
  beforeEach(() => {
    document.documentElement.className = '';
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.removeAttribute('data-sdk-color-mode');
    document.documentElement.removeAttribute('dir');
    document.documentElement.removeAttribute('lang');
    document.documentElement.style.cssText = '';
  });

  afterEach(() => {
    document.documentElement.className = '';
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.removeAttribute('data-sdk-color-mode');
    document.documentElement.removeAttribute('dir');
    document.documentElement.removeAttribute('lang');
    document.documentElement.style.cssText = '';
  });

  it('composes shell bridge theme, locale, direction, and messages into the UI shell context', async () => {
    const themeModule = await import('./index');
    const SdkworkShellBridgeProvider = (themeModule as Record<string, any>).SdkworkShellBridgeProvider;
    const useSdkworkShellBridge = (themeModule as Record<string, any>).useSdkworkShellBridge;

    function Probe() {
      const bridge = useSdkworkShellBridge();

      return (
        <div
          data-dir={bridge.dir}
          data-locale={bridge.locale}
          data-theme-color={bridge.preferences.themeColor}
        >
          {bridge.messages.windowControls.close}
        </div>
      );
    }

    render(
      <SdkworkShellBridgeProvider
        messages={{
          windowControls: {
            close: 'إغلاق النافذة',
          },
        }}
        value={{
          dir: 'rtl',
          locale: 'ar-SA',
          preferences: {
            themeColor: 'tech-blue',
            themeSelection: 'light',
          },
        }}
      >
        <Probe />
      </SdkworkShellBridgeProvider>,
    );

    expect(document.documentElement.getAttribute('data-theme')).toBe('tech-blue');
    expect(document.documentElement.getAttribute('data-sdk-color-mode')).toBe('light');
    expect(document.documentElement.getAttribute('lang')).toBe('ar-SA');
    expect(document.documentElement.getAttribute('dir')).toBe('rtl');
    expect(screen.getByText('إغلاق النافذة')).toHaveAttribute('data-dir', 'rtl');
    expect(screen.getByText('إغلاق النافذة')).toHaveAttribute('data-locale', 'ar-SA');
    expect(screen.getByText('إغلاق النافذة')).toHaveAttribute('data-theme-color', 'tech-blue');
  });
});
