import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from '../../ui/button';
import {
  InspectorRail,
  InspectorRailMetric,
  InspectorRailMetrics,
  InspectorRailSection,
} from './InspectorRail';

describe('InspectorRail', () => {
  it('renders a desktop inspector rail with header, summary, sections, metrics, and footer actions', () => {
    const { container } = render(
      <InspectorRail
        actions={<Button size="sm">Refresh</Button>}
        description="Focused details for the selected record."
        eyebrow="Selection"
        footer={<Button>Apply</Button>}
        meta={<span>2 warnings</span>}
        stickyHeader
        summary="Audit state and editable properties stay together in the same rail."
        title="Asset inspector"
      >
        <InspectorRailMetrics columns={2}>
          <InspectorRailMetric helper="Across selected records" label="Requests" value="128" />
          <InspectorRailMetric label="Health" tone="success" value="Healthy" />
        </InspectorRailMetrics>
        <InspectorRailSection
          actions={<Button size="sm" variant="outline">Open</Button>}
          description="Reusable section shell for properties and actions."
          title="Overview"
        >
          <div>Structured inspector content</div>
        </InspectorRailSection>
      </InspectorRail>,
    );

    expect(screen.getByText('Asset inspector')).toBeInTheDocument();
    expect(screen.getByText('Focused details for the selected record.')).toBeInTheDocument();
    expect(screen.getByText('2 warnings')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Refresh' })).toBeInTheDocument();
    expect(screen.getByText('Requests')).toBeInTheDocument();
    expect(screen.getByText('128')).toBeInTheDocument();
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Structured inspector content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Apply' })).toBeInTheDocument();
    expect(container.querySelector('[data-sdk-pattern="inspector-rail"]')).toHaveAttribute('data-slot', 'inspector-rail');
    expect(container.querySelector('[data-sdk-region="inspector-rail-header"]')).toHaveAttribute('data-slot', 'inspector-rail-header');
    expect(container.querySelector('[data-sdk-region="inspector-rail-body"]')).toHaveAttribute('data-slot', 'inspector-rail-body');
    expect(container.querySelector('[data-sdk-region="inspector-rail-footer"]')).toHaveAttribute('data-slot', 'inspector-rail-footer');
    expect(screen.getByText('Selection')).toHaveAttribute('data-slot', 'inspector-rail-eyebrow');
    expect(screen.getByText('Asset inspector')).toHaveAttribute('data-slot', 'inspector-rail-title');
    expect(screen.getByText('Focused details for the selected record.')).toHaveAttribute('data-slot', 'inspector-rail-description');
    expect(screen.getByText('2 warnings').closest('[data-slot="inspector-rail-meta"]')).toBeInTheDocument();
    expect(screen.getByText('Audit state and editable properties stay together in the same rail.')).toHaveAttribute('data-slot', 'inspector-rail-summary');
    expect(container.querySelector('[data-sdk-pattern="inspector-rail-metrics"]')).toHaveAttribute('data-slot', 'inspector-rail-metrics');
    expect(container.querySelector('[data-sdk-pattern="inspector-rail-metric"]')).toHaveAttribute('data-slot', 'inspector-rail-metric');
    expect(container.querySelector('[data-sdk-pattern="inspector-rail-section"]')).toHaveAttribute('data-slot', 'inspector-rail-section');
  });
});
