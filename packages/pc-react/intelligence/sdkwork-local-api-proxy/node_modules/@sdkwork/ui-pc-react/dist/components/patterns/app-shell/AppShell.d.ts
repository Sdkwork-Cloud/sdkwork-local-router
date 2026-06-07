import { SdkworkTheme } from '../../../theme/sdkwork-theme';
import * as React from 'react';
export interface AppShellProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children' | 'content'> {
    content?: React.ReactNode;
    footer?: React.ReactNode;
    header?: React.ReactNode;
    sidebar?: React.ReactNode;
    sidebarWidth?: number | string;
    theme?: SdkworkTheme;
}
export declare const AppShell: React.ForwardRefExoticComponent<AppShellProps & React.RefAttributes<HTMLDivElement>>;
