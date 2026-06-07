import { PatternSlotProps } from '../_internal/slot-props';
import { Drawer, DrawerBodyProps, DrawerContentProps, DrawerFooterProps, DrawerHeaderProps } from '../../ui/overlays';
import * as React from 'react';
export type OperationDrawerSide = 'left' | 'right';
export type OperationDrawerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type OperationDrawerSurfaceSlotProps = PatternSlotProps<Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>>;
export type OperationDrawerSidebarSlotProps = PatternSlotProps<Omit<React.ComponentPropsWithoutRef<'aside'>, 'children'>>;
export interface OperationDrawerSlotProps {
    body?: PatternSlotProps<Omit<DrawerBodyProps, 'children'>>;
    content?: PatternSlotProps<Omit<DrawerContentProps, 'children' | 'side' | 'size'>>;
    footer?: PatternSlotProps<Omit<DrawerFooterProps, 'children'>>;
    header?: PatternSlotProps<Omit<DrawerHeaderProps, 'children'>>;
    sidebar?: OperationDrawerSidebarSlotProps;
    surface?: OperationDrawerSurfaceSlotProps;
}
export interface OperationDrawerProps extends React.ComponentPropsWithoutRef<typeof Drawer> {
    actions?: React.ReactNode;
    badge?: React.ReactNode;
    className?: string;
    description?: React.ReactNode;
    eyebrow?: React.ReactNode;
    footer?: React.ReactNode;
    side?: OperationDrawerSide;
    sidebar?: React.ReactNode;
    size?: OperationDrawerSize;
    slotProps?: OperationDrawerSlotProps;
    title: React.ReactNode;
}
declare const OperationDrawer: React.ForwardRefExoticComponent<OperationDrawerProps & React.RefAttributes<HTMLDivElement>>;
export { OperationDrawer };
