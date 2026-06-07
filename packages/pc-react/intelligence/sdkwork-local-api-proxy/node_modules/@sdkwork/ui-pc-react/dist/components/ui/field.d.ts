import { LabelProps } from './label';
import * as React from 'react';
export type FieldOrientation = 'horizontal' | 'vertical';
export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
    disabled?: boolean;
    invalid?: boolean;
    orientation?: FieldOrientation;
    required?: boolean;
}
export interface FieldLabelProps extends LabelProps {
}
export interface FieldDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
}
export interface FieldErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {
}
export interface FieldGroupProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare const Field: React.ForwardRefExoticComponent<FieldProps & React.RefAttributes<HTMLDivElement>>;
declare const FieldLabel: React.ForwardRefExoticComponent<FieldLabelProps & React.RefAttributes<HTMLLabelElement>>;
declare const FieldDescription: React.ForwardRefExoticComponent<FieldDescriptionProps & React.RefAttributes<HTMLParagraphElement>>;
declare const FieldError: React.ForwardRefExoticComponent<FieldErrorProps & React.RefAttributes<HTMLParagraphElement>>;
declare const FieldGroup: React.ForwardRefExoticComponent<FieldGroupProps & React.RefAttributes<HTMLDivElement>>;
export { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, };
