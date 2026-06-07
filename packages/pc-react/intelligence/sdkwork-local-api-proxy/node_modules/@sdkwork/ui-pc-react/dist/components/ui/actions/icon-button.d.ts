import { ButtonProps } from '../button';
import * as React from 'react';
export interface IconButtonProps extends Omit<ButtonProps, 'size'> {
}
declare const IconButton: React.ForwardRefExoticComponent<IconButtonProps & React.RefAttributes<HTMLButtonElement>>;
export { IconButton };
