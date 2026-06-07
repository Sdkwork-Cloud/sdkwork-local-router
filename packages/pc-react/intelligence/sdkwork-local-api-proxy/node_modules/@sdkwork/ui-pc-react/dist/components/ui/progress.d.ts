import * as React from 'react';
export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: number;
}
declare const Progress: React.ForwardRefExoticComponent<ProgressProps & React.RefAttributes<HTMLDivElement>>;
export { Progress };
