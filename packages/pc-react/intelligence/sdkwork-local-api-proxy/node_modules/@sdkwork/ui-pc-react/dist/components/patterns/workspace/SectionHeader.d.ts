import * as React from 'react';
export interface SectionHeaderProps extends React.PropsWithChildren<Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>> {
    actions?: React.ReactNode;
    description?: React.ReactNode;
    eyebrow?: React.ReactNode;
    meta?: React.ReactNode;
    sticky?: boolean;
    title?: React.ReactNode;
}
export declare const SectionHeader: React.ForwardRefExoticComponent<SectionHeaderProps & React.RefAttributes<HTMLDivElement>>;
