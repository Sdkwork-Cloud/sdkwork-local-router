import { DataTablePaginationItem } from './state';
export interface DataTablePaginationControlsProps {
    currentPage: number;
    hasPageSizeSelector: boolean;
    onPageChange: (page: number) => void;
    onPageSizeChange: (value: string) => void;
    pageCount: number;
    paginationItems: DataTablePaginationItem[];
    pageSizeOptions: readonly number[];
    resolvedPageSize: number;
}
export declare function DataTablePaginationControls({ currentPage, hasPageSizeSelector, onPageChange, onPageSizeChange, pageCount, paginationItems, pageSizeOptions, resolvedPageSize, }: DataTablePaginationControlsProps): import("react/jsx-runtime").JSX.Element;
