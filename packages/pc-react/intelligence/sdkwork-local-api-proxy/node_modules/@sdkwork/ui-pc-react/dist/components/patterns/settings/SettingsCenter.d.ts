import { InlineAlertProps } from '../../ui/feedback/inline-alert';
import * as React from 'react';
export interface SettingsCenterItem {
    badge?: React.ReactNode;
    description?: React.ReactNode;
    disabled?: boolean;
    icon?: React.ReactNode;
    id: string;
    keywords?: string[];
    label: React.ReactNode;
}
export interface SettingsCenterSection {
    items: SettingsCenterItem[];
    title?: React.ReactNode;
}
export type SettingsCenterActiveItemChangeHandler = (itemId: string) => void;
export type SettingsCenterSearchChangeHandler = (value: string) => void;
export interface SettingsCenterProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'title'> {
    actions?: React.ReactNode;
    activeItem?: string;
    children?: React.ReactNode;
    description?: React.ReactNode;
    emptyState?: React.ReactNode;
    navFooter?: React.ReactNode;
    navHeader?: React.ReactNode;
    onActiveItemChange?: SettingsCenterActiveItemChangeHandler;
    onSearchChange?: SettingsCenterSearchChangeHandler;
    searchPlaceholder?: string;
    searchValue?: string;
    sections: SettingsCenterSection[];
    title: React.ReactNode;
}
export interface DirtyStateBarProps extends Omit<InlineAlertProps, 'showIcon' | 'tone'> {
    sticky?: boolean;
}
export declare const SettingsCenter: React.ForwardRefExoticComponent<SettingsCenterProps & React.RefAttributes<HTMLDivElement>>;
export declare function DirtyStateBar({ className, sticky, ...props }: DirtyStateBarProps): import("react/jsx-runtime").JSX.Element;
export declare namespace DirtyStateBar {
    var displayName: string;
}
