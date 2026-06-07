import { PatternSlotProps } from '../_internal/slot-props';
import * as React from 'react';
export type WorkspacePanelSectionSlotProps = PatternSlotProps<Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>>;
export interface WorkspacePanelSlotProps {
    body?: WorkspacePanelSectionSlotProps;
    header?: WorkspacePanelSectionSlotProps;
}
export interface WorkspacePanelProps extends Omit<React.ComponentPropsWithoutRef<'section'>, 'title'> {
    actions?: React.ReactNode;
    description?: React.ReactNode;
    slotProps?: WorkspacePanelSlotProps;
    title?: React.ReactNode;
}
export declare const WorkspacePanel: React.ForwardRefExoticComponent<WorkspacePanelProps & React.RefAttributes<HTMLElement>>;
