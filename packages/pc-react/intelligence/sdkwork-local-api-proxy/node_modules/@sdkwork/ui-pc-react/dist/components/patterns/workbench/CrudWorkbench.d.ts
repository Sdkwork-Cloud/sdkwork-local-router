import { PatternSlotProps } from '../_internal/slot-props';
import { DataTableProps } from '../../ui/data-display';
import { WorkspacePanelProps } from '../workspace/WorkspacePanel';
import { ManagementWorkbenchProps } from './ManagementWorkbench';
import * as React from 'react';
export interface CrudWorkbenchTableProps<T> extends Omit<DataTableProps<T>, 'description' | 'title'> {
    className?: string;
    description?: React.ReactNode;
    title?: React.ReactNode;
}
export interface CrudWorkbenchEditorProps extends Omit<WorkspacePanelProps, 'className'> {
    className?: string;
}
export interface CrudWorkbenchSlotProps {
    main?: PatternSlotProps<Omit<React.ComponentPropsWithoutRef<'section'>, 'children'>>;
    stack?: PatternSlotProps<Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>>;
}
export interface CrudWorkbenchProps<T> extends Omit<ManagementWorkbenchProps, 'main'> {
    editor?: CrudWorkbenchEditorProps;
    slotProps?: CrudWorkbenchSlotProps;
    table: CrudWorkbenchTableProps<T>;
}
export declare function CrudWorkbench<T>({ detail, editor, slotProps, table, ...props }: CrudWorkbenchProps<T>): import("react/jsx-runtime").JSX.Element;
export declare namespace CrudWorkbench {
    var displayName: string;
}
