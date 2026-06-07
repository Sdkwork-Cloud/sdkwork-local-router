import { SlotProps } from '../../../lib/slot-props';
import { ButtonProps } from '../button';
import { DropdownMenuContentProps } from '../dropdown-menu';
import * as React from 'react';
export type ActionMenuButtonItemTone = 'default' | 'danger';
export type ActionMenuButtonItemSelectHandler = () => void;
export interface ActionMenuButtonItem {
    description?: React.ReactNode;
    disabled?: boolean;
    icon?: React.ReactNode;
    key: string;
    label: React.ReactNode;
    onSelect?: ActionMenuButtonItemSelectHandler;
    shortcut?: React.ReactNode;
    tone?: ActionMenuButtonItemTone;
    type?: 'item';
}
export interface ActionMenuButtonLabelEntry {
    inset?: boolean;
    key: string;
    label: React.ReactNode;
    type: 'label';
}
export interface ActionMenuButtonSeparatorEntry {
    key: string;
    type: 'separator';
}
export type ActionMenuButtonEntry = ActionMenuButtonItem | ActionMenuButtonLabelEntry | ActionMenuButtonSeparatorEntry;
export interface ActionMenuButtonSlotProps {
    content?: SlotProps<DropdownMenuContentProps>;
}
export type ActionMenuButtonMenuOpenChangeHandler = (open: boolean) => void;
export interface ActionMenuButtonProps extends Omit<ButtonProps, 'children'> {
    children: React.ReactNode;
    defaultMenuOpen?: boolean;
    items: ActionMenuButtonEntry[];
    menuAlign?: 'start' | 'center' | 'end';
    menuLabel?: string;
    menuModal?: boolean;
    menuOpen?: boolean;
    onMenuOpenChange?: ActionMenuButtonMenuOpenChangeHandler;
    showChevron?: boolean;
    slotProps?: ActionMenuButtonSlotProps;
}
declare const ActionMenuButton: React.ForwardRefExoticComponent<ActionMenuButtonProps & React.RefAttributes<HTMLButtonElement>>;
export { ActionMenuButton };
