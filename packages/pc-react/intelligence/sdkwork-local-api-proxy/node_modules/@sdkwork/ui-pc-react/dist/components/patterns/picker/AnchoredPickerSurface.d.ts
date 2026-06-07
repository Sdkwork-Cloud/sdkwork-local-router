import { PatternSlotProps } from '../_internal/slot-props';
import { Popover, PopoverContent, PopoverContentProps } from '../../ui/popover';
import * as React from 'react';
export type AnchoredPickerSurfaceSize = 'sm' | 'md' | 'lg' | 'xl';
interface AnchoredPickerSurfacePositioningProps {
    align?: React.ComponentPropsWithoutRef<typeof PopoverContent>['align'];
    alignOffset?: React.ComponentPropsWithoutRef<typeof PopoverContent>['alignOffset'];
    avoidCollisions?: React.ComponentPropsWithoutRef<typeof PopoverContent>['avoidCollisions'];
    collisionPadding?: React.ComponentPropsWithoutRef<typeof PopoverContent>['collisionPadding'];
    side?: React.ComponentPropsWithoutRef<typeof PopoverContent>['side'];
    sideOffset?: React.ComponentPropsWithoutRef<typeof PopoverContent>['sideOffset'];
}
export type AnchoredPickerSurfaceRegionSlotProps = PatternSlotProps<Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>>;
export type AnchoredPickerSurfaceSurfaceSlotProps = PatternSlotProps<Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>>;
export interface AnchoredPickerSurfaceSlotProps {
    body?: AnchoredPickerSurfaceRegionSlotProps;
    content?: PatternSlotProps<Omit<PopoverContentProps, 'align' | 'alignOffset' | 'avoidCollisions' | 'children' | 'collisionPadding' | 'side' | 'sideOffset'>>;
    filters?: AnchoredPickerSurfaceRegionSlotProps;
    footer?: AnchoredPickerSurfaceRegionSlotProps;
    header?: AnchoredPickerSurfaceRegionSlotProps;
    surface?: AnchoredPickerSurfaceSurfaceSlotProps;
}
export interface AnchoredPickerSurfaceProps extends Omit<React.ComponentPropsWithoutRef<typeof Popover>, 'children'>, AnchoredPickerSurfacePositioningProps {
    actions?: React.ReactNode;
    badge?: React.ReactNode;
    bodyScrollable?: boolean;
    children?: React.ReactNode;
    className?: string;
    description?: React.ReactNode;
    empty?: boolean;
    emptyAction?: React.ReactNode;
    emptyDescription?: React.ReactNode;
    emptyKeyword?: React.ReactNode;
    emptyTitle?: React.ReactNode;
    error?: React.ReactNode;
    errorTitle?: React.ReactNode;
    filters?: React.ReactNode;
    footer?: React.ReactNode;
    loading?: boolean;
    loadingLabel?: React.ReactNode;
    maxHeight?: React.CSSProperties['maxHeight'];
    resultsSummary?: React.ReactNode;
    size?: AnchoredPickerSurfaceSize;
    slotProps?: AnchoredPickerSurfaceSlotProps;
    title?: React.ReactNode;
    trigger: React.ReactElement;
}
declare const AnchoredPickerSurface: React.ForwardRefExoticComponent<AnchoredPickerSurfaceProps & React.RefAttributes<HTMLDivElement>>;
export { AnchoredPickerSurface };
