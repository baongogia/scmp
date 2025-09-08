"use client";

import { AgGridReact } from "ag-grid-react";
import { ColDef, GridOptions, GridReadyEvent } from "ag-grid-community";
import { useMemo } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

interface DataTableProps<T = any> {
  rowData: T[];
  columnDefs: ColDef<T>[];
  gridOptions?: GridOptions<T>;
  onGridReady?: (event: GridReadyEvent<T>) => void;
  className?: string;
  height?: string | number;
  pagination?: boolean;
  paginationPageSize?: number;
  rowSelection?: "single" | "multiple";
  onSelectionChanged?: (event: any) => void;
  getRowId?: (params: any) => string;
}

export function DataTable<T = any>({
  rowData,
  columnDefs,
  gridOptions = {},
  onGridReady,
  className = "",
  height = 400,
  pagination = true,
  paginationPageSize = 10,
  rowSelection,
  onSelectionChanged,
  getRowId,
}: DataTableProps<T>) {
  const defaultGridOptions = useMemo<GridOptions<T>>(
    () => ({
      defaultColDef: {
        resizable: true,
        sortable: true,
        filter: true,
        flex: 1,
        minWidth: 100,
      },
      pagination,
      paginationPageSize,
      rowSelection,
      suppressRowClickSelection: true,
      animateRows: true,
      rowHeight: 50,
      headerHeight: 40,
      ...gridOptions,
    }),
    [pagination, paginationPageSize, rowSelection, gridOptions]
  );

  const defaultColumnDefs = useMemo<ColDef<T>[]>(
    () => [...columnDefs],
    [columnDefs]
  );

  return (
    <div
      className={`ag-theme-alpine ${className}`}
      style={{ height: typeof height === "number" ? `${height}px` : height }}
    >
      <AgGridReact<T>
        rowData={rowData}
        columnDefs={defaultColumnDefs}
        gridOptions={defaultGridOptions}
        onGridReady={onGridReady}
        onSelectionChanged={onSelectionChanged}
        getRowId={getRowId}
      />
    </div>
  );
}

// Custom cell renderers
export const CellRenderers = {
  // Avatar with name and email
  AvatarWithInfo: (params: any) => {
    const { name, email, avatar } = params.value || {};
    return (
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium">
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            name?.charAt(0)?.toUpperCase() || "?"
          )}
        </div>
        <div>
          <div className="text-sm font-medium">{name}</div>
          {email && <div className="text-xs text-gray-500">{email}</div>}
        </div>
      </div>
    );
  },

  // Progress bar
  ProgressBar: (params: any) => {
    const { value, total, showPercentage = true } = params.value || {};
    const percentage = total ? Math.round((value / total) * 100) : 0;

    return (
      <div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        {showPercentage && (
          <div className="text-xs text-gray-500 mt-1">
            {value}/{total} ({percentage}%)
          </div>
        )}
      </div>
    );
  },

  // Status badge
  StatusBadge: (params: any) => {
    const { status, statusMap } = params.value || {};
    const config = statusMap?.[status] || { color: "default", text: status };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          config.color === "success"
            ? "bg-green-100 text-green-800"
            : config.color === "warning"
            ? "bg-yellow-100 text-yellow-800"
            : config.color === "error"
            ? "bg-red-100 text-red-800"
            : config.color === "info"
            ? "bg-blue-100 text-blue-800"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        {config.text}
      </span>
    );
  },

  // Currency
  Currency: (params: any) => {
    const { value, currency = "VND" } = params.value || {};
    return (
      <span className="font-medium text-green-600">
        {value?.toLocaleString()} {currency}
      </span>
    );
  },

  // Rating stars
  Rating: (params: any) => {
    const { value, max = 5 } = params.value || {};
    const stars = Array.from({ length: max }, (_, i) => (
      <span
        key={i}
        className={`text-sm ${i < value ? "text-yellow-400" : "text-gray-300"}`}
      >
        ★
      </span>
    ));

    return (
      <div className="flex items-center">
        {stars}
        <span className="ml-1 text-xs text-gray-500">{value}</span>
      </div>
    );
  },

  // Date
  Date: (params: any) => {
    const { value, format = "DD/MM/YYYY" } = params.value || {};
    if (!value) return "-";

    const date = new Date(value);
    return date.toLocaleDateString("vi-VN");
  },
};
