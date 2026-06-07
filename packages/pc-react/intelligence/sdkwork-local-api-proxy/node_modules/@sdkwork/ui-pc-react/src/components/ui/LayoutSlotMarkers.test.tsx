import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Button } from './button';
import { Panel, PanelGroup, PanelResizeHandle } from './layout/panel-group';
import { SidebarSection } from './layout/sidebar-section';
import { StatusBar, StatusBarItem, StatusBarSection } from './layout/status-bar';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarSpacer } from './layout/toolbar';

function queryUi(name: string) {
  return document.body.querySelector(`[data-sdk-ui="${name}"]`);
}

function querySlot(name: string) {
  return document.body.querySelector(`[data-slot="${name}"]`);
}

afterEach(() => {
  cleanup();
});

describe('Layout slot markers', () => {
  it('publishes stable slot markers for layout shell anatomy surfaces', () => {
    render(
      <div>
        <StatusBar>
          <StatusBarSection>
            <StatusBarItem label="Branch" value="main" />
          </StatusBarSection>
        </StatusBar>

        <Toolbar aria-label="Workspace actions">
          <ToolbarGroup>
            <Button size="sm">Filters</Button>
            <ToolbarSeparator />
          </ToolbarGroup>
          <ToolbarSpacer />
          <ToolbarGroup>
            <Button size="sm">Create</Button>
          </ToolbarGroup>
        </Toolbar>

        <SidebarSection
          actions={<button type="button">Manage</button>}
          defaultExpanded
          description="Pinned workspace links."
          title="Favorites"
        >
          <div>Sidebar content</div>
        </SidebarSection>

        <PanelGroup aria-label="Workspace split" direction="horizontal">
          <Panel defaultSize={28}>Navigation</Panel>
          <PanelResizeHandle withHandle />
          <Panel defaultSize={72}>Workspace</Panel>
        </PanelGroup>
      </div>,
    );

    expect(queryUi('status-bar')).toHaveAttribute('data-slot', 'status-bar');
    expect(queryUi('status-bar-section')).toHaveAttribute('data-slot', 'status-bar-section');
    expect(queryUi('status-bar-item')).toHaveAttribute('data-slot', 'status-bar-item');

    expect(queryUi('toolbar')).toHaveAttribute('data-slot', 'toolbar');
    expect(queryUi('toolbar-group')).toHaveAttribute('data-slot', 'toolbar-group');
    expect(queryUi('toolbar-spacer')).toHaveAttribute('data-slot', 'toolbar-spacer');
    expect(queryUi('toolbar-separator')).toHaveAttribute('data-slot', 'toolbar-separator');

    expect(queryUi('sidebar-section')).toHaveAttribute('data-slot', 'sidebar-section');
    expect(querySlot('sidebar-section-header')).toBeInTheDocument();
    expect(querySlot('sidebar-section-trigger')).toBeInTheDocument();
    expect(querySlot('sidebar-section-actions')).toBeInTheDocument();
    expect(querySlot('sidebar-section-content')).toBeInTheDocument();

    expect(queryUi('panel-group')).toHaveAttribute('data-slot', 'panel-group');
    expect(queryUi('panel')).toHaveAttribute('data-slot', 'panel');
    expect(queryUi('panel-resize-handle')).toHaveAttribute('data-slot', 'panel-resize-handle');
    expect(querySlot('panel-resize-handle-grip')).toBeInTheDocument();
  });
});
