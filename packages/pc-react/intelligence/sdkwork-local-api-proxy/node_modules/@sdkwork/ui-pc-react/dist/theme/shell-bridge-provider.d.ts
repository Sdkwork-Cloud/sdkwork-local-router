import { PropsWithChildren } from 'react';
import { SdkworkThemeSelection } from './theme-provider';
import { SdkworkColorMode, SdkworkThemeColor, SdkworkThemeOverrides } from './sdkwork-theme';
export interface SdkworkShellBridgeMessages {
    dateRangePicker: {
        endDate: string;
        placeholder: string;
        presets: string;
        rangeLimitDay: string;
        rangeLimitDays: string;
        rangeLimitExceeded: string;
        rangeLimitHour: string;
        rangeLimitHours: string;
        selectEndDate: string;
        startDate: string;
        to: string;
    };
    windowControls: {
        close: string;
        maximize: string;
        minimize: string;
        restore: string;
    };
}
export type SdkworkShellBridgeMessagesOverrides = {
    [K in keyof SdkworkShellBridgeMessages]?: Partial<SdkworkShellBridgeMessages[K]>;
};
export interface SdkworkShellBridgeFormatters {
    formatDate: (value: Date | number | string | null | undefined, options?: Intl.DateTimeFormatOptions) => string;
    formatDateTime: (value: Date | number | string | null | undefined, options?: Intl.DateTimeFormatOptions) => string;
    locale?: string;
}
export interface SdkworkShellBridgePreferences {
    colorMode?: SdkworkColorMode;
    themeColor?: SdkworkThemeColor;
    themeSelection?: SdkworkThemeSelection;
}
export interface SdkworkShellBridgeActions {
    setThemeSelection?: (next: SdkworkThemeSelection) => unknown;
    [key: string]: unknown;
}
export interface SdkworkShellBridgeValue {
    actions?: SdkworkShellBridgeActions;
    dir?: "auto" | "ltr" | "rtl";
    formatters?: Partial<SdkworkShellBridgeFormatters>;
    locale?: string;
    preferences?: SdkworkShellBridgePreferences;
    session?: Record<string, unknown>;
}
export interface SdkworkShellBridgeContextValue {
    actions: SdkworkShellBridgeActions;
    dir: "auto" | "ltr" | "rtl";
    formatters: SdkworkShellBridgeFormatters;
    locale: string;
    messages: SdkworkShellBridgeMessages;
    preferences: Required<Pick<SdkworkShellBridgePreferences, "themeColor" | "themeSelection">> & Pick<SdkworkShellBridgePreferences, "colorMode">;
    session?: Record<string, unknown>;
}
export interface SdkworkShellBridgeProviderProps extends PropsWithChildren {
    className?: string;
    messages?: SdkworkShellBridgeMessagesOverrides;
    overrides?: SdkworkThemeOverrides;
    value?: SdkworkShellBridgeValue | null;
}
export declare function SdkworkShellBridgeProvider({ children, className, messages, overrides, value, }: SdkworkShellBridgeProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useSdkworkShellBridge(): SdkworkShellBridgeContextValue;
