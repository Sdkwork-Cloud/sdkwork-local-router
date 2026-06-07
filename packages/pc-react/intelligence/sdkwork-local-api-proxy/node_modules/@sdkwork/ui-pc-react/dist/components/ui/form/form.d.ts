import { Slot } from '@radix-ui/react-slot';
import { FormProvider, ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import { FieldLabel } from '../field';
import * as React from 'react';
declare const Form: typeof FormProvider & {
    displayName?: string;
};
export type FormProps = React.ComponentProps<typeof FormProvider>;
export type FormFieldProps<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = ControllerProps<TFieldValues, TName>;
type FormFieldComponent = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(props: FormFieldProps<TFieldValues, TName>) => React.JSX.Element;
declare const FormField: FormFieldComponent & {
    displayName?: string;
};
declare function useFormField(): {
    invalid: boolean;
    isDirty: boolean;
    isTouched: boolean;
    isValidating: boolean;
    error?: import('react-hook-form').FieldError;
    id: string;
    name: string;
    formDescriptionId: string;
    formItemId: string;
    formMessageId: string;
};
export type FormItemProps = React.HTMLAttributes<HTMLDivElement>;
export type FormLabelProps = React.ComponentPropsWithoutRef<typeof FieldLabel>;
export type FormControlProps = React.ComponentPropsWithoutRef<typeof Slot>;
export type FormDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;
export type FormMessageProps = React.HTMLAttributes<HTMLParagraphElement>;
declare const FormItem: React.ForwardRefExoticComponent<FormItemProps & React.RefAttributes<HTMLDivElement>>;
declare const FormLabel: React.ForwardRefExoticComponent<Omit<import('.').FieldLabelProps & React.RefAttributes<HTMLLabelElement>, "ref"> & React.RefAttributes<HTMLLabelElement>>;
declare const FormControl: React.ForwardRefExoticComponent<Omit<import('@radix-ui/react-slot').SlotProps & React.RefAttributes<HTMLElement>, "ref"> & React.RefAttributes<HTMLElement>>;
declare const FormDescription: React.ForwardRefExoticComponent<FormDescriptionProps & React.RefAttributes<HTMLParagraphElement>>;
declare const FormMessage: React.ForwardRefExoticComponent<FormMessageProps & React.RefAttributes<HTMLParagraphElement>>;
export { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useFormField, };
