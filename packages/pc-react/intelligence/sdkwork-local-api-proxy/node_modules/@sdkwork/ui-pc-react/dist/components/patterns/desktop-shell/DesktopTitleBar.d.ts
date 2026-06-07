import { PatternSlotProps } from '../_internal/slot-props';
import { DesktopWindowControlLabels, DesktopWindowController } from './DesktopWindowControls';
import * as React from 'react';
export type DesktopTitleBarRegionSlotProps = PatternSlotProps<Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>>;
export interface DesktopTitleBarSlotProps {
    center?: DesktopTitleBarRegionSlotProps;
    centerShell?: DesktopTitleBarRegionSlotProps;
    leading?: DesktopTitleBarRegionSlotProps;
    trailing?: DesktopTitleBarRegionSlotProps;
}
export interface DesktopTitleBarProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'style'> {
    bordered?: boolean;
    center?: React.ReactNode;
    centerInteractive?: boolean;
    centerMaxWidth?: React.CSSProperties['maxWidth'];
    leading?: React.ReactNode;
    size?: 'comfortable' | 'compact' | 'default';
    slotProps?: DesktopTitleBarSlotProps;
    style?: React.CSSProperties;
    trailing?: React.ReactNode;
    translucent?: boolean;
    windowController?: DesktopWindowController | null;
    windowControlLabels?: Partial<DesktopWindowControlLabels>;
    windowControls?: React.ReactNode;
}
export declare const DesktopTitleBar: React.ForwardRefExoticComponent<DesktopTitleBarProps & React.RefAttributes<HTMLElement>>;
