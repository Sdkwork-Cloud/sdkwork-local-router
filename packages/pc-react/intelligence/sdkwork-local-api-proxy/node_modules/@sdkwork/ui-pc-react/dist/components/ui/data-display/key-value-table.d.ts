import * as React from 'react';
export type KeyValueTone = 'default' | 'success' | 'warning' | 'danger';
export type KeyValueEmphasis = 'default' | 'strong';
export interface KeyValueTableRowData {
    id?: React.Key;
    label: React.ReactNode;
    value: React.ReactNode;
    tone?: KeyValueTone;
    emphasis?: KeyValueEmphasis;
    mono?: boolean;
}
export interface KeyValueTableProps extends React.TableHTMLAttributes<HTMLTableElement> {
    rows?: KeyValueTableRowData[];
    dense?: boolean;
}
export interface KeyValueTableRowProps extends React.ComponentPropsWithoutRef<'tr'> {
    tone?: KeyValueTone;
    emphasis?: KeyValueEmphasis;
}
export type KeyValueTableLabelProps = React.ComponentPropsWithoutRef<'th'>;
export interface KeyValueTableValueProps extends React.ComponentPropsWithoutRef<'td'> {
    mono?: boolean;
    tone?: KeyValueTone;
    emphasis?: KeyValueEmphasis;
}
declare const KeyValueTable: React.ForwardRefExoticComponent<KeyValueTableProps & React.RefAttributes<HTMLTableElement>>;
declare const KeyValueTableRow: React.ForwardRefExoticComponent<KeyValueTableRowProps & React.RefAttributes<HTMLTableRowElement>>;
declare const KeyValueTableLabel: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.ThHTMLAttributes<HTMLTableHeaderCellElement>, HTMLTableHeaderCellElement>, "ref"> & React.RefAttributes<HTMLTableCellElement>>;
declare const KeyValueTableValue: React.ForwardRefExoticComponent<KeyValueTableValueProps & React.RefAttributes<HTMLTableCellElement>>;
export { KeyValueTable, KeyValueTableLabel, KeyValueTableRow, KeyValueTableValue };
