import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { OperationDrawer } from './OperationDrawer';

describe('OperationDrawer', () => {
  it('renders a reusable operation drawer shell with badge, actions, sidebar, and footer', () => {
    render(
      <OperationDrawer
        actions={<button type="button">Duplicate</button>}
        badge={<span>Draft</span>}
        description="Shared desktop work surface for edit and review flows."
        eyebrow="Provider"
        footer={<button type="button">Save changes</button>}
        open
        sidebar={<div>Sidebar summary</div>}
        title="Edit provider"
      >
        <div>Main form content</div>
      </OperationDrawer>,
    );

    const dialog = screen.getByRole('dialog');

    expect(dialog).toHaveClass('w-[min(92vw,48rem)]');
    expect(screen.getByText('Provider')).toBeInTheDocument();
    expect(screen.getByText('Edit provider')).toBeInTheDocument();
    expect(screen.getByText('Draft')).toBeInTheDocument();
    expect(screen.getByText('Shared desktop work surface for edit and review flows.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Duplicate' })).toBeInTheDocument();
    expect(screen.getByText('Main form content')).toBeInTheDocument();
    expect(screen.getByText('Sidebar summary')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save changes' })).toBeInTheDocument();
    expect(document.querySelector('[data-sdk-pattern="operation-drawer"]')).toHaveAttribute('data-slot', 'operation-drawer');
    expect(document.querySelector('[data-sdk-region="operation-drawer-content"]')).toHaveAttribute('data-slot', 'operation-drawer-content');
    expect(document.querySelector('[data-sdk-region="operation-drawer-surface"]')).toHaveAttribute('data-slot', 'operation-drawer-surface');
    expect(document.querySelector('[data-sdk-region="operation-drawer-header"]')).toHaveAttribute('data-slot', 'operation-drawer-header');
    expect(document.querySelector('[data-sdk-region="operation-drawer-body"]')).toHaveAttribute('data-slot', 'operation-drawer-body');
    expect(document.querySelector('[data-sdk-region="operation-drawer-sidebar"]')).toHaveAttribute('data-slot', 'operation-drawer-sidebar');
    expect(document.querySelector('[data-sdk-region="operation-drawer-footer"]')).toHaveAttribute('data-slot', 'operation-drawer-footer');
    expect(screen.getByText('Provider')).toHaveAttribute('data-slot', 'operation-drawer-eyebrow');
    expect(screen.getByText('Edit provider')).toHaveAttribute('data-slot', 'operation-drawer-title');
    expect(screen.getByText('Shared desktop work surface for edit and review flows.')).toHaveAttribute('data-slot', 'operation-drawer-description');
  });

  it('routes the shared close affordance through the Radix open-state callback', () => {
    const handleOpenChange = vi.fn();

    render(
      <OperationDrawer
        onOpenChange={handleOpenChange}
        open
        title="Operation drawer"
      >
        <div>Body</div>
      </OperationDrawer>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Close' }));

    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it('does not emit a Radix description warning when the optional description is omitted', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    render(
      <OperationDrawer
        open
        title="Operation drawer"
      >
        <div>Body</div>
      </OperationDrawer>,
    );

    const consoleOutput = [...warnSpy.mock.calls.flat(), ...errorSpy.mock.calls.flat()].join(' ');

    expect(consoleOutput).not.toContain('Missing `Description`');

    warnSpy.mockRestore();
    errorSpy.mockRestore();
  });
});
