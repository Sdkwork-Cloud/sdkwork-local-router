import { PatternSlotProps } from '../_internal/slot-props';
import { AppShellProps } from '../app-shell/AppShell';
import { DesktopAppHeaderProps, DesktopAppHeaderSlotProps } from './DesktopAppHeader';
import * as React from 'react';
type DesktopShellFrameShellProps = Omit<AppShellProps, keyof React.HTMLAttributes<HTMLDivElement> | 'className' | 'content' | 'footer' | 'header' | 'sidebar'>;
type DesktopShellFrameHeaderProps = Pick<DesktopAppHeaderProps, 'actions' | 'badge' | 'bordered' | 'brand' | 'brandMark' | 'center' | 'centerInteractive' | 'centerMaxWidth' | 'leading' | 'size' | 'subtitle' | 'title' | 'translucent' | 'windowController' | 'windowControlLabels' | 'windowControls'>;
export type DesktopShellFrameShellSlotProps = PatternSlotProps<Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>>;
export type DesktopShellFrameContentSlotProps = PatternSlotProps<Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>>;
export type DesktopShellFrameNavigationSlotProps = PatternSlotProps<Omit<React.ComponentPropsWithoutRef<'nav'>, 'children'>>;
export interface DesktopShellFrameSlotProps extends DesktopAppHeaderSlotProps {
    content?: DesktopShellFrameContentSlotProps;
    header?: PatternSlotProps<Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>>;
    navigation?: DesktopShellFrameNavigationSlotProps;
    shell?: DesktopShellFrameShellSlotProps;
}
export interface DesktopShellFrameProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children' | 'content' | 'title'>, DesktopShellFrameShellProps, DesktopShellFrameHeaderProps {
    content: React.ReactNode;
    navigation?: React.ReactNode;
    navigationFooter?: React.ReactNode;
    navigationHeader?: React.ReactNode;
    sidebar?: React.ReactNode;
    slotProps?: DesktopShellFrameSlotProps;
    statusBar?: React.ReactNode;
}
export declare const DesktopShellFrame: React.ForwardRefExoticComponent<DesktopShellFrameProps & React.RefAttributes<HTMLDivElement>>;
export {};
