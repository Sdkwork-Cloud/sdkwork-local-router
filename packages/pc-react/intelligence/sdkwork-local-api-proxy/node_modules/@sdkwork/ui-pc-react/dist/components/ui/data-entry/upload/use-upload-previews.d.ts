import { FileUploadItem, FileUploadVariant } from './upload-types';
export declare function useUploadPreviews(items: FileUploadItem[], fallbackVariant: FileUploadVariant): {
    getPreviewUrl(item: FileUploadItem): string;
};
