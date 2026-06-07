export interface NativeDateInputLike {
    disabled?: boolean;
    readOnly?: boolean;
    type?: string;
    showPicker?: (() => void) | undefined;
}
export declare function supportsNativeDatePickerOpen(input: NativeDateInputLike | null | undefined): input is NativeDateInputLike & {
    showPicker: () => void;
};
export declare function maybeOpenNativeDatePicker(input: NativeDateInputLike | null | undefined): boolean;
export declare function shouldOpenDatePickerFromKey(key: string): key is " " | "ArrowDown" | "Enter";
