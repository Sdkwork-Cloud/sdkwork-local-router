import { SlotProps } from '../../../lib/slot-props';
import * as React from 'react';
export type WorkspaceTabsRegionSlotProps = SlotProps<Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>>;
export type WorkspaceTabsEmptySlotProps = SlotProps<Omit<React.ComponentPropsWithoutRef<'span'>, 'children'>>;
export type WorkspaceTabRootProps = SlotProps<Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>>;
export type WorkspaceTabTriggerSlotProps = SlotProps<Omit<React.ComponentPropsWithoutRef<'button'>, 'children'>>;
export type WorkspaceTabIndicatorSlotProps = SlotProps<Omit<React.ComponentPropsWithoutRef<'span'>, 'children'>>;
export interface WorkspaceTabItem {
    closeLabel?: string;
    disabled?: boolean;
    icon?: React.ReactNode;
    id: string;
    label: React.ReactNode;
    meta?: React.ReactNode;
    modified?: boolean;
}
export interface WorkspaceTabCollectionItemState {
    index: number;
    item: WorkspaceTabItem;
    selected: boolean;
}
export type WorkspaceTabPropsResolver = (state: WorkspaceTabCollectionItemState) => WorkspaceTabRootProps | undefined;
export type WorkspaceTabSlotPropsResolver = (state: WorkspaceTabCollectionItemState) => WorkspaceTabSlotProps | undefined;
export type WorkspaceTabCloseHandler = (id: string) => void;
export type WorkspaceTabValueChangeHandler = (id: string) => void;
export interface WorkspaceTabSlotProps {
    closeButton?: WorkspaceTabTriggerSlotProps;
    icon?: WorkspaceTabIndicatorSlotProps;
    label?: WorkspaceTabIndicatorSlotProps;
    meta?: WorkspaceTabIndicatorSlotProps;
    modifiedIndicator?: WorkspaceTabIndicatorSlotProps;
    trigger?: WorkspaceTabTriggerSlotProps;
}
export interface WorkspaceTabsSlotProps {
    actions?: WorkspaceTabsRegionSlotProps;
    empty?: WorkspaceTabsEmptySlotProps;
    tabList?: WorkspaceTabsRegionSlotProps;
}
export interface WorkspaceTabsProps extends React.HTMLAttributes<HTMLDivElement> {
    actions?: React.ReactNode;
    emptyState?: React.ReactNode;
    getItemProps?: WorkspaceTabPropsResolver;
    getItemSlotProps?: WorkspaceTabSlotPropsResolver;
    items: WorkspaceTabItem[];
    onCloseTab?: WorkspaceTabCloseHandler;
    onValueChange?: WorkspaceTabValueChangeHandler;
    slotProps?: WorkspaceTabsSlotProps;
    value?: string | null;
}
export interface WorkspaceTabProps extends React.HTMLAttributes<HTMLDivElement> {
    item: WorkspaceTabItem;
    onCloseTab?: WorkspaceTabCloseHandler;
    onValueChange?: WorkspaceTabValueChangeHandler;
    selected?: boolean;
    slotProps?: WorkspaceTabSlotProps;
}
declare const WorkspaceTab: React.ForwardRefExoticComponent<WorkspaceTabProps & React.RefAttributes<HTMLDivElement>>;
declare const WorkspaceTabs: React.ForwardRefExoticComponent<WorkspaceTabsProps & React.RefAttributes<HTMLDivElement>>;
export { WorkspaceTab, WorkspaceTabs };
