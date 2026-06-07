import { InlineAlert } from '../../ui/feedback';
import * as React from 'react';
export type RestartRequiredNoticeDismissHandler = () => void;
export type RestartRequiredNoticeRestartHandler = () => void;
export interface RestartRequiredNoticeProps extends Omit<React.ComponentPropsWithoutRef<typeof InlineAlert>, 'actions' | 'showIcon' | 'title' | 'tone'> {
    actions?: React.ReactNode;
    dismissLabel?: React.ReactNode;
    onDismiss?: RestartRequiredNoticeDismissHandler;
    onRestart?: RestartRequiredNoticeRestartHandler;
    restartLabel?: React.ReactNode;
    sticky?: boolean;
    title?: React.ReactNode;
}
export declare function RestartRequiredNotice({ actions, className, description, dismissLabel, onDismiss, onRestart, restartLabel, sticky, title, ...props }: RestartRequiredNoticeProps): import("react/jsx-runtime").JSX.Element;
export declare namespace RestartRequiredNotice {
    var displayName: string;
}
