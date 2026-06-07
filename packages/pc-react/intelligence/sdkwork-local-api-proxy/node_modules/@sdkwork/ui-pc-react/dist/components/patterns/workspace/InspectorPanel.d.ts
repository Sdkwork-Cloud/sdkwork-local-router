import * as React from 'react';
export interface InspectorPanelProps extends Omit<React.ComponentPropsWithoutRef<'aside'>, 'title'> {
    footer?: React.ReactNode;
    title?: React.ReactNode;
}
export declare const InspectorPanel: React.ForwardRefExoticComponent<InspectorPanelProps & React.RefAttributes<HTMLElement>>;
