import * as React from 'react';
export type StatusBadgeVariant = 'success' | 'warning' | 'danger' | 'default' | 'secondary';
export interface StatusBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    label?: string;
    showIcon?: boolean;
    status: string;
    variant?: StatusBadgeVariant;
}
declare function StatusBadge({ className, label, showIcon, status, variant, ...props }: StatusBadgeProps): import("react/jsx-runtime").JSX.Element;
declare namespace StatusBadge {
    var displayName: string;
}
export { StatusBadge };
