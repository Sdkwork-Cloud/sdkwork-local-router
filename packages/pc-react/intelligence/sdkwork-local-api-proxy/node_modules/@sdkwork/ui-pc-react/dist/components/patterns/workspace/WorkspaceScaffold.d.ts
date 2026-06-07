import { PatternSlotProps } from '../_internal/slot-props';
import { PanelProps, PanelGroupProps } from '../../ui/layout/panel-group';
import { InspectorRailProps, InspectorRailSlotProps } from './InspectorRail';
import { WorkspacePanelProps, WorkspacePanelSlotProps } from './WorkspacePanel';
import * as React from 'react';
export type WorkspaceScaffoldDirection = NonNullable<PanelGroupProps['direction']>;
interface WorkspaceScaffoldPaneSizing {
    collapsedSize?: PanelProps['collapsedSize'];
    collapsible?: PanelProps['collapsible'];
    defaultSize?: PanelProps['defaultSize'];
    maxSize?: PanelProps['maxSize'];
    minSize?: PanelProps['minSize'];
}
export type WorkspaceScaffoldRegionSlotProps = PatternSlotProps<Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>>;
export type WorkspaceScaffoldPanelSlotProps = Omit<PanelProps, 'children' | 'collapsedSize' | 'collapsible' | 'defaultSize' | 'maxSize' | 'minSize'>;
export type WorkspaceScaffoldPanelGroupSlotProps = Omit<PanelGroupProps, 'children' | 'direction'>;
export interface WorkspaceScaffoldPaneSlotProps extends WorkspacePanelSlotProps {
    panel?: WorkspaceScaffoldPanelSlotProps;
    region?: WorkspaceScaffoldRegionSlotProps;
}
export interface WorkspaceScaffoldInspectorSlotProps extends InspectorRailSlotProps {
    panel?: WorkspaceScaffoldPanelSlotProps;
    region?: WorkspaceScaffoldRegionSlotProps;
}
export interface WorkspaceScaffoldSidebarProps extends WorkspaceScaffoldPaneSizing, Omit<WorkspacePanelProps, 'className' | 'slotProps'> {
    className?: string;
    slotProps?: WorkspaceScaffoldPaneSlotProps;
}
export interface WorkspaceScaffoldMainProps extends WorkspaceScaffoldPaneSizing, Omit<WorkspacePanelProps, 'className' | 'slotProps'> {
    className?: string;
    slotProps?: WorkspaceScaffoldPaneSlotProps;
}
export interface WorkspaceScaffoldBottomProps extends WorkspaceScaffoldPaneSizing, Omit<WorkspacePanelProps, 'className' | 'slotProps'> {
    className?: string;
    slotProps?: WorkspaceScaffoldPaneSlotProps;
}
export interface WorkspaceScaffoldInspectorProps extends WorkspaceScaffoldPaneSizing, Omit<InspectorRailProps, 'className' | 'slotProps'> {
    className?: string;
    slotProps?: WorkspaceScaffoldInspectorSlotProps;
}
export interface WorkspaceScaffoldSlotProps {
    banner?: WorkspaceScaffoldRegionSlotProps;
    bottomGroup?: WorkspaceScaffoldPanelGroupSlotProps;
    header?: WorkspaceScaffoldRegionSlotProps;
    mainGroup?: WorkspaceScaffoldPanelGroupSlotProps;
    mainSplit?: WorkspaceScaffoldRegionSlotProps;
    statusBar?: WorkspaceScaffoldRegionSlotProps;
    toolbar?: WorkspaceScaffoldRegionSlotProps;
}
export interface WorkspaceScaffoldProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'content' | 'title'> {
    banner?: React.ReactNode;
    bottomPanel?: WorkspaceScaffoldBottomProps;
    header?: React.ReactNode;
    inspector?: WorkspaceScaffoldInspectorProps;
    main: WorkspaceScaffoldMainProps;
    resizeHandleMode?: 'line' | 'grip';
    sidebar?: WorkspaceScaffoldSidebarProps;
    slotProps?: WorkspaceScaffoldSlotProps;
    statusBar?: React.ReactNode;
    toolbar?: React.ReactNode;
    workspaceDirection?: WorkspaceScaffoldDirection;
}
export declare const WorkspaceScaffold: React.ForwardRefExoticComponent<WorkspaceScaffoldProps & React.RefAttributes<HTMLDivElement>>;
export {};
