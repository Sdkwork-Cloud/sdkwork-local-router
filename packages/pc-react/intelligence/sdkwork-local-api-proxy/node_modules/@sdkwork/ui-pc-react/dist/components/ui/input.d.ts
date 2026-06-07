import * as React from 'react';
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
}
declare const inputBaseClassName = "flex h-10 w-full min-w-0 rounded-[var(--sdk-radius-field)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] px-3 py-2 text-sm text-[var(--sdk-color-text-primary)] shadow-[var(--sdk-shadow-sm)] outline-none ring-offset-[var(--sdk-color-surface-canvas)] placeholder:text-[var(--sdk-color-text-muted)] focus-visible:ring-2 focus-visible:ring-[var(--sdk-color-border-focus)] aria-[invalid=true]:border-[var(--sdk-color-state-danger)] disabled:cursor-not-allowed disabled:opacity-60";
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
export { Input, inputBaseClassName };
