import * as React from 'react';
export type SidebarSectionExpandedChangeHandler = (expanded: boolean) => void;
export interface SidebarSectionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    actions?: React.ReactNode;
    defaultExpanded?: boolean;
    description?: React.ReactNode;
    expanded?: boolean;
    meta?: React.ReactNode;
    onExpandedChange?: SidebarSectionExpandedChangeHandler;
    title: React.ReactNode;
}
declare const SidebarSection: React.ForwardRefExoticComponent<SidebarSectionProps & React.RefAttributes<HTMLDivElement>>;
export { SidebarSection };
