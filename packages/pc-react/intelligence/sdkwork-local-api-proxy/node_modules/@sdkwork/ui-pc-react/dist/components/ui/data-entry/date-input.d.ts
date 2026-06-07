import { SlotProps } from '../../../lib/slot-props';
import { InputProps } from '../input';
import * as React from 'react';
export type TemporalInputType = 'date' | 'datetime-local';
export type DateInputRootSlotProps = SlotProps<Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>>;
export type DateInputCalendarButtonSlotProps = SlotProps<Omit<DateInputCalendarButtonProps, 'children'>>;
export interface DateInputSlotProps {
    calendarButton?: DateInputCalendarButtonSlotProps;
    root?: DateInputRootSlotProps;
}
export interface DateInputProps extends Omit<InputProps, 'type'> {
    calendarLabel?: string;
    slotProps?: DateInputSlotProps;
}
export interface DateInputCalendarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
}
declare const DateInputCalendarButton: React.ForwardRefExoticComponent<DateInputCalendarButtonProps & React.RefAttributes<HTMLButtonElement>>;
export interface TemporalInputProps extends DateInputProps {
    type: TemporalInputType;
}
declare const DateInput: React.ForwardRefExoticComponent<DateInputProps & React.RefAttributes<HTMLInputElement>>;
export type DateTimeInputProps = DateInputProps;
declare const DateTimeInput: React.ForwardRefExoticComponent<DateInputProps & React.RefAttributes<HTMLInputElement>>;
export { DateInput, DateInputCalendarButton, DateTimeInput };
