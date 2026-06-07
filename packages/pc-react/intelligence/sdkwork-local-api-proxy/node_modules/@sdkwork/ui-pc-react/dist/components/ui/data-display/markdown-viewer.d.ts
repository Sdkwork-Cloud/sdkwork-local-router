import * as React from 'react';
export interface MarkdownViewerEmptyProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
}
declare const MarkdownViewerEmpty: React.ForwardRefExoticComponent<MarkdownViewerEmptyProps & React.RefAttributes<HTMLDivElement>>;
export interface MarkdownViewerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
    content?: string | null;
    emptyContent?: React.ReactNode;
}
declare const MarkdownViewer: React.ForwardRefExoticComponent<MarkdownViewerProps & React.RefAttributes<HTMLDivElement>>;
export { MarkdownViewer, MarkdownViewerEmpty };
