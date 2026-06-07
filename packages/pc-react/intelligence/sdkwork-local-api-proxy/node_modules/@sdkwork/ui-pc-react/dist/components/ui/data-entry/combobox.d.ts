import { SlotProps } from '../../../lib/slot-props';
import { CommandEmptyProps, CommandGroupProps, CommandInputProps, CommandListProps } from '../actions/command';
import { PopoverContentProps } from '../popover';
import * as React from 'react';
export interface ComboboxOption {
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
    keywords?: string[];
}
export type ComboboxValueChangeHandler = (value: string) => void;
export type ComboboxRootSlotProps = SlotProps<Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>>;
export type ComboboxClearButtonSlotProps = SlotProps<Omit<React.ComponentPropsWithoutRef<'button'>, 'children'>>;
export type ComboboxContentSlotProps = SlotProps<Omit<PopoverContentProps, 'children'>>;
export type ComboboxInputSlotProps = SlotProps<CommandInputProps>;
export type ComboboxListSlotProps = SlotProps<CommandListProps>;
export type ComboboxEmptySlotProps = SlotProps<CommandEmptyProps>;
export type ComboboxGroupSlotProps = SlotProps<CommandGroupProps>;
export interface ComboboxSlotProps {
    clearButton?: ComboboxClearButtonSlotProps;
    content?: ComboboxContentSlotProps;
    empty?: ComboboxEmptySlotProps;
    group?: ComboboxGroupSlotProps;
    input?: ComboboxInputSlotProps;
    list?: ComboboxListSlotProps;
    root?: ComboboxRootSlotProps;
}
export interface ComboboxProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'defaultValue' | 'onChange' | 'value'> {
    clearable?: boolean;
    defaultValue?: string;
    emptyText?: string;
    options: ComboboxOption[];
    onValueChange?: ComboboxValueChangeHandler;
    placeholder?: string;
    searchPlaceholder?: string;
    slotProps?: ComboboxSlotProps;
    value?: string;
}
declare const Combobox: React.ForwardRefExoticComponent<ComboboxProps & React.RefAttributes<HTMLButtonElement>>;
export { Combobox };
