import { PatternSlotProps } from '../_internal/slot-props';
import { Drawer, DrawerBodyProps, DrawerContentProps, DrawerFooterProps, DrawerHeaderProps } from '../../ui/overlays';
import * as React from 'react';
export type DetailDrawerSide = 'left' | 'right';
export type DetailDrawerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type DetailDrawerMetricTone = 'default' | 'success' | 'warning' | 'danger';
export interface DetailDrawerSlotProps {
    body?: PatternSlotProps<Omit<DrawerBodyProps, 'children'>>;
    content?: PatternSlotProps<Omit<DrawerContentProps, 'children' | 'side' | 'size'>>;
    footer?: PatternSlotProps<Omit<DrawerFooterProps, 'children'>>;
    header?: PatternSlotProps<Omit<DrawerHeaderProps, 'children'>>;
}
export interface DetailDrawerProps extends React.ComponentPropsWithoutRef<typeof Drawer> {
    actions?: React.ReactNode;
    className?: string;
    description?: React.ReactNode;
    eyebrow?: React.ReactNode;
    footer?: React.ReactNode;
    side?: DetailDrawerSide;
    size?: DetailDrawerSize;
    slotProps?: DetailDrawerSlotProps;
    summary?: React.ReactNode;
    title: React.ReactNode;
}
export interface DetailDrawerSectionProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
    actions?: React.ReactNode;
    description?: React.ReactNode;
    title?: React.ReactNode;
}
export interface DetailDrawerMetricsProps extends React.HTMLAttributes<HTMLDivElement> {
    columns?: 1 | 2 | 3;
}
export interface DetailDrawerMetricProps extends React.HTMLAttributes<HTMLDivElement> {
    helper?: React.ReactNode;
    label: React.ReactNode;
    tone?: DetailDrawerMetricTone;
    value: React.ReactNode;
}
declare const DetailDrawer: React.ForwardRefExoticComponent<DetailDrawerProps & React.RefAttributes<HTMLDivElement>>;
declare const DetailDrawerSection: React.ForwardRefExoticComponent<DetailDrawerSectionProps & React.RefAttributes<HTMLElement>>;
declare const DetailDrawerMetrics: React.ForwardRefExoticComponent<DetailDrawerMetricsProps & React.RefAttributes<HTMLDivElement>>;
declare const DetailDrawerMetric: React.ForwardRefExoticComponent<DetailDrawerMetricProps & React.RefAttributes<HTMLDivElement>>;
export { DetailDrawer, DetailDrawerMetric, DetailDrawerMetrics, DetailDrawerSection };
