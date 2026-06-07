import * as React from 'react';
export interface InlineAlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    actions?: React.ReactNode;
    description?: React.ReactNode;
    showIcon?: boolean;
    title?: React.ReactNode;
    tone?: 'default' | 'info' | 'success' | 'warning' | 'danger';
}
export declare const InlineAlert: React.ForwardRefExoticComponent<InlineAlertProps & React.RefAttributes<HTMLDivElement>>;
