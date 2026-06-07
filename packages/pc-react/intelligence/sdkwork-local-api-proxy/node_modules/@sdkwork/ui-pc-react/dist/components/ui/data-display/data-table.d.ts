import { DataTableProps as DataTablePropsContract } from './data-table/types';
import * as React from 'react';
export type { DataTableAccessorResolver, DataTableAlign, DataTableCellProps, DataTableCellPropsResolver, DataTableCellRenderer, DataTableColumn, DataTableDensity, DataTableHeaderProps, DataTablePageChangeHandler, DataTablePageSizeChangeHandler, DataTablePaginationMode, DataTablePaginationProps, DataTableRegionSlotProps, DataTableRowActionsRenderer, DataTableRowClickHandler, DataTableRowIdResolver, DataTableRowProps, DataTableRowPropsResolver, DataTableRowSelectionLabelResolver, DataTableSelectedRowIdsChangeHandler, DataTableSlotProps, DataTableSortingChangeHandler, DataTableSortingMode, DataTableSortingState, DataTableSortingStateItem, DataTableTableSlotProps, } from './data-table/types';
export interface DataTableProps<T = any> extends DataTablePropsContract<T> {
}
type DataTableComponent = React.ForwardRefExoticComponent<DataTableProps & React.RefAttributes<HTMLDivElement>> & {
    <T = any>(props: DataTableProps<T> & React.RefAttributes<HTMLDivElement>): React.ReactNode;
};
declare const DataTable: DataTableComponent;
export { DataTable };
