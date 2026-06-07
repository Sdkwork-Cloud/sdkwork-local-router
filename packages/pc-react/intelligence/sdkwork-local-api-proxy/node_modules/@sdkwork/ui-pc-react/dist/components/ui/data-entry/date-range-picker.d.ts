import { SlotProps } from '../../../lib/slot-props';
import { PopoverContentProps } from '../popover';
import { DateInputProps, TemporalInputType } from './date-input';
import * as React from 'react';
export interface DateRangeValue {
    end: string;
    start: string;
}
export interface DateRangePreset {
    description?: React.ReactNode;
    disabled?: boolean;
    label: React.ReactNode;
    range: Partial<DateRangeValue>;
    value: string;
}
export interface DateRangeSpanLimit {
    amount: number;
    unit: 'day' | 'hour';
}
export type DateRangeFieldInvalidBehavior = 'preserve' | 'swap';
export type DateRangeFieldInputProps = Omit<DateInputProps, 'aria-invalid' | 'className' | 'defaultValue' | 'onChange' | 'type' | 'value'>;
export type DateRangePresetValueChangeHandler = (value: string | null) => void;
export type DateRangeValidationChangeHandler = (message: string | null) => void;
export type DateRangeValueChangeHandler = (value: DateRangeValue) => void;
export type DateRangeValueValidationResolver = (value: DateRangeValue) => string | null;
export type DateRangePickerTriggerSlotProps = SlotProps<Omit<React.ComponentPropsWithoutRef<'button'>, 'children'>>;
export type DateRangePickerContentSlotProps = SlotProps<Omit<PopoverContentProps, 'children'>>;
export type DateRangePickerCalendarSlotProps = SlotProps<Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>>;
export type DateRangePickerPresetsSlotProps = SlotProps<Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>>;
export type DateRangePickerFooterSlotProps = SlotProps<Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>>;
export type DateRangePickerErrorSlotProps = SlotProps<Omit<React.ComponentPropsWithoutRef<'p'>, 'children'>>;
export interface DateRangePickerSlotProps {
    calendar?: DateRangePickerCalendarSlotProps;
    content?: DateRangePickerContentSlotProps;
    error?: DateRangePickerErrorSlotProps;
    footer?: DateRangePickerFooterSlotProps;
    presets?: DateRangePickerPresetsSlotProps;
    trigger?: DateRangePickerTriggerSlotProps;
}
export interface DateRangeFieldBaseProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
    actions?: React.ReactNode;
    defaultPresetValue?: string | null;
    defaultValue?: Partial<DateRangeValue>;
    disabled?: boolean;
    endInputProps?: DateRangeFieldInputProps;
    endLabel?: React.ReactNode;
    invalidBehavior?: DateRangeFieldInvalidBehavior;
    max?: string;
    maxSpan?: DateRangeSpanLimit;
    min?: string;
    mode?: TemporalInputType;
    onPresetValueChange?: DateRangePresetValueChangeHandler;
    onValidationChange?: DateRangeValidationChangeHandler;
    onValueChange?: DateRangeValueChangeHandler;
    presetLabel?: React.ReactNode;
    presetValue?: string | null;
    presets?: DateRangePreset[];
    startInputProps?: DateRangeFieldInputProps;
    startLabel?: React.ReactNode;
    validate?: DateRangeValueValidationResolver;
    value?: Partial<DateRangeValue>;
}
export interface DateRangeFieldProps extends Omit<DateRangeFieldBaseProps, 'mode'> {
}
export interface DateTimeRangeFieldProps extends Omit<DateRangeFieldBaseProps, 'mode'> {
}
export interface DateRangePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
    actions?: React.ReactNode;
    defaultMonth?: Date;
    defaultPresetValue?: string | null;
    defaultValue?: Partial<DateRangeValue>;
    disabled?: boolean;
    max?: string;
    maxSpan?: DateRangeSpanLimit;
    min?: string;
    numberOfMonths?: number;
    onPresetValueChange?: DateRangePresetValueChangeHandler;
    onValidationChange?: DateRangeValidationChangeHandler;
    onValueChange?: DateRangeValueChangeHandler;
    placeholder?: React.ReactNode;
    presetLabel?: React.ReactNode;
    presetValue?: string | null;
    presets?: DateRangePreset[];
    slotProps?: DateRangePickerSlotProps;
    validate?: DateRangeValueValidationResolver;
    value?: Partial<DateRangeValue>;
}
declare const DateRangeField: React.ForwardRefExoticComponent<DateRangeFieldProps & React.RefAttributes<HTMLDivElement>>;
declare const DateTimeRangeField: React.ForwardRefExoticComponent<DateTimeRangeFieldProps & React.RefAttributes<HTMLDivElement>>;
declare const DateRangePicker: React.ForwardRefExoticComponent<DateRangePickerProps & React.RefAttributes<HTMLDivElement>>;
export { DateRangeField, DateRangePicker, DateTimeRangeField };
