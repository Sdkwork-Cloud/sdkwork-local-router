import * as React from 'react';
export interface NavigationRailProps extends React.ComponentPropsWithoutRef<'nav'> {
    footer?: React.ReactNode;
    header?: React.ReactNode;
}
export declare const NavigationRail: React.ForwardRefExoticComponent<NavigationRailProps & React.RefAttributes<HTMLElement>>;
