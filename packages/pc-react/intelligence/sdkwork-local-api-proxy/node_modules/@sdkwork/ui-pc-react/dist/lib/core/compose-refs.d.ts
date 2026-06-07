import * as React from 'react';
export declare function composeRefs<T>(...refs: Array<React.ForwardedRef<T> | undefined>): (value: T | null) => void;
