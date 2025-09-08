"use client";

import { Input, Select, Button, Space } from "antd";
import { ReactNode } from "react";

const { Search } = Input;

export interface FilterOption {
  value: string;
  label: string;
}

export interface SearchAndFilterProps {
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  filterOptions?: FilterOption[];
  filterValue?: string;
  onFilterChange?: (value: string) => void;
  filterPlaceholder?: string;
  actions?: ReactNode;
  className?: string;
}

export function SearchAndFilter({
  searchPlaceholder = "Tìm kiếm...",
  searchValue = "",
  onSearchChange,
  filterOptions = [],
  filterValue = "",
  onFilterChange,
  filterPlaceholder = "Lọc theo...",
  actions,
  className = "",
}: SearchAndFilterProps) {
  return (
    <div
      className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Input
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
          className="w-full sm:w-64"
          allowClear
        />
        {filterOptions.length > 0 && (
          <Select
            placeholder={filterPlaceholder}
            value={filterValue}
            onChange={onFilterChange}
            allowClear
            className="w-full sm:w-48"
          >
            {filterOptions.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        )}
      </div>
      {actions && <Space>{actions}</Space>}
    </div>
  );
}
