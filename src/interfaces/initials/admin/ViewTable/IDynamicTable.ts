import { ReactNode } from "react";
import { IPagination } from "../IPagination";

export type TextAlignment = "text-center" | "text-left" | "text-right";

/**
 * Represents a column configuration for DynamicTable
 * @template T - Data type for table rows
 */
export interface IDynamicTableColumn<T extends object> {
  header: string;
  accessor: keyof T;
  width?: string;
  align?: TextAlignment;
  cellRenderer?: (row: T) => ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  ariaLabel?: string;
}

/**
 * Represents an action for table rows
 * @template T - Data type for table rows
 */
export interface ITableAction<T extends object> {
  name: string;
  icon: ReactNode;
  handler?: (row: T) => void;
  ariaControls?: string;
  ariaHasPopup?: string;
  ariaExpanded?: string;
  dataHsOverlay?:string;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean | ((row: T) => boolean);
  type?:string;
  modalId?: string;
}

/**
 * Pagination configuration
 */

/**
 * Props for DynamicTable component
 * @template T - Data type for table rows
 */
export interface IDynamicTableProps<T extends object> {
  data: T[];
  columns: IDynamicTableColumn<T>[];
  actions?: ITableAction<T>[];
  pagination?: IPagination;
  loading?: boolean;
  error?: string | null;
  onSort?: (column: keyof T, direction: "asc" | "desc") => void;
  onSearch?: (query: string) => void;
  emptyState?: ReactNode;
  className?: string;
  ariaLabel?: string;
  rowKey?: keyof T;
}
