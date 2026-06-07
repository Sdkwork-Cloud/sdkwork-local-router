import { ButtonProps } from '../../ui/button';
import * as React from 'react';
export type PickerSelectionFooterCancelHandler = () => void;
export type PickerSelectionFooterClearHandler = () => void;
export type PickerSelectionFooterConfirmHandler = () => void;
export interface PickerSelectionFooterProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onCancel'> {
    cancelLabel?: React.ReactNode;
    className?: string;
    clearLabel?: React.ReactNode;
    confirmDisabled?: boolean;
    confirmLabel?: React.ReactNode;
    confirmLoading?: boolean;
    confirmVariant?: ButtonProps['variant'];
    onCancel?: PickerSelectionFooterCancelHandler;
    onClear?: PickerSelectionFooterClearHandler;
    onConfirm?: PickerSelectionFooterConfirmHandler;
    showClear?: boolean;
    summary?: React.ReactNode;
}
declare const PickerSelectionFooter: React.ForwardRefExoticComponent<PickerSelectionFooterProps & React.RefAttributes<HTMLDivElement>>;
export { PickerSelectionFooter };
