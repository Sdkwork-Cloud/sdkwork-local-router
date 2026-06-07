import * as React from 'react';
export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
    change?: React.ReactNode;
    changeTone?: 'default' | 'success' | 'warning' | 'danger';
    description?: React.ReactNode;
    icon?: React.ReactNode;
    label: React.ReactNode;
    value: React.ReactNode;
}
declare function StatCard({ change, changeTone, className, description, icon, label, value, ...props }: StatCardProps): import("react/jsx-runtime").JSX.Element;
declare namespace StatCard {
    var displayName: string;
}
export { StatCard };
