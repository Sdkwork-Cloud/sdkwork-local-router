import { SlotProps } from '../../../lib/slot-props';
import { ButtonProps } from '../button';
import { DropdownMenuContentProps } from '../dropdown-menu';
import * as React from 'react';
export interface SplitButtonItem {
    disabled?: boolean;
    icon?: React.ReactNode;
    key: string;
    label: React.ReactNode;
    onSelect?: SplitButtonItemSelectHandler;
    shortcut?: React.ReactNode;
}
export type SplitButtonGroupSlotProps = SlotProps<Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>>;
export type SplitButtonItemSelectHandler = () => void;
export type SplitButtonMenuOpenChangeHandler = (open: boolean) => void;
export interface SplitButtonSlotProps {
    content?: SlotProps<DropdownMenuContentProps>;
    group?: SplitButtonGroupSlotProps;
    menuTrigger?: ButtonProps;
    primaryAction?: ButtonProps;
}
export interface SplitButtonProps extends Omit<ButtonProps, 'children'> {
    children: React.ReactNode;
    defaultMenuOpen?: boolean;
    items: SplitButtonItem[];
    menuAlign?: 'start' | 'center' | 'end';
    menuLabel?: string;
    menuModal?: boolean;
    menuOpen?: boolean;
    onMenuOpenChange?: SplitButtonMenuOpenChangeHandler;
    slotProps?: SplitButtonSlotProps;
}
declare const SplitButton: React.ForwardRefExoticComponent<SplitButtonProps & React.RefAttributes<HTMLButtonElement>>;
export { SplitButton };
