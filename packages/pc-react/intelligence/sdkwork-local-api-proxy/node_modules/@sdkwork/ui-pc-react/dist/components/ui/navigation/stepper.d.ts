import { SlotProps } from '../../../lib/slot-props';
import * as React from 'react';
export type StepperOrientation = 'horizontal' | 'vertical';
export type StepperItemStatus = 'complete' | 'current' | 'upcoming' | 'error';
export type StepperItemRootProps = SlotProps<Omit<React.ComponentPropsWithoutRef<'li'>, 'children' | 'title'>>;
export type StepperItemRegionSlotProps = SlotProps<Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>>;
export type StepperItemIndicatorSlotProps = SlotProps<Omit<React.ComponentPropsWithoutRef<'span'>, 'children'>>;
export interface StepperCollectionItemState {
    index: number;
    last: boolean;
    orientation: StepperOrientation;
    status: StepperItemStatus;
}
export type StepperItemPropsResolver = (state: StepperCollectionItemState) => StepperItemRootProps | undefined;
export type StepperItemSlotPropsResolver = (state: StepperCollectionItemState) => StepperItemSlotProps | undefined;
export interface StepperItemSlotProps {
    connector?: StepperItemIndicatorSlotProps;
    content?: StepperItemRegionSlotProps;
    indicator?: StepperItemIndicatorSlotProps;
}
export interface StepperProps extends React.OlHTMLAttributes<HTMLOListElement> {
    getItemProps?: StepperItemPropsResolver;
    getItemSlotProps?: StepperItemSlotPropsResolver;
    orientation?: StepperOrientation;
}
export interface StepperItemProps extends Omit<React.LiHTMLAttributes<HTMLLIElement>, 'title'> {
    description?: React.ReactNode;
    icon?: React.ReactNode;
    last?: boolean;
    meta?: React.ReactNode;
    stepNumber?: number;
    status?: StepperItemStatus;
    slotProps?: StepperItemSlotProps;
    title: React.ReactNode;
}
declare const Stepper: React.ForwardRefExoticComponent<StepperProps & React.RefAttributes<HTMLOListElement>>;
declare const StepperItem: React.ForwardRefExoticComponent<StepperItemProps & React.RefAttributes<HTMLLIElement>>;
export { Stepper, StepperItem };
