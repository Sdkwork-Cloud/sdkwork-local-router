import { PatternSlotProps } from '../_internal/slot-props';
import * as React from 'react';
export type InspectorRailRegionSlotProps = PatternSlotProps<Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>>;
export interface InspectorRailSlotProps {
    body?: InspectorRailRegionSlotProps;
    footer?: InspectorRailRegionSlotProps;
    header?: InspectorRailRegionSlotProps;
}
export type InspectorRailSide = 'left' | 'right';
export type InspectorRailVariant = 'docked' | 'sticky' | 'drawer';
export type InspectorRailMetricTone = 'default' | 'success' | 'warning' | 'danger';
export interface InspectorRailProps extends Omit<React.ComponentPropsWithoutRef<'aside'>, 'title'> {
    actions?: React.ReactNode;
    description?: React.ReactNode;
    eyebrow?: React.ReactNode;
    footer?: React.ReactNode;
    meta?: React.ReactNode;
    side?: InspectorRailSide;
    slotProps?: InspectorRailSlotProps;
    stickyHeader?: boolean;
    summary?: React.ReactNode;
    title?: React.ReactNode;
    variant?: InspectorRailVariant;
}
export interface InspectorRailSectionProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
    actions?: React.ReactNode;
    description?: React.ReactNode;
    title?: React.ReactNode;
}
export interface InspectorRailMetricsProps extends React.HTMLAttributes<HTMLDivElement> {
    columns?: 1 | 2 | 3;
}
export interface InspectorRailMetricProps extends React.HTMLAttributes<HTMLDivElement> {
    helper?: React.ReactNode;
    label: React.ReactNode;
    tone?: InspectorRailMetricTone;
    value: React.ReactNode;
}
export declare const InspectorRail: React.ForwardRefExoticComponent<InspectorRailProps & React.RefAttributes<HTMLElement>>;
export declare const InspectorRailSection: React.ForwardRefExoticComponent<InspectorRailSectionProps & React.RefAttributes<HTMLElement>>;
export declare const InspectorRailMetrics: React.ForwardRefExoticComponent<InspectorRailMetricsProps & React.RefAttributes<HTMLDivElement>>;
export declare const InspectorRailMetric: React.ForwardRefExoticComponent<InspectorRailMetricProps & React.RefAttributes<HTMLDivElement>>;
