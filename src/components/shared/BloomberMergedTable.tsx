"use client"

import { useState, useMemo, type ReactNode } from "react"
import { ChevronDown, ChevronUp, ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react"

export interface BloombergColumn<T> {
  key: keyof T
  label: string
  sortable?: boolean
  render?: (value: T[keyof T], row: T) => ReactNode
}

export interface BloombergMergedTableProps<T extends { id: string | number }> {
  data: T[]
  sharedColumns: BloombergColumn<T>[]
  requestColumns: BloombergColumn<T>[]
  outputColumns: BloombergColumn<T>[]
  requestTitle?: string
  outputTitle?: string
  expandedContent?: (row: T) => ReactNode
  isExpandable?: boolean
  searchKeys?: (keyof T)[]
  showSearch?: boolean
  showEntriesDropdown?: boolean
  footer?: ReactNode
  onRowSelect?: (selectedIds: (string | number)[]) => void
  showCheckbox?: boolean
}

type SortDirection = "asc" | "desc" | null

interface SortConfig<T> {
  key: keyof T | null
  direction: SortDirection
}

function SortableHeader<T>({
  column,
  sortConfig,
  onSort,
}: {
  column: BloombergColumn<T>
  sortConfig: SortConfig<T>
  onSort: (key: keyof T) => void
}) {
  const isActive = sortConfig.key === column.key
  const isSortable = column.sortable !== false

  return (
    <th
      className={`px-4 py-3 text-left text-sm font-medium ${
        isSortable ? "cursor-pointer hover:bg-zinc-700 transition-colors select-none" : ""
      }`}
      onClick={() => isSortable && onSort(column.key)}
    >
      <span className="flex items-center gap-1">
        {column.label}
        {isSortable && (
          <>
            {isActive && sortConfig.direction === "asc" ? (
              <ArrowUp className="w-4 h-4" />
            ) : isActive && sortConfig.direction === "desc" ? (
              <ArrowDown className="w-4 h-4" />
            ) : (
              <ArrowUpDown className="w-4 h-4 opacity-50" />
            )}
          </>
        )}
      </span>
    </th>
  )
}

export function BloombergMergedTable<T extends { id: string | number }>({
  data,
  sharedColumns,
  requestColumns,
  outputColumns,
  requestTitle = "Customer Request",
  outputTitle = "Bloomberg Output",
  expandedContent,
  isExpandable = true,
  searchKeys = [],
  showSearch = true,
  showEntriesDropdown = true,
  footer,
  onRowSelect,
  showCheckbox = true,
}: BloombergMergedTableProps<T>) {
  const [expandedRow, setExpandedRow] = useState<string | number | null>(null)
  const [entriesPerPage, setEntriesPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>({ key: null, direction: null })
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set())

  const canExpand = isExpandable && !!expandedContent

  const toggleRow = (id: string | number) => {
    if (canExpand) {
      setExpandedRow(expandedRow === id ? null : id)
    }
  }

  const handleSort = (key: keyof T) => {
    setSortConfig((current) => {
      if (current.key !== key) {
        return { key, direction: "asc" }
      }
      if (current.direction === "asc") {
        return { key, direction: "desc" }
      }
      if (current.direction === "desc") {
        return { key: null, direction: null }
      }
      return { key, direction: "asc" }
    })
  }

  const handleSelectRow = (id: string | number) => {
    const newSelected = new Set(selectedRows)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedRows(newSelected)
    onRowSelect?.(Array.from(newSelected))
  }

  const filteredAndSortedData = useMemo(() => {
    let filteredData = data

    if (searchTerm && searchKeys.length > 0) {
      filteredData = data.filter((item) =>
        searchKeys.some((key) => {
          const value = item[key]
          return String(value).toLowerCase().includes(searchTerm.toLowerCase())
        }),
      )
    }

    if (sortConfig.key && sortConfig.direction) {
      filteredData = [...filteredData].sort((a, b) => {
        const aValue = a[sortConfig.key!]
        const bValue = b[sortConfig.key!]

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1
        return 0
      })
    }

    return filteredData.slice(0, entriesPerPage)
  }, [data, searchTerm, searchKeys, sortConfig, entriesPerPage])

  return (
    <div className="w-full">
      {(showEntriesDropdown || showSearch) && (
        <div className="flex items-center justify-between mb-4">
          {showEntriesDropdown ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-600">Show</span>
              <select
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className="border border-zinc-300 rounded px-2 py-1 text-sm"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm text-zinc-600">entries</span>
            </div>
          ) : (
            <div />
          )}
          {showSearch && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-600">Search:</span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-zinc-300 rounded px-3 py-1 text-sm"
              />
            </div>
          )}
        </div>
      )}

      <div className="overflow-hidden rounded-lg border border-zinc-200">
        <div className="flex bg-white border-b border-zinc-200">
          <div
            className="px-4 py-3 text-center font-semibold text-zinc-900 border-r border-zinc-200 bg-white"
            style={{
              width: `${(sharedColumns.length / (sharedColumns.length + requestColumns.length + outputColumns.length)) * 100}%`,
            }}
          />
          <div
            className="px-4 py-3 text-center font-semibold text-zinc-900 border-r border-zinc-200 bg-orange-100"
            style={{
              width: `${(requestColumns.length / (sharedColumns.length + requestColumns.length + outputColumns.length)) * 100}%`,
            }}
          >
            {requestTitle}
          </div>
          <div
            className="px-4 py-3 text-center font-semibold text-zinc-900 bg-orange-300"
            style={{
              width: `${(outputColumns.length / (sharedColumns.length + requestColumns.length + outputColumns.length)) * 100}%`,
            }}
          >
            {outputTitle}
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className="bg-zinc-900 text-white">
              {sharedColumns.length > 0 ? (
                <th className="px-4 py-3 text-left text-sm font-medium">
                  <div className="flex items-center gap-2">
                    {showCheckbox && (
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            const allIds = new Set(filteredAndSortedData.map((row) => row.id))
                            setSelectedRows(allIds)
                            onRowSelect?.(Array.from(allIds))
                          } else {
                            setSelectedRows(new Set())
                            onRowSelect?.([])
                          }
                        }}
                        checked={selectedRows.size > 0 && selectedRows.size === filteredAndSortedData.length}
                        className="w-4 h-4 cursor-pointer"
                      />
                    )}
                    <span>{sharedColumns[0].label}</span>
                  </div>
                </th>
              ) : null}
              {sharedColumns.slice(1).map((column) => (
                <SortableHeader key={String(column.key)} column={column} sortConfig={sortConfig} onSort={handleSort} />
              ))}
              {requestColumns.map((column) => (
                <SortableHeader key={String(column.key)} column={column} sortConfig={sortConfig} onSort={handleSort} />
              ))}
              {outputColumns.map((column) => (
                <SortableHeader
                  key={`output-${String(column.key)}`}
                  column={column}
                  sortConfig={sortConfig}
                  onSort={handleSort}
                />
              ))}
            </tr>
            <tr>
              <td
                colSpan={sharedColumns.length + requestColumns.length + outputColumns.length}
                className="h-[3px] bg-gradient-to-r from-[#FF8200] to-[#FF002B] p-0"
              />
            </tr>
          </thead>

          <tbody className="bg-white">
            {filteredAndSortedData.map((row) => (
              <>
                <tr
                  key={row.id}
                  onClick={() => toggleRow(row.id)}
                  className={`border-b border-zinc-200 ${
                    canExpand ? "cursor-pointer hover:bg-zinc-50" : ""
                  } transition-colors`}
                >
                  {sharedColumns.length > 0 && (
                    <td className="px-4 py-3 text-sm border-r border-zinc-200">
                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        {showCheckbox && (
                          <input
                            type="checkbox"
                            checked={selectedRows.has(row.id)}
                            onChange={() => handleSelectRow(row.id)}
                            className="w-4 h-4 cursor-pointer"
                          />
                        )}
                        <span>{String(row[sharedColumns[0].key])}</span>
                      </div>
                    </td>
                  )}
                  {sharedColumns.slice(1).map((column) => (
                    <td key={String(column.key)} className="px-4 py-3 text-sm border-r border-zinc-200">
                      {column.render ? column.render(row[column.key], row) : String(row[column.key])}
                    </td>
                  ))}

                  {requestColumns.map((column, colIndex) => (
                    <td key={String(column.key)} className="px-4 py-3 text-sm border-r border-zinc-200 bg-orange-50">
                      <span
                        className={
                          colIndex === requestColumns.length - 1 && canExpand ? "flex items-center justify-between" : ""
                        }
                      >
                        {column.render
                          ? column.render((row as any).customerRequest?.[column.key as string] ?? row[column.key], row)
                          : String((row as any).customerRequest?.[column.key as string] ?? row[column.key] ?? "-")}
                        {colIndex === requestColumns.length - 1 &&
                          canExpand &&
                          (expandedRow === row.id ? (
                            <ChevronUp className="w-4 h-4 text-zinc-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-zinc-400" />
                          ))}
                      </span>
                    </td>
                  ))}

                  {outputColumns.map((column) => (
                    <td key={`output-${String(column.key)}`} className="px-4 py-3 text-sm bg-orange-200">
                      {column.render
                        ? column.render((row as any).bloombergOutput?.[column.key as string] ?? row[column.key], row)
                        : String((row as any).bloombergOutput?.[column.key as string] ?? row[column.key] ?? "-")}
                    </td>
                  ))}
                </tr>

                {canExpand && expandedRow === row.id && (
                  <tr key={`${row.id}-details`} className="bg-zinc-50 border-b border-zinc-200">
                    <td
                      colSpan={sharedColumns.length + requestColumns.length + outputColumns.length}
                      className="px-4 py-4"
                    >
                      {expandedContent!(row)}
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {footer}
    </div>
  )
}
