import { Separator } from '../separator';
import * as React from 'react';
declare const horizontalAlignClassName: {
    readonly start: "justify-start";
    readonly center: "justify-center";
    readonly end: "justify-end";
};
export interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
    align?: keyof typeof horizontalAlignClassName;
    orientation?: 'horizontal' | 'vertical';
    wrap?: boolean;
}
declare const Toolbar: React.ForwardRefExoticComponent<ToolbarProps & React.RefAttributes<HTMLDivElement>>;
export interface ToolbarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    orientation?: 'horizontal' | 'vertical';
    wrap?: boolean;
}
export type ToolbarSpacerProps = React.HTMLAttributes<HTMLDivElement>;
export type ToolbarSeparatorProps = React.ComponentPropsWithoutRef<typeof Separator>;
declare const ToolbarGroup: React.ForwardRefExoticComponent<ToolbarGroupProps & React.RefAttributes<HTMLDivElement>>;
declare const ToolbarSpacer: React.ForwardRefExoticComponent<ToolbarSpacerProps & React.RefAttributes<HTMLDivElement>>;
declare const ToolbarSeparator: React.ForwardRefExoticComponent<Omit<Omit<import('@radix-ui/react-separator').SeparatorProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarSpacer };
