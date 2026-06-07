import { VariantProps } from 'class-variance-authority';
import * as React from 'react';
declare const toolbarButtonVariants: (props?: ({
    size?: "default" | "compact" | null | undefined;
    pressed?: boolean | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface ToolbarButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'>, VariantProps<typeof toolbarButtonVariants> {
    active?: boolean;
    preserveFocusOnMouseDown?: boolean;
    shortcut?: string;
}
declare const ToolbarButton: React.ForwardRefExoticComponent<ToolbarButtonProps & React.RefAttributes<HTMLButtonElement>>;
export { ToolbarButton, toolbarButtonVariants };
