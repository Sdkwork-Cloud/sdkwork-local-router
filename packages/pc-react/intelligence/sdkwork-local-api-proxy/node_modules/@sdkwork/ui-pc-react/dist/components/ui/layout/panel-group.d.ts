import * as React from 'react';
import * as ResizablePanels from 'react-resizable-panels';
export type PanelDirection = 'horizontal' | 'vertical';
export interface PanelGroupProps extends Omit<ResizablePanels.GroupProps, 'elementRef' | 'orientation'> {
    direction?: PanelDirection;
}
declare const PanelGroup: React.ForwardRefExoticComponent<PanelGroupProps & React.RefAttributes<HTMLDivElement>>;
export interface PanelProps extends Omit<ResizablePanels.PanelProps, 'elementRef'> {
}
declare const Panel: React.ForwardRefExoticComponent<PanelProps & React.RefAttributes<HTMLDivElement>>;
export interface PanelResizeHandleProps extends Omit<ResizablePanels.SeparatorProps, 'elementRef'> {
    withHandle?: boolean;
}
declare const PanelResizeHandle: React.ForwardRefExoticComponent<PanelResizeHandleProps & React.RefAttributes<HTMLDivElement>>;
export { Panel, PanelGroup, PanelResizeHandle };
