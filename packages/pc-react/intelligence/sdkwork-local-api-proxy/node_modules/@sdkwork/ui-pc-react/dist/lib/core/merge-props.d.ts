import { CSSProperties } from 'react';
type MergeableProps = {
    className?: string;
    style?: CSSProperties;
    [key: string]: unknown;
};
export declare function mergeProps<T extends MergeableProps>(baseProps: T, overrideProps?: Partial<T>): T;
export {};
