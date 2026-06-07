import { SlotProps } from '../../../lib/slot-props';
import * as React from 'react';
export type TagInputValueChangeHandler = (value: string[]) => void;
export type TagInputRootSlotProps = SlotProps<Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>>;
export type TagInputTagSlotProps = SlotProps<Omit<React.ComponentPropsWithoutRef<'span'>, 'children'>>;
export type TagInputRemoveButtonSlotProps = SlotProps<Omit<React.ComponentPropsWithoutRef<'button'>, 'children'>>;
export interface TagInputSlotProps {
    root?: TagInputRootSlotProps;
    removeButton?: TagInputRemoveButtonSlotProps;
    tag?: TagInputTagSlotProps;
}
export interface TagInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'defaultValue' | 'value'> {
    allowDuplicates?: boolean;
    defaultValue?: string[];
    maxTags?: number;
    onValueChange?: TagInputValueChangeHandler;
    slotProps?: TagInputSlotProps;
    value?: string[];
}
declare const TagInput: React.ForwardRefExoticComponent<TagInputProps & React.RefAttributes<HTMLInputElement>>;
export { TagInput };
