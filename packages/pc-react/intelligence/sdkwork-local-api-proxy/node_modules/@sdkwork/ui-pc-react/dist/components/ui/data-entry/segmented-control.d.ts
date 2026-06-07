import * as React from 'react';
export interface SegmentedControlOption {
    disabled?: boolean;
    icon?: React.ReactNode;
    label: React.ReactNode;
    value: string;
}
export type SegmentedControlValueChangeHandler = (value: string) => void;
export interface SegmentedControlProps extends React.HTMLAttributes<HTMLDivElement> {
    fullWidth?: boolean;
    onValueChange: SegmentedControlValueChangeHandler;
    options: SegmentedControlOption[];
    orientation?: 'horizontal' | 'vertical';
    size?: 'default' | 'sm';
    value: string;
}
declare const SegmentedControl: React.ForwardRefExoticComponent<SegmentedControlProps & React.RefAttributes<HTMLDivElement>>;
export { SegmentedControl };
