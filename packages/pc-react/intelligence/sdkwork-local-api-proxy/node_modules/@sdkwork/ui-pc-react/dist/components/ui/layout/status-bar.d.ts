import * as React from 'react';
declare const statusBarAlignClassName: {
    readonly start: "justify-start";
    readonly center: "justify-center";
    readonly end: "justify-end";
};
export interface StatusBarProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare const StatusBar: React.ForwardRefExoticComponent<StatusBarProps & React.RefAttributes<HTMLDivElement>>;
export interface StatusBarSectionProps extends React.HTMLAttributes<HTMLDivElement> {
    align?: keyof typeof statusBarAlignClassName;
}
declare const StatusBarSection: React.ForwardRefExoticComponent<StatusBarSectionProps & React.RefAttributes<HTMLDivElement>>;
export interface StatusBarItemProps extends React.HTMLAttributes<HTMLDivElement> {
    icon?: React.ReactNode;
    label?: React.ReactNode;
    value?: React.ReactNode;
}
declare const StatusBarItem: React.ForwardRefExoticComponent<StatusBarItemProps & React.RefAttributes<HTMLDivElement>>;
export { StatusBar, StatusBarItem, StatusBarSection };
