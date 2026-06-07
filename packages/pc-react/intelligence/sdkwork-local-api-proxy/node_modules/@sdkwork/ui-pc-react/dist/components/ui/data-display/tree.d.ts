import { SlotProps } from '../../../lib/slot-props';
import { CheckboxProps } from '../checkbox';
import * as React from 'react';
export interface RichTreeItem {
    id: string;
    label: React.ReactNode;
    badge?: React.ReactNode;
    children?: RichTreeItem[];
    description?: React.ReactNode;
    disabled?: boolean;
    endContent?: React.ReactNode;
    hasChildren?: boolean;
    icon?: React.ReactNode;
    loading?: boolean;
}
export interface RichTreeItemState {
    checked: boolean;
    depth: number;
    disabled: boolean;
    expanded: boolean;
    indeterminate: boolean;
    isBranch: boolean;
    isLeaf: boolean;
    loading: boolean;
    selected: boolean;
}
export type RichTreeSelectionMode = 'single' | 'multiple';
export type RichTreeRegionSlotProps = SlotProps<Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>>;
export type RichTreeItemRootProps = SlotProps<Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>>;
export type RichTreeToggleSlotProps = SlotProps<Omit<React.ComponentPropsWithoutRef<'button'>, 'children'>>;
export type RichTreeIconSlotProps = SlotProps<Omit<React.ComponentPropsWithoutRef<'span'>, 'children'>>;
export type RichTreeItemPropsResolver = (item: RichTreeItem, state: RichTreeItemState) => RichTreeItemRootProps | undefined;
export type RichTreeItemSlotPropsResolver = (item: RichTreeItem, state: RichTreeItemState) => RichTreeItemSlotProps | undefined;
export type RichTreeLoadChildrenHandler = (item: RichTreeItem) => Promise<void> | void;
export type RichTreeItemActionsRenderer = (item: RichTreeItem, state: RichTreeItemState) => React.ReactNode;
export type RichTreeItemLabelRenderer = (item: RichTreeItem, state: RichTreeItemState) => React.ReactNode;
export type RichTreeCheckedIdsChangeHandler = (checkedIds: string[]) => void;
export type RichTreeExpandedIdsChangeHandler = (expandedIds: string[]) => void;
export type RichTreeSelectedIdsChangeHandler = (selectedIds: string[]) => void;
export type TreeSelectedIdChangeHandler = (selectedId: string) => void;
export interface RichTreeItemSlotProps {
    actions?: RichTreeRegionSlotProps;
    checkbox?: SlotProps<CheckboxProps>;
    content?: RichTreeRegionSlotProps;
    endContent?: RichTreeRegionSlotProps;
    icon?: RichTreeIconSlotProps;
    toggle?: RichTreeToggleSlotProps;
}
export interface RichTreeSlotProps {
    empty?: RichTreeRegionSlotProps;
    tree?: RichTreeRegionSlotProps;
}
export interface RichTreeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    cascadeCheck?: boolean;
    checkable?: boolean;
    checkedIds?: string[];
    defaultCheckedIds?: string[];
    defaultExpandedIds?: string[];
    defaultSelectedIds?: string[];
    emptyDescription?: React.ReactNode;
    emptyState?: React.ReactNode;
    emptyTitle?: React.ReactNode;
    expandOnSelect?: boolean;
    expandedIds?: string[];
    getItemProps?: RichTreeItemPropsResolver;
    getItemSlotProps?: RichTreeItemSlotPropsResolver;
    items: RichTreeItem[];
    loadChildren?: RichTreeLoadChildrenHandler;
    onCheckedIdsChange?: RichTreeCheckedIdsChangeHandler;
    onExpandedIdsChange?: RichTreeExpandedIdsChangeHandler;
    onSelectedIdsChange?: RichTreeSelectedIdsChangeHandler;
    renderActions?: RichTreeItemActionsRenderer;
    renderLabel?: RichTreeItemLabelRenderer;
    selectedIds?: string[];
    selectionMode?: RichTreeSelectionMode;
    slotProps?: RichTreeSlotProps;
}
export interface TreeProps extends Omit<RichTreeProps, 'items'> {
    data: RichTreeItem[];
    defaultSelectedId?: string | null;
    onSelectedIdChange?: TreeSelectedIdChangeHandler;
    selectedId?: string | null;
}
export type TreeNodeData = RichTreeItem;
declare const RichTree: React.ForwardRefExoticComponent<RichTreeProps & React.RefAttributes<HTMLDivElement>>;
declare function Tree({ data, defaultSelectedId, onSelectedIdChange, onSelectedIdsChange, selectedId, selectedIds, ...props }: TreeProps): import("react/jsx-runtime").JSX.Element;
declare namespace Tree {
    var displayName: string;
}
export { RichTree, Tree };
