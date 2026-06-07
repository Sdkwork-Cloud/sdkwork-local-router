import * as React from 'react';
import * as MenubarPrimitive from '@radix-ui/react-menubar';
export type MenubarProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>;
export type MenubarMenuProps = React.ComponentProps<typeof MenubarPrimitive.Menu>;
export type MenubarGroupProps = React.ComponentProps<typeof MenubarPrimitive.Group>;
export type MenubarPortalProps = React.ComponentProps<typeof MenubarPrimitive.Portal>;
export type MenubarSubProps = React.ComponentProps<typeof MenubarPrimitive.Sub>;
export type MenubarRadioGroupProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioGroup>;
export type MenubarTriggerProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>;
export interface MenubarSubTriggerProps extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> {
    inset?: boolean;
}
export type MenubarSubContentProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>;
export type MenubarContentProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>;
export interface MenubarItemProps extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> {
    inset?: boolean;
}
export type MenubarCheckboxItemProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>;
export type MenubarRadioItemProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>;
export interface MenubarLabelProps extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> {
    inset?: boolean;
}
export type MenubarSeparatorProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>;
export type MenubarShortcutProps = React.HTMLAttributes<HTMLSpanElement>;
declare const Menubar: React.ForwardRefExoticComponent<Omit<MenubarPrimitive.MenubarProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const MenubarMenu: typeof MenubarPrimitive.Menu;
declare const MenubarPortal: typeof MenubarPrimitive.Portal;
declare const MenubarSub: typeof MenubarPrimitive.Sub;
declare const MenubarGroup: React.ForwardRefExoticComponent<Omit<MenubarPrimitive.MenubarGroupProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const MenubarRadioGroup: React.ForwardRefExoticComponent<Omit<MenubarPrimitive.MenubarRadioGroupProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const MenubarTrigger: React.ForwardRefExoticComponent<Omit<MenubarPrimitive.MenubarTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const MenubarSubTrigger: React.ForwardRefExoticComponent<MenubarSubTriggerProps & React.RefAttributes<HTMLDivElement>>;
declare const MenubarSubContent: React.ForwardRefExoticComponent<Omit<MenubarPrimitive.MenubarSubContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const MenubarContent: React.ForwardRefExoticComponent<Omit<MenubarPrimitive.MenubarContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const MenubarItem: React.ForwardRefExoticComponent<MenubarItemProps & React.RefAttributes<HTMLDivElement>>;
declare const MenubarCheckboxItem: React.ForwardRefExoticComponent<Omit<MenubarPrimitive.MenubarCheckboxItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const MenubarRadioItem: React.ForwardRefExoticComponent<Omit<MenubarPrimitive.MenubarRadioItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const MenubarLabel: React.ForwardRefExoticComponent<MenubarLabelProps & React.RefAttributes<HTMLDivElement>>;
declare const MenubarSeparator: React.ForwardRefExoticComponent<Omit<MenubarPrimitive.MenubarSeparatorProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const MenubarShortcut: React.ForwardRefExoticComponent<MenubarShortcutProps & React.RefAttributes<HTMLSpanElement>>;
export { Menubar, MenubarCheckboxItem, MenubarContent, MenubarGroup, MenubarItem, MenubarLabel, MenubarMenu, MenubarPortal, MenubarRadioGroup, MenubarRadioItem, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger, };
