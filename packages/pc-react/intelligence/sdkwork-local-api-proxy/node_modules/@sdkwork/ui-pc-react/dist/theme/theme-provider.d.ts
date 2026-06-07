import { PropsWithChildren } from 'react';
import { SdkworkColorMode, SdkworkThemeColor, SdkworkThemeOverrides } from './sdkwork-theme';
export type SdkworkThemeSelection = SdkworkColorMode | 'system';
interface SdkworkThemeContextValue {
    colorMode: SdkworkColorMode;
    themeColor: SdkworkThemeColor;
    setThemeSelection: (next: SdkworkThemeSelection) => void;
    themeSelection: SdkworkThemeSelection;
}
export interface SdkworkThemeProviderProps extends PropsWithChildren {
    className?: string;
    defaultTheme?: SdkworkThemeSelection;
    dir?: 'auto' | 'ltr' | 'rtl';
    locale?: string;
    onThemeSelectionChange?: (next: SdkworkThemeSelection) => void;
    overrides?: SdkworkThemeOverrides;
    themeColor?: SdkworkThemeColor;
    themeSelection?: SdkworkThemeSelection;
}
export declare function SdkworkThemeProvider({ children, className, defaultTheme, dir, locale, onThemeSelectionChange, overrides, themeColor, themeSelection: controlledThemeSelection, }: SdkworkThemeProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useSdkworkTheme(): SdkworkThemeContextValue;
export {};
