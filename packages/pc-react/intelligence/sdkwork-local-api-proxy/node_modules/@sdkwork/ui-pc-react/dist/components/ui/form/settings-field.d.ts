import * as React from 'react';
export type SettingsFieldResetHandler = () => void;
export interface SettingsFieldProps extends React.HTMLAttributes<HTMLDivElement> {
    actions?: React.ReactNode;
    controlId?: string;
    description?: React.ReactNode;
    error?: React.ReactNode;
    isModified?: boolean;
    label?: React.ReactNode;
    layout?: 'horizontal' | 'vertical';
    onReset?: SettingsFieldResetHandler;
    resetLabel?: string;
}
declare const SettingsField: React.ForwardRefExoticComponent<SettingsFieldProps & React.RefAttributes<HTMLDivElement>>;
export { SettingsField };
