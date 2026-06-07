import * as React from 'react';
export interface FormSectionProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
    actions?: React.ReactNode;
    description?: React.ReactNode;
    title?: React.ReactNode;
}
declare const formGridColumnsClass: {
    readonly 1: "grid-cols-1";
    readonly 2: "grid-cols-1 xl:grid-cols-2";
    readonly 3: "grid-cols-1 xl:grid-cols-3";
};
export interface FormGridProps extends React.HTMLAttributes<HTMLDivElement> {
    columns?: keyof typeof formGridColumnsClass;
}
export type FormActionsProps = React.HTMLAttributes<HTMLDivElement>;
declare const FormSection: React.ForwardRefExoticComponent<FormSectionProps & React.RefAttributes<HTMLElement>>;
declare const FormGrid: React.ForwardRefExoticComponent<FormGridProps & React.RefAttributes<HTMLDivElement>>;
declare const FormActions: React.ForwardRefExoticComponent<FormActionsProps & React.RefAttributes<HTMLDivElement>>;
export { FormActions, FormGrid, FormSection };
