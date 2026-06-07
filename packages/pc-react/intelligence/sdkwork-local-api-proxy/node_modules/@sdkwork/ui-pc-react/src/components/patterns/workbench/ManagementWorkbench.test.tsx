import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from '../../ui/button';
import { FilterBar, FilterBarActions, FilterBarSection } from '../../ui/form';
import { Input } from '../../ui/input';
import { ManagementWorkbench } from './ManagementWorkbench';

describe('ManagementWorkbench', () => {
  it('renders a reusable list and operations scaffold with filters, selection bar, detail rail, and footer', () => {
    render(
      <ManagementWorkbench
        actions={<Button variant="secondary">Create asset</Button>}
        description="Shared admin and operations desktop scaffold."
        detail={{
          children: <div>Selected asset details</div>,
          footer: <button type="button">Open drawer</button>,
          title: 'Inspector',
        }}
        filters={
          <FilterBar title="Filters">
            <FilterBarSection>
              <Input aria-label="Search assets" placeholder="Search assets" />
            </FilterBarSection>
            <FilterBarActions>
              <Button variant="outline">Reset</Button>
            </FilterBarActions>
          </FilterBar>
        }
        footer={<div>Showing 24 results</div>}
        main={{
          actions: <Button variant="outline">Export</Button>,
          children: <div>Data grid placeholder</div>,
          description: 'Inspect and operate on desktop entities.',
          title: 'Assets',
        }}
        selectionBar={<div>3 rows selected</div>}
        title="Asset operations"
      />,
    );

    expect(screen.getByText('Asset operations')).toBeInTheDocument();
    expect(screen.getByText('Shared admin and operations desktop scaffold.')).toBeInTheDocument();
    expect(screen.getByText('Filters')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search assets')).toBeInTheDocument();
    expect(screen.getByText('3 rows selected')).toBeInTheDocument();
    expect(screen.getByText('Assets')).toBeInTheDocument();
    expect(screen.getByText('Inspect and operate on desktop entities.')).toBeInTheDocument();
    expect(screen.getByText('Data grid placeholder')).toBeInTheDocument();
    expect(screen.getByText('Inspector')).toBeInTheDocument();
    expect(screen.getByText('Selected asset details')).toBeInTheDocument();
    expect(screen.getByText('Showing 24 results')).toBeInTheDocument();
    expect(document.querySelector('[data-sdk-pattern="management-workbench"]')).toHaveAttribute('data-slot', 'management-workbench');
    expect(document.querySelector('[data-sdk-pattern="page-header"]')).toHaveAttribute('data-slot', 'management-workbench-header');
    expect(document.querySelector('[data-sdk-region="management-workbench-filters"]')).toHaveAttribute('data-slot', 'management-workbench-filters');
    expect(document.querySelector('[data-sdk-region="management-workbench-selection-bar"]')).toHaveAttribute('data-slot', 'management-workbench-selection-bar');
    expect(document.querySelector('[data-sdk-region="management-workbench-content"]')).toHaveAttribute('data-slot', 'management-workbench-content');
    expect(document.querySelector('[data-sdk-region="management-workbench-footer"]')).toHaveAttribute('data-slot', 'management-workbench-footer');
  });
});
