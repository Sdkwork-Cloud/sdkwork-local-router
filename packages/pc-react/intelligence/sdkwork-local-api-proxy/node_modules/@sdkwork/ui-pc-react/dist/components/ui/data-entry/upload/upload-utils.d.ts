import { FileUploadItem, FileUploadListType, FileUploadStatus, FileUploadVariant } from './upload-types';
export declare const DOCUMENT_ACCEPT_PRESET: string[];
interface UploadVariantDefaults {
    accept: string | string[];
    label: string;
    listType: FileUploadListType;
    emptyStateTitle: string;
    helperText: string;
}
export declare function createFileId(): string;
export declare function formatFileSize(size: number): string;
export declare function normalizeAccept(accept: string | string[] | undefined): string;
export declare function matchesAccept(file: File, accept: string | string[] | undefined): boolean;
export declare function getUploadVariantDefaults(variant: FileUploadVariant): UploadVariantDefaults;
export declare function inferUploadItemKind(item: Pick<FileUploadItem, 'kind' | 'type' | 'name'> | Pick<File, 'type' | 'name'>, fallbackVariant: FileUploadVariant): FileUploadVariant;
export declare function isPreviewableKind(kind: FileUploadVariant): kind is "audio" | "video" | "image";
export declare function formatStatusLabel(status: FileUploadStatus, progress?: number): string;
export declare function formatConstraintText(maxFiles: number, maxSize: number): string;
export declare function getFileExtensionLabel(name: string): string;
export declare function getClipboardFiles(clipboardData: DataTransfer | null | undefined): File[];
export {};
