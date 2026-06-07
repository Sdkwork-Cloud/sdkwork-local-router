import { FileUploadVariant } from './upload-types';
import * as React from 'react';
interface UploadDropzoneProps {
    caption?: string;
    description: string;
    disabled?: boolean;
    isDragging: boolean;
    onBrowse: () => void;
    onDragLeave: () => void;
    onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
    onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
    onPaste?: (event: React.ClipboardEvent<HTMLDivElement>) => void;
    title: string;
    variant: FileUploadVariant;
}
declare function UploadDropzone({ caption, description, disabled, isDragging, onBrowse, onDragLeave, onDragOver, onDrop, onPaste, title, variant, }: UploadDropzoneProps): import("react/jsx-runtime").JSX.Element;
declare namespace UploadDropzone {
    var displayName: string;
}
export { UploadDropzone };
