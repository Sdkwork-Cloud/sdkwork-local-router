import { PatternSlotProps } from '../_internal/slot-props';
import { InspectorRailProps } from '../workspace/InspectorRail';
import { WorkspacePanelProps } from '../workspace/WorkspacePanel';
import * as React from 'react';
export interface ManagementWorkbenchMainProps extends Omit<WorkspacePanelProps, 'className'> {
    className?: string;
}
export interface ManagementWorkbenchDetailProps extends Omit<InspectorRailProps, 'className'> {
    className?: string;
}
export type ManagementWorkbenchRegionSlotProps = PatternSlotProps<Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>>;
export type ManagementWorkbenchMainRootProps = PatternSlotProps<Omit<React.ComponentPropsWithoutRef<'section'>, 'children'>>;
export interface ManagementWorkbenchSlotProps {
    content?: ManagementWorkbenchRegionSlotProps;
    filters?: ManagementWorkbenchRegionSlotProps;
    footer?: ManagementWorkbenchRegionSlotProps;
    header?: PatternSlotProps<Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>>;
    main?: ManagementWorkbenchMainRootProps;
    selectionBar?: ManagementWorkbenchRegionSlotProps;
}
export interface ManagementWorkbenchProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'title'> {
    actions?: React.ReactNode;
    description?: React.ReactNode;
    detail?: ManagementWorkbenchDetailProps;
    detailWidth?: number | string;
    eyebrow?: React.ReactNode;
    filters?: React.ReactNode;
    footer?: React.ReactNode;
    main: ManagementWorkbenchMainProps;
    selectionBar?: React.ReactNode;
    slotProps?: ManagementWorkbenchSlotProps;
    title: React.ReactNode;
}
export declare const ManagementWorkbench: React.ForwardRefExoticComponent<ManagementWorkbenchProps & React.RefAttributes<HTMLDivElement>>;
