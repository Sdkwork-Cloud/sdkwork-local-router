import * as React from 'react';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
declare const HoverCard: React.FC<HoverCardPrimitive.HoverCardProps>;
export type HoverCardProps = React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Root>;
export type HoverCardTriggerProps = React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Trigger>;
export type HoverCardContentProps = React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>;
declare const HoverCardTrigger: React.ForwardRefExoticComponent<Omit<HoverCardPrimitive.HoverCardTriggerProps & React.RefAttributes<HTMLAnchorElement>, "ref"> & React.RefAttributes<HTMLAnchorElement>>;
declare const HoverCardContent: React.ForwardRefExoticComponent<Omit<HoverCardPrimitive.HoverCardContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export { HoverCard, HoverCardContent, HoverCardTrigger };
