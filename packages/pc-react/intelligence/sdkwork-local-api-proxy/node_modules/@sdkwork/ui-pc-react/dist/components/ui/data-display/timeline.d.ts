import { SlotProps } from '../../../lib/slot-props';
import * as React from 'react';
export type TimelineItemStatus = 'default' | 'success' | 'warning' | 'danger' | 'pending' | 'done' | 'current' | 'error';
export interface TimelineItem {
    id?: React.Key;
    title: React.ReactNode;
    description?: React.ReactNode;
    timestamp?: React.ReactNode;
    content?: React.ReactNode;
    icon?: React.ReactNode;
    status?: TimelineItemStatus;
}
export type TimelineItemRootProps = SlotProps<Omit<React.ComponentPropsWithoutRef<'li'>, 'children'>>;
export type TimelineItemRegionSlotProps = SlotProps<Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>>;
export type TimelineItemIndicatorSlotProps = SlotProps<Omit<React.ComponentPropsWithoutRef<'span'>, 'children'>>;
export type TimelineItemPropsResolver = (item: TimelineItem, index: number) => TimelineItemRootProps | undefined;
export type TimelineItemSlotPropsResolver = (item: TimelineItem, index: number) => TimelineItemSlotProps | undefined;
export interface TimelineItemSlotProps {
    connector?: TimelineItemIndicatorSlotProps;
    content?: TimelineItemRegionSlotProps;
    indicator?: TimelineItemIndicatorSlotProps;
}
export interface TimelineProps extends React.OlHTMLAttributes<HTMLOListElement> {
    getItemProps?: TimelineItemPropsResolver;
    getItemSlotProps?: TimelineItemSlotPropsResolver;
    items: TimelineItem[];
}
declare const Timeline: React.ForwardRefExoticComponent<TimelineProps & React.RefAttributes<HTMLOListElement>>;
export { Timeline };
