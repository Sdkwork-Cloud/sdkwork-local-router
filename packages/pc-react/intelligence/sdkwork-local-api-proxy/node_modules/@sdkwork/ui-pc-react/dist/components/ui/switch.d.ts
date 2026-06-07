import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
export type SwitchProps = React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>;
declare const Switch: React.ForwardRefExoticComponent<Omit<SwitchPrimitive.SwitchProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
export { Switch };
