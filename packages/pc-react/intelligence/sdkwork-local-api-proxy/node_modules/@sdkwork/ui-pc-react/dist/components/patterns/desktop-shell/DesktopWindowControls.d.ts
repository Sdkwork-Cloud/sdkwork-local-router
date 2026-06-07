import * as React from 'react';
export type DesktopPlatform = 'desktop' | 'web';
export type WindowUnsubscribe = () => void | Promise<void>;
export type DesktopWindowCommandHandler = () => Promise<void>;
export type DesktopWindowPlatformResolver = () => DesktopPlatform;
export type DesktopWindowMaximizedResolver = () => Promise<boolean>;
export type DesktopWindowMaximizedChangeHandler = (isMaximized: boolean) => void;
export type DesktopWindowMaximizedSubscriber = (callback: DesktopWindowMaximizedChangeHandler) => Promise<WindowUnsubscribe> | WindowUnsubscribe;
export interface DesktopWindowController {
    closeWindow: DesktopWindowCommandHandler;
    getPlatform: DesktopWindowPlatformResolver;
    isWindowMaximized: DesktopWindowMaximizedResolver;
    maximizeWindow: DesktopWindowCommandHandler;
    minimizeWindow: DesktopWindowCommandHandler;
    restoreWindow: DesktopWindowCommandHandler;
    subscribeWindowMaximized: DesktopWindowMaximizedSubscriber;
}
export interface DesktopWindowControlLabels {
    close: string;
    maximize: string;
    minimize: string;
    restore: string;
}
export interface DesktopWindowControlsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    className?: string;
    controller?: DesktopWindowController | null;
    labels?: Partial<DesktopWindowControlLabels>;
    variant?: 'floating' | 'header';
}
export declare const DesktopWindowControls: React.ForwardRefExoticComponent<DesktopWindowControlsProps & React.RefAttributes<HTMLDivElement>>;
