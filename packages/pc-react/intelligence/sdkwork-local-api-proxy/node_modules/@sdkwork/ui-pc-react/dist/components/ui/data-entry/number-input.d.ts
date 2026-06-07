import { SlotProps } from '../../../lib/slot-props';
import * as React from 'react';
export type NumberInputValueChangeHandler = (value: number | null) => void;
export type NumberInputRootSlotProps = SlotProps<Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>>;
export type NumberInputStepperSlotProps = SlotProps<Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>>;
export type NumberInputStepperButtonSlotProps = SlotProps<Omit<React.ComponentPropsWithoutRef<'button'>, 'children'>>;
export interface NumberInputSlotProps {
    decrementButton?: NumberInputStepperButtonSlotProps;
    incrementButton?: NumberInputStepperButtonSlotProps;
    root?: NumberInputRootSlotProps;
    stepper?: NumberInputStepperSlotProps;
}
export interface NumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'defaultValue' | 'onChange' | 'type' | 'value'> {
    defaultValue?: number;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onValueChange?: NumberInputValueChangeHandler;
    slotProps?: NumberInputSlotProps;
    value?: number | null;
}
declare const NumberInput: React.ForwardRefExoticComponent<NumberInputProps & React.RefAttributes<HTMLInputElement>>;
export { NumberInput };
