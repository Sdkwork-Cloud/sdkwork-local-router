import { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
declare const Modal: React.FC<DialogPrimitive.DialogProps>;
declare const ModalPortal: React.FC<DialogPrimitive.DialogPortalProps>;
export type ModalProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>;
export type ModalTriggerProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>;
export type ModalPortalProps = React.ComponentProps<typeof DialogPrimitive.Portal>;
export type ModalCloseProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>;
export type ModalOverlayProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>;
declare const ModalTrigger: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const ModalClose: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogCloseProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const ModalOverlay: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogOverlayProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const modalContentVariants: (props?: ({
    align?: "center" | "top" | null | undefined;
    size?: "sm" | "lg" | "md" | "full" | "xl" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface ModalContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>, VariantProps<typeof modalContentVariants> {
    showCloseButton?: boolean;
}
export type ModalHeaderProps = React.HTMLAttributes<HTMLDivElement>;
export type ModalBodyProps = React.HTMLAttributes<HTMLDivElement>;
export type ModalFooterProps = React.HTMLAttributes<HTMLDivElement>;
declare const ModalContent: React.ForwardRefExoticComponent<ModalContentProps & React.RefAttributes<HTMLDivElement>>;
declare const ModalHeader: React.ForwardRefExoticComponent<ModalHeaderProps & React.RefAttributes<HTMLDivElement>>;
declare const ModalBody: React.ForwardRefExoticComponent<ModalBodyProps & React.RefAttributes<HTMLDivElement>>;
declare const ModalFooter: React.ForwardRefExoticComponent<ModalFooterProps & React.RefAttributes<HTMLDivElement>>;
export type ModalTitleProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>;
export type ModalDescriptionProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>;
declare const ModalTitle: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogTitleProps & React.RefAttributes<HTMLHeadingElement>, "ref"> & React.RefAttributes<HTMLHeadingElement>>;
declare const ModalDescription: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>, "ref"> & React.RefAttributes<HTMLParagraphElement>>;
export type ConfirmDialogConfirmHandler = () => void;
export type ConfirmDialogOpenChangeHandler = (open: boolean) => void;
export interface ConfirmDialogProps {
    cancelLabel?: React.ReactNode;
    closeOnConfirm?: boolean;
    confirmLabel?: React.ReactNode;
    confirmLoading?: boolean;
    description?: React.ReactNode;
    open?: boolean;
    onConfirm: ConfirmDialogConfirmHandler;
    onOpenChange?: ConfirmDialogOpenChangeHandler;
    title: React.ReactNode;
    tone?: 'default' | 'danger' | 'warning';
}
export declare function ConfirmDialog({ cancelLabel, closeOnConfirm, confirmLabel, confirmLoading, description, onConfirm, onOpenChange, open, title, tone, }: ConfirmDialogProps): import("react/jsx-runtime").JSX.Element;
export declare namespace ConfirmDialog {
    var displayName: string;
}
export { Modal, ModalBody, ModalClose, ModalContent, ModalDescription, ModalFooter, ModalHeader, ModalOverlay, ModalPortal, ModalTitle, ModalTrigger, };
