import { CSSProperties } from 'react';
export type SdkworkColorMode = 'light' | 'dark';
export type SdkworkThemePreset = 'sdkwork';
export type SdkworkThemeColor = 'green-tech' | 'lobster' | 'rose' | 'tech-blue' | 'violet' | 'zinc';
export interface SdkworkTheme {
    colorMode: SdkworkColorMode;
    brand: {
        primary: string;
        primaryHover: string;
        primarySoft: string;
        accent: string;
    };
    surface: {
        canvas: string;
        panel: string;
        panelMuted: string;
        elevated: string;
        overlay: string;
    };
    text: {
        primary: string;
        secondary: string;
        muted: string;
        inverse: string;
    };
    border: {
        subtle: string;
        default: string;
        strong: string;
        focus: string;
    };
    state: {
        success: string;
        warning: string;
        danger: string;
        info: string;
    };
    radius: {
        control: string;
        field: string;
        panel: string;
        pill: string;
    };
    shadow: {
        soft: string;
        sm: string;
        md: string;
        lg: string;
    };
}
export interface SdkworkThemeOverrides {
    brand?: Partial<SdkworkTheme['brand']>;
    surface?: Partial<SdkworkTheme['surface']>;
    text?: Partial<SdkworkTheme['text']>;
    border?: Partial<SdkworkTheme['border']>;
    state?: Partial<SdkworkTheme['state']>;
    radius?: Partial<SdkworkTheme['radius']>;
    shadow?: Partial<SdkworkTheme['shadow']>;
}
export interface CreateSdkworkThemeOptions extends SdkworkThemeOverrides {
    colorMode?: SdkworkColorMode;
    preset?: SdkworkThemePreset;
    themeColor?: SdkworkThemeColor;
}
export declare const SDKWORK_DARK_THEME: SdkworkTheme;
export declare const SDKWORK_LIGHT_THEME: SdkworkTheme;
export declare function createSdkworkTheme(options?: CreateSdkworkThemeOptions): SdkworkTheme;
export declare function createThemeCssVariables(theme: SdkworkTheme): {
    readonly '--sdk-color-brand-primary': string;
    readonly '--sdk-color-brand-primary-hover': string;
    readonly '--sdk-color-brand-primary-soft': string;
    readonly '--sdk-color-brand-accent': string;
    readonly '--sdk-color-surface-canvas': string;
    readonly '--sdk-color-surface-panel': string;
    readonly '--sdk-color-surface-panel-muted': string;
    readonly '--sdk-color-surface-elevated': string;
    readonly '--sdk-color-surface-overlay': string;
    readonly '--sdk-color-text-primary': string;
    readonly '--sdk-color-text-secondary': string;
    readonly '--sdk-color-text-muted': string;
    readonly '--sdk-color-text-inverse': string;
    readonly '--sdk-color-border-subtle': string;
    readonly '--sdk-color-border-default': string;
    readonly '--sdk-color-border-strong': string;
    readonly '--sdk-color-border-focus': string;
    readonly '--sdk-color-state-success': string;
    readonly '--sdk-color-state-warning': string;
    readonly '--sdk-color-state-danger': string;
    readonly '--sdk-color-state-info': string;
    readonly '--sdk-radius-control': string;
    readonly '--sdk-radius-field': string;
    readonly '--sdk-radius-panel': string;
    readonly '--sdk-radius-pill': string;
    readonly '--sdk-shadow-soft': string;
    readonly '--sdk-shadow-sm': string;
    readonly '--sdk-shadow-md': string;
    readonly '--sdk-shadow-lg': string;
};
export declare function createThemeHostCssVariables(theme: SdkworkTheme, themeColor?: SdkworkThemeColor): {
    readonly '--theme-primary-50': string;
    readonly '--theme-primary-100': string;
    readonly '--theme-primary-200': string;
    readonly '--theme-primary-300': string;
    readonly '--theme-primary-400': string;
    readonly '--theme-primary-500': string;
    readonly '--theme-primary-600': string;
    readonly '--theme-primary-700': string;
    readonly '--theme-primary-800': string;
    readonly '--theme-primary-900': string;
    readonly '--theme-primary-950': string;
    readonly '--sdk-color-brand-primary': string;
    readonly '--sdk-color-brand-primary-hover': string;
    readonly '--sdk-color-brand-primary-soft': string;
    readonly '--sdk-color-brand-accent': string;
    readonly '--sdk-color-surface-canvas': string;
    readonly '--sdk-color-surface-panel': string;
    readonly '--sdk-color-surface-panel-muted': string;
    readonly '--sdk-color-surface-elevated': string;
    readonly '--sdk-color-surface-overlay': string;
    readonly '--sdk-color-text-primary': string;
    readonly '--sdk-color-text-secondary': string;
    readonly '--sdk-color-text-muted': string;
    readonly '--sdk-color-text-inverse': string;
    readonly '--sdk-color-border-subtle': string;
    readonly '--sdk-color-border-default': string;
    readonly '--sdk-color-border-strong': string;
    readonly '--sdk-color-border-focus': string;
    readonly '--sdk-color-state-success': string;
    readonly '--sdk-color-state-warning': string;
    readonly '--sdk-color-state-danger': string;
    readonly '--sdk-color-state-info': string;
    readonly '--sdk-radius-control': string;
    readonly '--sdk-radius-field': string;
    readonly '--sdk-radius-panel': string;
    readonly '--sdk-radius-pill': string;
    readonly '--sdk-shadow-soft': string;
    readonly '--sdk-shadow-sm': string;
    readonly '--sdk-shadow-md': string;
    readonly '--sdk-shadow-lg': string;
};
export declare function createThemeStyle(theme: SdkworkTheme): CSSProperties;
