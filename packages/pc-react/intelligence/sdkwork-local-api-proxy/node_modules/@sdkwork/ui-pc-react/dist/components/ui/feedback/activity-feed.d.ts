import { SlotProps } from '../../../lib/slot-props';
import * as React from 'react';
export type ActivityFeedTone = 'default' | 'info' | 'success' | 'warning' | 'danger';
export interface ActivityFeedEntry {
    actions?: React.ReactNode;
    content?: React.ReactNode;
    description?: React.ReactNode;
    icon?: React.ReactNode;
    id: string;
    meta?: React.ReactNode;
    timestamp?: React.ReactNode;
    title: React.ReactNode;
    tone?: ActivityFeedTone;
    unread?: boolean;
}
export type ActivityFeedRegionSlotProps = SlotProps<Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>>;
export type ActivityFeedListSlotProps = SlotProps<Omit<React.ComponentPropsWithoutRef<'ol'>, 'children'>>;
export type ActivityFeedItemRootProps = SlotProps<Omit<React.ComponentPropsWithoutRef<'div'>, 'children' | 'title'>>;
export type ActivityFeedIndicatorSlotProps = SlotProps<Omit<React.ComponentPropsWithoutRef<'span'>, 'children'>>;
export type ActivityFeedPanelSlotProps = SlotProps<Omit<React.ComponentPropsWithoutRef<'article'>, 'children'>>;
export type ActivityFeedItemPropsResolver = (item: ActivityFeedEntry, index: number) => ActivityFeedItemRootProps | undefined;
export type ActivityFeedItemSlotPropsResolver = (item: ActivityFeedEntry, index: number) => ActivityFeedItemSlotProps | undefined;
export type ActivityFeedItemSelectHandler = (id: string) => void;
export interface ActivityFeedItemSlotProps {
    actions?: ActivityFeedRegionSlotProps;
    connector?: ActivityFeedIndicatorSlotProps;
    indicator?: ActivityFeedIndicatorSlotProps;
    panel?: ActivityFeedPanelSlotProps;
}
export interface ActivityFeedSlotProps {
    empty?: ActivityFeedRegionSlotProps;
    header?: ActivityFeedRegionSlotProps;
    headerActions?: ActivityFeedRegionSlotProps;
    list?: ActivityFeedListSlotProps;
}
export interface ActivityFeedProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
    description?: React.ReactNode;
    emptyDescription?: React.ReactNode;
    emptyTitle?: React.ReactNode;
    getItemProps?: ActivityFeedItemPropsResolver;
    getItemSlotProps?: ActivityFeedItemSlotPropsResolver;
    headerActions?: React.ReactNode;
    items: ActivityFeedEntry[];
    onItemSelect?: ActivityFeedItemSelectHandler;
    slotProps?: ActivityFeedSlotProps;
    title?: React.ReactNode;
}
export interface ActivityFeedItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    item: ActivityFeedEntry;
    onItemSelect?: ActivityFeedItemSelectHandler;
    showConnector?: boolean;
    slotProps?: ActivityFeedItemSlotProps;
}
declare const ActivityFeedItem: React.ForwardRefExoticComponent<ActivityFeedItemProps & React.RefAttributes<HTMLDivElement>>;
declare const ActivityFeed: React.ForwardRefExoticComponent<ActivityFeedProps & React.RefAttributes<HTMLElement>>;
export { ActivityFeed, ActivityFeedItem };
