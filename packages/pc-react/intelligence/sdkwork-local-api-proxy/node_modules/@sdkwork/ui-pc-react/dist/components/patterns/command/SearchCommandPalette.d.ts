import { PatternSlotProps } from '../_internal/slot-props';
import { CommandDialog, CommandDialogContentProps } from '../../ui/actions';
import * as React from 'react';
export interface SearchCommandPaletteItem {
    description?: React.ReactNode;
    disabled?: boolean;
    icon?: React.ReactNode;
    id: string;
    keywords?: string[];
    label: React.ReactNode;
    shortcut?: React.ReactNode;
    value?: string;
}
export interface SearchCommandPaletteGroup {
    heading?: React.ReactNode;
    id?: string;
    items: SearchCommandPaletteItem[];
}
export type SearchCommandPaletteItemSelectHandler = (item: SearchCommandPaletteItem) => void;
export type SearchCommandPaletteSearchValueChangeHandler = (value: string) => void;
export type SearchCommandPaletteFooterSlotProps = PatternSlotProps<Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>>;
export interface SearchCommandPaletteSlotProps {
    content?: CommandDialogContentProps;
    footer?: SearchCommandPaletteFooterSlotProps;
}
export interface SearchCommandPaletteProps extends Omit<React.ComponentPropsWithoutRef<typeof CommandDialog>, 'children' | 'slotProps'> {
    closeOnSelect?: boolean;
    emptyState?: React.ReactNode;
    footer?: React.ReactNode;
    groups: SearchCommandPaletteGroup[];
    onItemSelect?: SearchCommandPaletteItemSelectHandler;
    onSearchValueChange?: SearchCommandPaletteSearchValueChangeHandler;
    placeholder?: string;
    searchValue?: string;
    slotProps?: SearchCommandPaletteSlotProps;
    title?: React.ReactNode;
}
export declare function SearchCommandPalette({ closeOnSelect, emptyState, footer, groups, onItemSelect, onOpenChange, onSearchValueChange, placeholder, searchValue, slotProps, title, ...props }: SearchCommandPaletteProps): import("react/jsx-runtime").JSX.Element;
export declare namespace SearchCommandPalette {
    var displayName: string;
}
