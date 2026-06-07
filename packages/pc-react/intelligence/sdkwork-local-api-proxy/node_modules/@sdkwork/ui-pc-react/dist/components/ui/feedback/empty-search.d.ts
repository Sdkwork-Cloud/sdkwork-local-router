import * as React from 'react';
export type EmptySearchClearHandler = () => void;
export interface EmptySearchProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    actions?: React.ReactNode;
    clearLabel?: React.ReactNode;
    description?: React.ReactNode;
    keyword?: React.ReactNode;
    onClear?: EmptySearchClearHandler;
    title?: React.ReactNode;
}
export declare const EmptySearch: React.ForwardRefExoticComponent<EmptySearchProps & React.RefAttributes<HTMLDivElement>>;
