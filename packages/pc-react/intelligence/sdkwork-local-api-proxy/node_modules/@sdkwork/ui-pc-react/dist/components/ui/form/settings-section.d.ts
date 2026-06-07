import * as React from 'react';
export interface SettingsSectionProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
    actions?: React.ReactNode;
    description?: React.ReactNode;
    title?: React.ReactNode;
}
declare const SettingsSection: React.ForwardRefExoticComponent<SettingsSectionProps & React.RefAttributes<HTMLElement>>;
export { SettingsSection };
