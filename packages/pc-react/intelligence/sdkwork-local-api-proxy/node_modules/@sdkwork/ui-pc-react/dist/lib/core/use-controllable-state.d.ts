export interface UseControllableStateOptions<T> {
    defaultValue: T;
    onChange?: (value: T) => void;
    value?: T;
}
export type ControllableStateUpdater<T> = T | ((previousValue: T) => T);
export declare function useControllableState<T>({ defaultValue, onChange, value, }: UseControllableStateOptions<T>): readonly [T, (nextValueOrUpdater: ControllableStateUpdater<T>) => void];
