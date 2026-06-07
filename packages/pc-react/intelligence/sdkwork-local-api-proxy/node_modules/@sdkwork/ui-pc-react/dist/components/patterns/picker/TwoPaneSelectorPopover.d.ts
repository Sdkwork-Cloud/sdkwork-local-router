import { PatternSlotProps } from '../_internal/slot-props';
import { Popover } from '../../ui/popover';
import { AnchoredPickerSurfaceSlotProps } from './AnchoredPickerSurface';
import * as React from 'react';
export interface TwoPaneSelectorSectionEntry<TSection, TItem> {
    items: TItem[];
    section: TSection;
}
export type TwoPaneSelectorPopoverItemActionHandler = () => void;
export type TwoPaneSelectorPopoverSectionActivateHandler = () => void;
export interface TwoPaneSelectorSectionRenderContext<TSection> {
    active: boolean;
    index: number;
    section: TSection;
    sectionId: React.Key;
    setActiveSection: TwoPaneSelectorPopoverSectionActivateHandler;
}
export interface TwoPaneSelectorItemRenderContext<TSection, TItem> {
    activeSection: TSection | undefined;
    close: TwoPaneSelectorPopoverItemActionHandler;
    index: number;
    item: TItem;
    itemId: React.Key;
    section: TSection;
    sectionIndex: number;
    select: TwoPaneSelectorPopoverItemActionHandler;
    selected: boolean;
}
export type TwoPaneSelectorPopoverItemBadgeRenderer<TSection, TItem> = (item: TItem, itemIndex: number, section: TSection, sectionIndex: number) => React.ReactNode;
export type TwoPaneSelectorPopoverItemDescriptionRenderer<TSection, TItem> = (item: TItem, itemIndex: number, section: TSection, sectionIndex: number) => React.ReactNode;
export type TwoPaneSelectorPopoverItemIdResolver<TSection, TItem> = (item: TItem, itemIndex: number, section: TSection, sectionIndex: number) => React.Key;
export type TwoPaneSelectorPopoverItemLabelRenderer<TSection, TItem> = (item: TItem, itemIndex: number, section: TSection, sectionIndex: number) => React.ReactNode;
export type TwoPaneSelectorPopoverSectionDescriptionRenderer<TSection> = (section: TSection, sectionIndex: number) => React.ReactNode;
export type TwoPaneSelectorPopoverSectionIdResolver<TSection> = (section: TSection, sectionIndex: number) => React.Key;
export type TwoPaneSelectorPopoverSectionLabelRenderer<TSection> = (section: TSection, sectionIndex: number) => React.ReactNode;
export type TwoPaneSelectorPopoverItemRenderer<TSection, TItem> = (context: TwoPaneSelectorItemRenderContext<TSection, TItem>) => React.ReactNode;
export type TwoPaneSelectorPopoverSectionRenderer<TSection> = (context: TwoPaneSelectorSectionRenderContext<TSection>) => React.ReactNode;
export type TwoPaneSelectorPopoverActiveSectionIdChangeHandler<TSection> = (sectionId: React.Key | null, section: TSection | undefined) => void;
export type TwoPaneSelectorPopoverValueChangeHandler<TSection, TItem> = (value: React.Key, item: TItem, section: TSection) => void;
export type TwoPaneSelectorPopoverRegionSlotProps = PatternSlotProps<Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>>;
export interface TwoPaneSelectorPopoverSlotProps extends Omit<AnchoredPickerSurfaceSlotProps, 'surface'> {
    items?: TwoPaneSelectorPopoverRegionSlotProps;
    pickerSurface?: NonNullable<AnchoredPickerSurfaceSlotProps['surface']>;
    sections?: TwoPaneSelectorPopoverRegionSlotProps;
    surface?: TwoPaneSelectorPopoverRegionSlotProps;
}
export interface TwoPaneSelectorPopoverProps<TSection = any, TItem = any> extends Omit<React.ComponentPropsWithoutRef<typeof Popover>, 'children'> {
    activeSectionId?: React.Key | null;
    defaultActiveSectionId?: React.Key | null;
    defaultValue?: React.Key | null;
    emptyDescription?: React.ReactNode;
    emptyTitle?: React.ReactNode;
    getItemBadge?: TwoPaneSelectorPopoverItemBadgeRenderer<TSection, TItem>;
    getItemDescription?: TwoPaneSelectorPopoverItemDescriptionRenderer<TSection, TItem>;
    getItemId?: TwoPaneSelectorPopoverItemIdResolver<TSection, TItem>;
    getItemLabel?: TwoPaneSelectorPopoverItemLabelRenderer<TSection, TItem>;
    getSectionDescription?: TwoPaneSelectorPopoverSectionDescriptionRenderer<TSection>;
    getSectionId?: TwoPaneSelectorPopoverSectionIdResolver<TSection>;
    getSectionLabel?: TwoPaneSelectorPopoverSectionLabelRenderer<TSection>;
    itemTitle?: React.ReactNode;
    onActiveSectionIdChange?: TwoPaneSelectorPopoverActiveSectionIdChangeHandler<TSection>;
    onValueChange?: TwoPaneSelectorPopoverValueChangeHandler<TSection, TItem>;
    renderItem?: TwoPaneSelectorPopoverItemRenderer<TSection, TItem>;
    renderSection?: TwoPaneSelectorPopoverSectionRenderer<TSection>;
    sectionTitle?: React.ReactNode;
    sections: Array<TwoPaneSelectorSectionEntry<TSection, TItem>>;
    slotProps?: TwoPaneSelectorPopoverSlotProps;
    trigger: React.ReactElement;
    value?: React.Key | null;
}
type TwoPaneSelectorPopoverComponent = React.ForwardRefExoticComponent<TwoPaneSelectorPopoverProps & React.RefAttributes<HTMLDivElement>> & {
    <TSection = any, TItem = any>(props: TwoPaneSelectorPopoverProps<TSection, TItem> & React.RefAttributes<HTMLDivElement>): React.ReactNode;
};
declare const TwoPaneSelectorPopover: TwoPaneSelectorPopoverComponent;
export { TwoPaneSelectorPopover };
