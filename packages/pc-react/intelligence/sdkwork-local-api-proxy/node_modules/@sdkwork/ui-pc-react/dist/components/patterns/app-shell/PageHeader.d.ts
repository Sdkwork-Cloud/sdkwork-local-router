import * as React from 'react';
export interface PageHeaderProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
    actions?: React.ReactNode;
    description?: React.ReactNode;
    eyebrow?: React.ReactNode;
    title: React.ReactNode;
}
export declare const PageHeader: React.ForwardRefExoticComponent<PageHeaderProps & React.RefAttributes<HTMLDivElement>>;
