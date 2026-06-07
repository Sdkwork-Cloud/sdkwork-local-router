import { ComponentProps, ReactElement, ReactNode } from 'react';
import { Toaster as SonnerToaster, ExternalToast } from 'sonner';
type SonnerToasterProps = ComponentProps<typeof SonnerToaster>;
export type SdkworkToastId = number | string;
export type SdkworkToastResultUnwrapHandler<ToastData = unknown> = () => Promise<ToastData>;
export type SdkworkToastResult<ToastData = unknown> = SdkworkToastId | {
    unwrap: SdkworkToastResultUnwrapHandler<ToastData>;
};
export type SdkworkToastPromiseFactory<ToastData = unknown> = () => Promise<ToastData>;
export type SdkworkToastPromise<ToastData = unknown> = Promise<ToastData> | SdkworkToastPromiseFactory<ToastData>;
export type SdkworkToastPromiseRenderer<ToastData = unknown> = ReactNode | ((data: ToastData) => ReactNode | Promise<ReactNode>);
export type SdkworkToastPromiseErrorRenderer = ReactNode | ((error: unknown) => ReactNode | Promise<ReactNode>);
export type SdkworkToastPromiseFinallyHandler = () => void | Promise<void>;
export type SdkworkToastHandler = (message: ReactNode, data?: ExternalToast) => SdkworkToastId;
export type SdkworkToastCustomRenderer = (id: SdkworkToastId) => ReactElement;
export type SdkworkToastCustomHandler = (jsx: SdkworkToastCustomRenderer, data?: ExternalToast) => SdkworkToastId;
export type SdkworkToastDismissHandler = (id?: SdkworkToastId) => SdkworkToastId;
export type SdkworkToastPromiseHandler = <ToastData = unknown>(promise: SdkworkToastPromise<ToastData>, data?: SdkworkToastPromiseOptions<ToastData>) => SdkworkToastResult<ToastData>;
export interface SdkworkToastPromiseOptions<ToastData = unknown> extends Omit<ExternalToast, 'description'> {
    description?: SdkworkToastPromiseRenderer<ToastData>;
    error?: SdkworkToastPromiseErrorRenderer;
    finally?: SdkworkToastPromiseFinallyHandler;
    loading?: ReactNode;
    success?: SdkworkToastPromiseRenderer<ToastData>;
}
export type SdkworkToastApi = SdkworkToastHandler & {
    custom: SdkworkToastCustomHandler;
    dismiss: SdkworkToastDismissHandler;
    error: SdkworkToastHandler;
    info: SdkworkToastHandler;
    loading: SdkworkToastHandler;
    message: SdkworkToastHandler;
    promise: SdkworkToastPromiseHandler;
    success: SdkworkToastHandler;
    warning: SdkworkToastHandler;
};
type ToasterDataAttributes = {
    [K in `data-${string}`]?: string;
};
export interface ToasterProps extends SonnerToasterProps, ToasterDataAttributes {
}
export type SdkworkToasterProps = ToasterProps;
export declare function Toaster({ closeButton, expand, position, richColors, theme, toastOptions, ...props }: ToasterProps): import("react/jsx-runtime").JSX.Element;
export declare namespace Toaster {
    var displayName: string;
}
export declare function SdkworkToaster(props: SdkworkToasterProps): import("react/jsx-runtime").JSX.Element;
export declare namespace SdkworkToaster {
    var displayName: string;
}
export declare const toast: SdkworkToastApi;
export declare const sdkToast: SdkworkToastApi;
export {};
