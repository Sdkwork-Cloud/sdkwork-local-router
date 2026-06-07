import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { RestartRequiredNotice } from './RestartRequiredNotice';

describe('RestartRequiredNotice', () => {
  it('renders the shared restart-required warning with standard actions', () => {
    const onDismiss = vi.fn();
    const onRestart = vi.fn();

    render(
      <RestartRequiredNotice
        description="Provider changes require a full desktop relaunch."
        onDismiss={onDismiss}
        onRestart={onRestart}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Later' }));
    fireEvent.click(screen.getByRole('button', { name: 'Restart now' }));

    expect(screen.getByText('Restart required')).toBeInTheDocument();
    expect(screen.getByText('Provider changes require a full desktop relaunch.')).toBeInTheDocument();
    expect(document.querySelector('[data-sdk-pattern="restart-required-notice"]')).toHaveAttribute('data-slot', 'restart-required-notice');
    expect(onDismiss).toHaveBeenCalledTimes(1);
    expect(onRestart).toHaveBeenCalledTimes(1);
  });
});
