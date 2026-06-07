import { PatternSlotProps } from '../_internal/slot-props';
import { DesktopTitleBarProps, DesktopTitleBarSlotProps } from './DesktopTitleBar';
import * as React from 'react';
export type DesktopAppHeaderBarSlotProps = PatternSlotProps<Omit<React.ComponentPropsWithoutRef<'header'>, 'children'>>;
export type DesktopAppHeaderBrandSlotProps = PatternSlotProps<Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>>;
export type DesktopAppHeaderTitleSlotProps = PatternSlotProps<Omit<React.ComponentPropsWithoutRef<'span'>, 'children'>>;
export type DesktopAppHeaderSubtitleSlotProps = PatternSlotProps<Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>>;
export interface DesktopAppHeaderSlotProps extends DesktopTitleBarSlotProps {
    bar?: DesktopAppHeaderBarSlotProps;
    brand?: DesktopAppHeaderBrandSlotProps;
    subtitle?: DesktopAppHeaderSubtitleSlotProps;
    title?: DesktopAppHeaderTitleSlotProps;
}
export interface DesktopAppHeaderProps extends Omit<DesktopTitleBarProps, 'leading' | 'slotProps' | 'title' | 'trailing' | 'windowControls'> {
    actions?: React.ReactNode;
    badge?: React.ReactNode;
    brand?: React.ReactNode;
    brandMark?: React.ReactNode;
    leading?: React.ReactNode;
    slotProps?: DesktopAppHeaderSlotProps;
    subtitle?: React.ReactNode;
    title?: React.ReactNode;
    windowControls?: React.ReactNode;
}
export declare const DesktopAppHeader: React.ForwardRefExoticComponent<DesktopAppHeaderProps & React.RefAttributes<HTMLDivElement>>;
