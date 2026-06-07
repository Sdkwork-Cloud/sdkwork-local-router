import * as React from 'react';
export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    actions?: React.ReactNode;
    description?: React.ReactNode;
    title?: React.ReactNode;
}
export declare const EmptyState: React.ForwardRefExoticComponent<EmptyStateProps & React.RefAttributes<HTMLDivElement>>;
export interface LoadingBlockProps extends React.HTMLAttributes<HTMLDivElement> {
    label?: React.ReactNode;
}
export declare const LoadingBlock: React.ForwardRefExoticComponent<LoadingBlockProps & React.RefAttributes<HTMLDivElement>>;
export interface StatusNoticeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    children?: React.ReactNode;
    tone?: 'default' | 'success' | 'warning' | 'danger';
    title?: React.ReactNode;
}
export declare const StatusNotice: React.ForwardRefExoticComponent<StatusNoticeProps & React.RefAttributes<HTMLDivElement>>;
