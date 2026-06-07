import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from './index';

describe('HoverCard', () => {
  it('renders shared hover detail content for lightweight desktop previews', () => {
    render(
      <HoverCard open>
        <HoverCardTrigger>Agent Planner</HoverCardTrigger>
        <HoverCardContent>Planner agent metadata</HoverCardContent>
      </HoverCard>,
    );

    expect(screen.getByText('Agent Planner')).toHaveAttribute('data-slot', 'hover-card-trigger');
    expect(screen.getByText('Planner agent metadata')).toHaveAttribute('data-slot', 'hover-card-content');
  });
});
