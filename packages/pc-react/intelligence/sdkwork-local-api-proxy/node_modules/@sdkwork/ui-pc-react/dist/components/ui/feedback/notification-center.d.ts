import { SlotProps } from '../../../lib/slot-props';
import * as React from 'react';
export type NotificationCenterTone = 'default' | 'info' | 'success' | 'warning' | 'danger';
export type NotificationCenterRegionSlotProps = SlotProps<Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>>;
export type NotificationCenterListSlotProps = SlotProps<Omit<React.ComponentPropsWithoutRef<'ol'>, 'children'>>;
export type NotificationCenterItemRootProps = SlotProps<Omit<React.ComponentPropsWithoutRef<'article'>, 'children' | 'title'>>;
export type NotificationCenterItemLinkSlotProps = SlotProps<Omit<React.ComponentPropsWithoutRef<'a'>, 'children'>>;
export type NotificationCenterItemIconSlotProps = SlotProps<Omit<React.ComponentPropsWithoutRef<'svg'>, 'children'>>;
export type NotificationCenterItemIndicatorSlotProps = SlotProps<Omit<React.ComponentPropsWithoutRef<'span'>, 'children'>>;
export type NotificationCenterItemPropsResolver = (item: NotificationCenterEntry, index: number) => NotificationCenterItemRootProps | undefined;
export type NotificationCenterItemSlotPropsResolver = (item: NotificationCenterEntry, index: number) => NotificationCenterItemSlotProps | undefined;
export type NotificationCenterClearHandler = () => void;
export type NotificationCenterItemSelectHandler = (id: string) => void;
export type NotificationCenterMarkAllAsReadHandler = () => void;
export interface NotificationCenterEntry {
    actionHref?: string;
    actionLabel?: string;
    actionTarget?: React.HTMLAttributeAnchorTarget;
    content: React.ReactNode;
    id: string;
    timeLabel?: React.ReactNode;
    title: React.ReactNode;
    tone?: NotificationCenterTone;
    unread?: boolean;
}
export interface NotificationCenterItemSlotProps {
    action?: NotificationCenterItemLinkSlotProps;
    body?: NotificationCenterRegionSlotProps;
    description?: NotificationCenterRegionSlotProps;
    icon?: NotificationCenterItemIconSlotProps;
    timeLabel?: NotificationCenterRegionSlotProps;
    title?: NotificationCenterRegionSlotProps;
    unreadIndicator?: NotificationCenterItemIndicatorSlotProps;
}
export interface NotificationCenterSlotProps {
    empty?: NotificationCenterRegionSlotProps;
    header?: NotificationCenterRegionSlotProps;
    headerActions?: NotificationCenterRegionSlotProps;
    list?: NotificationCenterListSlotProps;
    viewport?: NotificationCenterRegionSlotProps;
}
export interface NotificationCenterProps extends Omit<React.ComponentPropsWithoutRef<'section'>, 'title'> {
    clearLabel?: string;
    emptyDescription?: React.ReactNode;
    emptyTitle?: React.ReactNode;
    getItemProps?: NotificationCenterItemPropsResolver;
    getItemSlotProps?: NotificationCenterItemSlotPropsResolver;
    items: NotificationCenterEntry[];
    markAllAsReadLabel?: string;
    onClear?: NotificationCenterClearHandler;
    onItemSelect?: NotificationCenterItemSelectHandler;
    onMarkAllAsRead?: NotificationCenterMarkAllAsReadHandler;
    slotProps?: NotificationCenterSlotProps;
    title?: React.ReactNode;
}
export interface NotificationCenterItemProps extends Omit<React.ComponentPropsWithoutRef<'article'>, 'title'> {
    item: NotificationCenterEntry;
    onItemSelect?: NotificationCenterItemSelectHandler;
    slotProps?: NotificationCenterItemSlotProps;
}
declare const NotificationCenterItem: React.ForwardRefExoticComponent<NotificationCenterItemProps & React.RefAttributes<HTMLElement>>;
declare const NotificationCenter: React.ForwardRefExoticComponent<NotificationCenterProps & React.RefAttributes<HTMLElement>>;
export { NotificationCenter, NotificationCenterItem };
