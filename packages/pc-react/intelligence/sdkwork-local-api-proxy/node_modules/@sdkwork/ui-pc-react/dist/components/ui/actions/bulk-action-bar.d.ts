import * as React from 'react';
export type BulkActionBarTone = 'default' | 'info' | 'success' | 'warning' | 'danger';
export type BulkActionBarClearHandler = () => void;
export interface BulkActionBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    actions?: React.ReactNode;
    clearLabel?: React.ReactNode;
    count?: React.ReactNode;
    description?: React.ReactNode;
    meta?: React.ReactNode;
    onClear?: BulkActionBarClearHandler;
    sticky?: boolean;
    title?: React.ReactNode;
    tone?: BulkActionBarTone;
}
export declare const BulkActionBar: React.ForwardRefExoticComponent<BulkActionBarProps & React.RefAttributes<HTMLDivElement>>;
