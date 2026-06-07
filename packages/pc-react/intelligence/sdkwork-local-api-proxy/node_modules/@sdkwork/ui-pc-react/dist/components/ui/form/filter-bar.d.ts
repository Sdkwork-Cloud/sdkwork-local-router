import * as React from 'react';
export interface FilterBarProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
    description?: React.ReactNode;
    summary?: React.ReactNode;
    title?: React.ReactNode;
}
export interface FilterBarSectionProps extends React.HTMLAttributes<HTMLDivElement> {
    grow?: boolean;
    wrap?: boolean;
}
export interface FilterBarActionsProps extends React.HTMLAttributes<HTMLDivElement> {
    justify?: 'start' | 'end';
}
declare const FilterBar: React.ForwardRefExoticComponent<FilterBarProps & React.RefAttributes<HTMLElement>>;
declare const FilterBarSection: React.ForwardRefExoticComponent<FilterBarSectionProps & React.RefAttributes<HTMLDivElement>>;
declare const FilterBarActions: React.ForwardRefExoticComponent<FilterBarActionsProps & React.RefAttributes<HTMLDivElement>>;
export { FilterBar, FilterBarActions, FilterBarSection };
