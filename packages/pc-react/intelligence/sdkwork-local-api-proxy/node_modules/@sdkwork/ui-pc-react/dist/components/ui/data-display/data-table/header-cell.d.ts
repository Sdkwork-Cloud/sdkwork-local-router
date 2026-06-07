import { Column } from '@tanstack/react-table';
import { DataTableColumn } from './types';
export interface DataTableHeaderCellProps<T> {
    column: DataTableColumn<T>;
    sortColumn?: Column<T, unknown>;
    stickyHeader?: boolean;
}
export declare function DataTableHeaderCell<T>({ column, sortColumn, stickyHeader, }: DataTableHeaderCellProps<T>): import("react/jsx-runtime").JSX.Element;
