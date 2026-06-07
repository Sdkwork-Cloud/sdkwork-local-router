import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
export type LabelProps = React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>;
declare const Label: React.ForwardRefExoticComponent<Omit<LabelPrimitive.LabelProps & React.RefAttributes<HTMLLabelElement>, "ref"> & React.RefAttributes<HTMLLabelElement>>;
export { Label };
