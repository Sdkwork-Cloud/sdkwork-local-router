import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StatCard } from './stat-card';

describe('StatCard', () => {
  it('renders desktop metric summaries with label, value, and change text', () => {
    render(
      <StatCard
        change="+12.4%"
        description="Compared with last week"
        icon={<span aria-hidden="true">#</span>}
        label="Active Agents"
        value="128"
      />,
    );

    const root = document.body.querySelector('[data-sdk-ui="stat-card"]');

    expect(root).toBeInTheDocument();
    expect(root).toHaveAttribute('data-slot', 'stat-card');
    expect(document.body.querySelector('[data-slot="stat-card-header"]')).toBeInTheDocument();
    expect(screen.getByText('Active Agents')).toHaveAttribute('data-slot', 'stat-card-label');
    expect(screen.getByText('128')).toHaveAttribute('data-slot', 'stat-card-value');
    expect(document.body.querySelector('[data-slot="stat-card-icon"]')).toBeInTheDocument();
    expect(document.body.querySelector('[data-slot="stat-card-body"]')).toBeInTheDocument();
    expect(screen.getByText('+12.4%')).toHaveAttribute('data-slot', 'stat-card-change');
    expect(screen.getByText('Compared with last week')).toHaveAttribute('data-slot', 'stat-card-description');
  });
});
