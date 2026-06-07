import { PatternSlotProps } from '../_internal/slot-props';
import { PanelProps, PanelGroupProps } from '../../ui/layout/panel-group';
import { InspectorRailProps, InspectorRailSlotProps } from './InspectorRail';
import { WorkspacePanelProps, WorkspacePanelSlotProps } from './WorkspacePanel';
import * as React from 'react';
export type ListDetailWorkspaceDirection = NonNullable<PanelGroupProps['direction']>;
export type ListDetailWorkspaceRegionSlotProps = PatternSlotProps<Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>>;
export type ListDetailWorkspacePanelSlotProps = Omit<PanelProps, 'children' | 'collapsedSize' | 'collapsible' | 'defaultSize' | 'maxSize' | 'minSize'>;
export type ListDetailWorkspaceGroupSlotProps = Omit<PanelGroupProps, 'children' | 'direction'>;
interface ListDetailWorkspacePaneSizing {
    collapsedSize?: PanelProps['collapsedSize'];
    collapsible?: PanelProps['collapsible'];
    defaultSize?: PanelProps['defaultSize'];
    maxSize?: PanelProps['maxSize'];
    minSize?: PanelProps['minSize'];
}
export interface ListDetailWorkspacePaneSlotProps extends WorkspacePanelSlotProps {
    panel?: ListDetailWorkspacePanelSlotProps;
    region?: ListDetailWorkspaceRegionSlotProps;
}
export interface ListDetailWorkspaceDetailSlotProps extends InspectorRailSlotProps {
    panel?: ListDetailWorkspacePanelSlotProps;
    region?: ListDetailWorkspaceRegionSlotProps;
}
export interface ListDetailWorkspaceSidebarProps extends ListDetailWorkspacePaneSizing, Omit<WorkspacePanelProps, 'className' | 'slotProps'> {
    className?: string;
    slotProps?: ListDetailWorkspacePaneSlotProps;
}
export interface ListDetailWorkspaceContentProps extends ListDetailWorkspacePaneSizing, Omit<WorkspacePanelProps, 'className' | 'slotProps'> {
    className?: string;
    slotProps?: ListDetailWorkspacePaneSlotProps;
}
export interface ListDetailWorkspaceDetailProps extends ListDetailWorkspacePaneSizing, Omit<InspectorRailProps, 'className' | 'slotProps'> {
    className?: string;
    slotProps?: ListDetailWorkspaceDetailSlotProps;
}
export interface ListDetailWorkspaceSlotProps {
    panelGroup?: ListDetailWorkspaceGroupSlotProps;
}
export interface ListDetailWorkspaceProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'content'> {
    content: ListDetailWorkspaceContentProps;
    detail?: ListDetailWorkspaceDetailProps;
    direction?: ListDetailWorkspaceDirection;
    resizeHandleMode?: 'line' | 'grip';
    sidebar?: ListDetailWorkspaceSidebarProps;
    slotProps?: ListDetailWorkspaceSlotProps;
}
export declare const ListDetailWorkspace: React.ForwardRefExoticComponent<ListDetailWorkspaceProps & React.RefAttributes<HTMLDivElement>>;
export {};
