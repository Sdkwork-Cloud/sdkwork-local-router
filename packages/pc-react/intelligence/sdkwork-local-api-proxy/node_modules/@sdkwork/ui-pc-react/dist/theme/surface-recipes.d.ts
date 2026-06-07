import { CSSProperties } from 'react';
export type SdkworkThemeVisualTone = 'accent' | 'brand' | 'danger' | 'neutral' | 'success' | 'warning';
export declare function createSdkworkToneStyle(tone: SdkworkThemeVisualTone, options?: {
    backgroundWeight?: number;
    borderWeight?: number;
}): CSSProperties;
export declare function createSdkworkPanelStyle(tone: SdkworkThemeVisualTone, options?: {
    backgroundWeight?: number;
    borderWeight?: number;
    surfaceColor?: string;
    surfaceWeight?: number;
}): CSSProperties;
export declare function createSdkworkGlassStyle(tone: SdkworkThemeVisualTone, options?: {
    backgroundWeight?: number;
    borderWeight?: number;
    surfaceColor?: string;
    surfaceWeight?: number;
}): CSSProperties;
export declare function createSdkworkBackdropStyle(): CSSProperties;
export declare function createSdkworkHeroStyle(): CSSProperties;
