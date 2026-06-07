import { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
declare const Drawer: React.FC<DialogPrimitive.DialogProps>;
declare const DrawerPortal: React.FC<DialogPrimitive.DialogPortalProps>;
export type DrawerProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>;
export type DrawerTriggerProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>;
export type DrawerPortalProps = React.ComponentProps<typeof DialogPrimitive.Portal>;
export type DrawerCloseProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>;
export type DrawerOverlayProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>;
declare const DrawerTrigger: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const DrawerClose: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogCloseProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const DrawerOverlay: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogOverlayProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const drawerContentVariants: (props?: ({
    side?: "left" | "right" | null | undefined;
    size?: "sm" | "lg" | "md" | "full" | "xl" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface DrawerContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>, VariantProps<typeof drawerContentVariants> {
}
export type DrawerHeaderProps = React.HTMLAttributes<HTMLDivElement>;
export type DrawerBodyProps = React.HTMLAttributes<HTMLDivElement>;
export type DrawerFooterProps = React.HTMLAttributes<HTMLDivElement>;
declare const DrawerContent: React.ForwardRefExoticComponent<DrawerContentProps & React.RefAttributes<HTMLDivElement>>;
declare const DrawerHeader: React.ForwardRefExoticComponent<DrawerHeaderProps & React.RefAttributes<HTMLDivElement>>;
declare const DrawerBody: React.ForwardRefExoticComponent<DrawerBodyProps & React.RefAttributes<HTMLDivElement>>;
declare const DrawerFooter: React.ForwardRefExoticComponent<DrawerFooterProps & React.RefAttributes<HTMLDivElement>>;
export type DrawerTitleProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>;
export type DrawerDescriptionProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>;
declare const DrawerTitle: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogTitleProps & React.RefAttributes<HTMLHeadingElement>, "ref"> & React.RefAttributes<HTMLHeadingElement>>;
declare const DrawerDescription: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>, "ref"> & React.RefAttributes<HTMLParagraphElement>>;
export { Drawer, DrawerBody, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerPortal, DrawerTitle, DrawerTrigger, };
