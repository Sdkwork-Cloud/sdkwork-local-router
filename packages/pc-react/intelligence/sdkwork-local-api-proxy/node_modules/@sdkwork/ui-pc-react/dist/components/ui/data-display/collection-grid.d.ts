import { SlotProps } from '../../../lib/slot-props';
import * as React from 'react';
export type CollectionGridRegionSlotProps = SlotProps<Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>>;
export type CollectionGridItemKeyResolver<T = any> = (item: T, index: number) => React.Key;
export type CollectionGridItemRenderer<T = any> = (item: T, index: number) => React.ReactNode;
export interface CollectionGridSlotProps {
    grid?: CollectionGridRegionSlotProps;
    pagination?: CollectionGridRegionSlotProps;
}
export interface CollectionGridProps<T = any> extends React.HTMLAttributes<HTMLDivElement> {
    emptyActions?: React.ReactNode;
    emptyDescription?: React.ReactNode;
    emptyTitle?: React.ReactNode;
    getItemKey?: CollectionGridItemKeyResolver<T>;
    items: T[];
    loading?: boolean;
    loadingLabel?: React.ReactNode;
    pagination?: React.ReactNode;
    renderItem: CollectionGridItemRenderer<T>;
    slotProps?: CollectionGridSlotProps;
}
type CollectionGridComponent = React.ForwardRefExoticComponent<CollectionGridProps & React.RefAttributes<HTMLDivElement>> & {
    <T = any>(props: CollectionGridProps<T> & React.RefAttributes<HTMLDivElement>): React.ReactNode;
};
declare const CollectionGrid: CollectionGridComponent;
export { CollectionGrid };
