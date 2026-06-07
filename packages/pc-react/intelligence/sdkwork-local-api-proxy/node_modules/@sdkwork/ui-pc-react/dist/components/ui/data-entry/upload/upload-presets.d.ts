import { SpecializedUploadProps } from './upload-types';
export type ImageUploadProps = SpecializedUploadProps;
export type VideoUploadProps = SpecializedUploadProps;
export type AudioUploadProps = SpecializedUploadProps;
export type DocumentUploadProps = SpecializedUploadProps;
declare function ImageUpload({ accept, listType, ...props }: ImageUploadProps): import("react/jsx-runtime").JSX.Element;
declare namespace ImageUpload {
    var displayName: string;
}
declare function VideoUpload({ accept, listType, ...props }: VideoUploadProps): import("react/jsx-runtime").JSX.Element;
declare namespace VideoUpload {
    var displayName: string;
}
declare function AudioUpload({ accept, listType, ...props }: AudioUploadProps): import("react/jsx-runtime").JSX.Element;
declare namespace AudioUpload {
    var displayName: string;
}
declare function DocumentUpload({ accept, listType, ...props }: DocumentUploadProps): import("react/jsx-runtime").JSX.Element;
declare namespace DocumentUpload {
    var displayName: string;
}
export { AudioUpload, DocumentUpload, ImageUpload, VideoUpload };
