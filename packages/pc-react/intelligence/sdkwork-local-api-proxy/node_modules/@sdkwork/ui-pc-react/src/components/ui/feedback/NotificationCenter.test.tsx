import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { NotificationCenter } from './index';

describe('NotificationCenter', () => {
  it('renders unread notifications and exposes panel actions', () => {
    const onClear = vi.fn();
    const onItemSelect = vi.fn();
    const onMarkAllAsRead = vi.fn();

    render(
      <NotificationCenter
        items={[
          {
            actionHref: 'https://example.com/build/1',
            content: 'Workspace build completed successfully.',
            id: '1',
            timeLabel: 'just now',
            title: 'Build finished',
            tone: 'success',
            unread: true,
          },
        ]}
        onClear={onClear}
        onItemSelect={onItemSelect}
        onMarkAllAsRead={onMarkAllAsRead}
      />,
    );

    expect(document.body.querySelector('[data-sdk-ui="notification-center"]')).toHaveAttribute('data-slot', 'notification-center');
    expect(document.body.querySelector('[data-slot="notification-center-header"]')).toBeInTheDocument();
    expect(screen.getByText('Notifications')).toHaveAttribute('data-slot', 'notification-center-title');
    expect(document.body.querySelector('[data-slot="notification-center-header-actions"]')).toBeInTheDocument();
    expect(document.body.querySelector('[data-slot="notification-center-viewport"]')).toBeInTheDocument();
    expect(document.body.querySelector('[data-slot="notification-center-list"]')).toBeInTheDocument();
    expect(screen.getByText('Build finished').closest('[data-sdk-ui="notification-center-item"]')).toHaveAttribute('data-slot', 'notification-center-item');
    expect(document.body.querySelector('[data-slot="notification-center-item-unread-indicator"]')).toBeInTheDocument();
    expect(document.body.querySelector('[data-slot="notification-center-item-icon"]')).toBeInTheDocument();
    expect(screen.getByText('Build finished')).toHaveAttribute('data-slot', 'notification-center-item-title');
    expect(screen.getByText('just now')).toHaveAttribute('data-slot', 'notification-center-item-time-label');
    expect(screen.getByText('Workspace build completed successfully.')).toHaveAttribute('data-slot', 'notification-center-item-description');
    expect(screen.getByRole('link', { name: 'View details' })).toHaveAttribute('data-slot', 'notification-center-item-action');

    fireEvent.click(screen.getByRole('button', { name: 'Mark all as read' }));
    expect(onMarkAllAsRead).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText('Build finished'));
    expect(onItemSelect).toHaveBeenCalledWith('1');

    fireEvent.click(screen.getByRole('button', { name: 'Clear notifications' }));
    expect(onClear).toHaveBeenCalledTimes(1);
  });
});
