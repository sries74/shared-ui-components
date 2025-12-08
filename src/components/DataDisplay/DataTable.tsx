import React, { useState, useMemo, useCallback } from 'react';
import { Button } from '../Common/Button';
import { LoadingSpinner } from '../Feedback/LoadingSpinner';
import './DataTable.css';

export interface Column<T> {
  key: string;
  header: string;
  accessor: (row: T) => any;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string | number;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  sortable?: boolean;
  filterable?: boolean;
  selectable?: boolean;
  onRowClick?: (row: T) => void;
  pagination?: {
    pageSize: number;
    currentPage?: number;
    onPageChange?: (page: number) => void;
  };
  className?: string;
}

type SortDirection = 'asc' | 'desc' | null;

/**
 * DataTable component with sorting, filtering, pagination, and row selection
 * 
 * @example
 * ```tsx
 * <DataTable
 *   data={users}
 *   columns={columns}
 *   sortable
 *   filterable
 *   selectable
 *   pagination={{ pageSize: 10 }}
 * />
 * ```
 */
export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  sortable = false,
  filterable = false,
  selectable = false,
  onRowClick,
  pagination,
  className = '',
}: DataTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(pagination?.currentPage || 1);

  const pageSize = pagination?.pageSize || data.length;

  // Filter data
  const filteredData = useMemo(() => {
    if (!filterable || Object.keys(filters).length === 0) {
      return data;
    }

    return data.filter((row) => {
      return columns.every((column) => {
        if (!column.filterable || !filters[column.key]) {
          return true;
        }
        const value = column.accessor(row);
        const filterValue = filters[column.key].toLowerCase();
        return String(value).toLowerCase().includes(filterValue);
      });
    });
  }, [data, filters, columns, filterable]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) {
      return filteredData;
    }

    const column = columns.find((col) => col.key === sortColumn);
    if (!column) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = column.accessor(a);
      const bValue = column.accessor(b);

      if (aValue === bValue) return 0;

      const comparison = aValue < bValue ? -1 : 1;
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [filteredData, sortColumn, sortDirection, columns]);

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!pagination) {
      return sortedData;
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, pageSize, pagination]);

  const totalPages = pagination ? Math.ceil(sortedData.length / pageSize) : 1;

  const handleSort = useCallback((columnKey: string) => {
    if (!sortable) return;

    if (sortColumn === columnKey) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortColumn(null);
        setSortDirection(null);
      } else {
        setSortDirection('asc');
      }
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  }, [sortable, sortColumn, sortDirection]);

  const handleFilter = useCallback((columnKey: string, value: string) => {
    setFilters((prev) => {
      if (!value) {
        const newFilters = { ...prev };
        delete newFilters[columnKey];
        return newFilters;
      }
      return { ...prev, [columnKey]: value };
    });
    setCurrentPage(1);
  }, []);

  const handleSelectAll = useCallback(() => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set());
    } else {
      const startIndex = pagination ? (currentPage - 1) * pageSize : 0;
      const newSelected = new Set(
        paginatedData.map((_, index) => startIndex + index)
      );
      setSelectedRows(newSelected);
    }
  }, [selectedRows, paginatedData, pagination, currentPage, pageSize]);

  const handleSelectRow = useCallback((index: number) => {
    setSelectedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    pagination?.onPageChange?.(page);
  }, [pagination]);

  const getSortIcon = (columnKey: string) => {
    if (sortColumn !== columnKey) {
      return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 4.5L6 1.5L9 4.5M3 7.5L6 10.5L9 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }
    if (sortDirection === 'asc') {
      return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 7.5L6 4.5L9 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }
    return (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  };

  if (loading) {
    return (
      <div className={`data-table data-table--loading ${className}`}>
        <LoadingSpinner size="lg" text="Loading data..." />
      </div>
    );
  }

  return (
    <div className={`data-table ${className}`}>
      <div className="data-table__container">
        <table className="data-table__table">
          <thead className="data-table__thead">
            <tr>
              {selectable && (
                <th className="data-table__th data-table__th--checkbox">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                    onChange={handleSelectAll}
                    aria-label="Select all rows"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`data-table__th ${sortable && column.sortable ? 'data-table__th--sortable' : ''}`}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="data-table__th-content">
                    <span>{column.header}</span>
                    {sortable && column.sortable && (
                      <span className="data-table__sort-icon">{getSortIcon(column.key)}</span>
                    )}
                  </div>
                  {filterable && column.filterable && (
                    <input
                      type="text"
                      className="data-table__filter"
                      placeholder="Filter..."
                      value={filters[column.key] || ''}
                      onChange={(e) => handleFilter(column.key, e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="data-table__tbody">
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="data-table__empty"
                >
                  No data available
                </td>
              </tr>
            ) : (
              paginatedData.map((row, index) => {
                const actualIndex = pagination ? (currentPage - 1) * pageSize + index : index;
                const isSelected = selectedRows.has(actualIndex);
                return (
                  <tr
                    key={actualIndex}
                    className={`data-table__tr ${isSelected ? 'data-table__tr--selected' : ''} ${onRowClick ? 'data-table__tr--clickable' : ''}`}
                    onClick={() => onRowClick?.(row)}
                  >
                    {selectable && (
                      <td className="data-table__td data-table__td--checkbox">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectRow(actualIndex)}
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Select row ${actualIndex + 1}`}
                        />
                      </td>
                    )}
                    {columns.map((column) => {
                      const value = column.accessor(row);
                      return (
                        <td key={column.key} className="data-table__td">
                          {column.render ? column.render(value, row) : String(value ?? '')}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {pagination && totalPages > 1 && (
        <div className="data-table__pagination">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </Button>
          <span className="data-table__pagination-info">
            Page {currentPage} of {totalPages} ({sortedData.length} total)
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

