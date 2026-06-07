import { PatternSlotProps } from '../_internal/slot-props';
import { Modal, ModalContentProps, ModalFooterProps, ModalHeaderProps } from '../../ui/overlays';
import * as React from 'react';
export type PickerDialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type PickerDialogRegionSlotProps = PatternSlotProps<Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>>;
export type PickerDialogSidebarSlotProps = PatternSlotProps<Omit<React.ComponentPropsWithoutRef<'aside'>, 'children'>>;
export type PickerDialogSurfaceSlotProps = PatternSlotProps<Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>>;
export interface PickerDialogSlotProps {
    body?: PickerDialogRegionSlotProps;
    content?: PatternSlotProps<Omit<ModalContentProps, 'align' | 'children' | 'size'>>;
    filters?: PickerDialogRegionSlotProps;
    footer?: PatternSlotProps<Omit<ModalFooterProps, 'children'>>;
    header?: PatternSlotProps<Omit<ModalHeaderProps, 'children'>>;
    sidebar?: PickerDialogSidebarSlotProps;
    surface?: PickerDialogSurfaceSlotProps;
}
export interface PickerDialogProps extends React.ComponentPropsWithoutRef<typeof Modal> {
    actions?: React.ReactNode;
    badge?: React.ReactNode;
    className?: string;
    description?: React.ReactNode;
    empty?: boolean;
    emptyAction?: React.ReactNode;
    emptyDescription?: React.ReactNode;
    emptyKeyword?: React.ReactNode;
    emptyTitle?: React.ReactNode;
    error?: React.ReactNode;
    errorTitle?: React.ReactNode;
    filters?: React.ReactNode;
    footer?: React.ReactNode;
    loading?: boolean;
    loadingLabel?: React.ReactNode;
    resultsSummary?: React.ReactNode;
    sidebar?: React.ReactNode;
    size?: PickerDialogSize;
    slotProps?: PickerDialogSlotProps;
    title: React.ReactNode;
}
declare const PickerDialog: React.ForwardRefExoticComponent<PickerDialogProps & React.RefAttributes<HTMLDivElement>>;
export { PickerDialog };
