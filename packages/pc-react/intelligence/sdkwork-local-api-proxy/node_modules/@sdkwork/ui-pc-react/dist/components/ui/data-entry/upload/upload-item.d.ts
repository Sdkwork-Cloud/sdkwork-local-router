import { FileUploadItem, FileUploadItemActionHandler, FileUploadListType, FileUploadVariant } from './upload-types';
interface UploadItemProps {
    disabled?: boolean;
    fallbackVariant: FileUploadVariant;
    item: FileUploadItem;
    listType: FileUploadListType;
    onDownload?: FileUploadItemActionHandler;
    onRemove: (itemId: string) => void;
    onPreview?: FileUploadItemActionHandler;
    onRetry?: FileUploadItemActionHandler;
    previewUrl?: string;
}
declare function UploadItem({ disabled, fallbackVariant, item, listType, onDownload, onRemove, onPreview, onRetry, previewUrl }: UploadItemProps): import("react/jsx-runtime").JSX.Element;
declare namespace UploadItem {
    var displayName: string;
}
export { UploadItem };
