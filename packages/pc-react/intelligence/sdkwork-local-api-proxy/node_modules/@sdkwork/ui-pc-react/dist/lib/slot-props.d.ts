type DataAttributeValue = string | number | boolean | undefined;
export type DataAttributes = {
    [K in `data-${string}`]?: DataAttributeValue;
};
export type SlotProps<T extends object> = T & DataAttributes;
export declare function mergeSlotProps<T extends object>(baseProps: T, overrideProps?: Partial<T>): T;
export declare function mergeOptionalSlotProps<T extends object>(baseProps?: T, overrideProps?: Partial<T>): T | undefined;
export {};
