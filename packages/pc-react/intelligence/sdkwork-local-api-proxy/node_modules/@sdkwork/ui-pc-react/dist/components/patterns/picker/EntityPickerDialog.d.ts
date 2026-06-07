import { PatternSlotProps } from '../_internal/slot-props';
import { ButtonProps } from '../../ui/button';
import { PickerDialogProps, PickerDialogSlotProps } from './PickerDialog';
import * as React from 'react';
export type EntityPickerSelectionMode = 'single' | 'multiple';
export type EntityPickerDialogSelectionActionHandler = () => void;
export interface EntityPickerDialogSelectionContext<T> {
    clearSelection: EntityPickerDialogSelectionActionHandler;
    selectedCount: number;
    selectedIds: React.Key[];
    selectedItems: T[];
    selectionMode: EntityPickerSelectionMode;
}
export interface EntityPickerDialogRenderItemContext<T> extends EntityPickerDialogSelectionContext<T> {
    deselect: EntityPickerDialogSelectionActionHandler;
    index: number;
    item: T;
    itemId: React.Key;
    select: EntityPickerDialogSelectionActionHandler;
    selected: boolean;
    toggleSelection: EntityPickerDialogSelectionActionHandler;
}
export type EntityPickerDialogConfirmLabelRenderer<T> = (context: EntityPickerDialogSelectionContext<T>) => React.ReactNode;
export type EntityPickerDialogConfirmHandler<T> = (selectedItems: T[], selectedIds: React.Key[]) => void;
export type EntityPickerDialogItemIdResolver<T> = (item: T, index: number) => React.Key;
export type EntityPickerDialogItemLabelRenderer<T> = (item: T, index: number) => React.ReactNode;
export type EntityPickerDialogItemRenderer<T> = (context: EntityPickerDialogRenderItemContext<T>) => React.ReactNode;
export type EntityPickerDialogSelectedIdsChangeHandler<T> = (selectedIds: React.Key[], selectedItems: T[]) => void;
export type EntityPickerDialogSelectionSummaryRenderer<T> = (context: EntityPickerDialogSelectionContext<T>) => React.ReactNode;
export type EntityPickerDialogRegionSlotProps = PatternSlotProps<Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>>;
export interface EntityPickerDialogSlotProps extends PickerDialogSlotProps {
    items?: EntityPickerDialogRegionSlotProps;
    pagination?: EntityPickerDialogRegionSlotProps;
}
export interface EntityPickerDialogProps<T = any> extends Omit<PickerDialogProps, 'children' | 'empty' | 'footer' | 'slotProps'> {
    cancelLabel?: React.ReactNode;
    clearLabel?: React.ReactNode;
    confirmLabel?: React.ReactNode | EntityPickerDialogConfirmLabelRenderer<T>;
    confirmLoading?: boolean;
    confirmVariant?: ButtonProps['variant'];
    defaultSelectedIds?: React.Key[];
    getItemId?: EntityPickerDialogItemIdResolver<T>;
    getItemLabel?: EntityPickerDialogItemLabelRenderer<T>;
    items: T[];
    layout?: 'grid' | 'list';
    onConfirm?: EntityPickerDialogConfirmHandler<T>;
    onSelectedIdsChange?: EntityPickerDialogSelectedIdsChangeHandler<T>;
    pagination?: React.ReactNode;
    renderItem: EntityPickerDialogItemRenderer<T>;
    selectedIds?: React.Key[];
    selectionMode?: EntityPickerSelectionMode;
    selectionSummary?: React.ReactNode | EntityPickerDialogSelectionSummaryRenderer<T>;
    slotProps?: EntityPickerDialogSlotProps;
}
type EntityPickerDialogComponent = React.ForwardRefExoticComponent<EntityPickerDialogProps & React.RefAttributes<HTMLDivElement>> & {
    <T = any>(props: EntityPickerDialogProps<T> & React.RefAttributes<HTMLDivElement>): React.ReactNode;
};
declare const EntityPickerDialog: EntityPickerDialogComponent;
export { EntityPickerDialog };
