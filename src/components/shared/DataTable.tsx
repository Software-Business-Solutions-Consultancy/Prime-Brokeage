
import { useState, useMemo, type ReactNode } from "react"
import { ChevronDown, ChevronUp, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"

export interface Column<T> {
  key: keyof T
  label: string
  sortable?: boolean
  render?: (value: T[keyof T], row: T) => ReactNode
}

export interface DataTableProps<T extends { id?: string | number }> {
  data: T[]
  columns: Column<T>[]
  expandedContent?: (row: T) => ReactNode
    isExpandable?: boolean
  searchKeys?: (keyof T)[]
  showSearch?: boolean
  showEntriesDropdown?: boolean
  footer?: ReactNode
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
  column: Column<T>
  sortConfig: SortConfig<T>
  onSort: (key: keyof T) => void
}) {
  const isActive = sortConfig.key === column.key
  const isSortable = column.sortable !== false

  return (
    <th
      className={`px-4 py-3 text-left text-sm font-medium ${
        isSortable ? "cursor-pointer hover:bg-zinc-800 transition-colors select-none" : ""
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

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  expandedContent,
  isExpandable = true,
  searchKeys = [],
  showSearch = true,
  showEntriesDropdown = true,
}: DataTableProps<T>) {
  const [expandedRow, setExpandedRow] = useState<string | number | null>(null)
  const [entriesPerPage, setEntriesPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>({ key: null, direction: null })

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

    // Sort
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
      {/* Controls */}
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

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-zinc-200">
        <table className="w-full">
          <thead className="relative">
            <tr className="bg-zinc-900 text-white">
              {columns.map((column) => (
                <SortableHeader key={String(column.key)} column={column} sortConfig={sortConfig} onSort={handleSort} />
              ))}
            </tr>
            {/* Gradient bottom border */}
            <tr>
              <td colSpan={columns.length} className="h-[3px] bg-gradient-to-r from-[#FF8200] to-[#FF002B] p-0" />
            </tr>
          </thead>

          <tbody className="bg-white">
            {filteredAndSortedData.map((row) => (
              <>
                {/* Main Row */}
                <tr
                  key={row.id}
                  onClick={() => toggleRow(row.id)}
                  className={`border-b border-zinc-200 ${
                    expandedContent ? "cursor-pointer hover:bg-zinc-50" : ""
                  } transition-colors`}
                >
                  {columns.map((column, colIndex) => (
                    <td key={String(column.key)} className="px-4 py-3 text-sm">
                      <span
                        className={
                          colIndex === columns.length - 1 && canExpand ? "flex items-center justify-between" : ""
                        }
                      >
                        {column.render ? column.render(row[column.key], row) : String(row[column.key])}
                        {colIndex === columns.length - 1 &&
                          canExpand &&
                          (expandedRow === row.id ? (
                            <ChevronUp className="w-4 h-4 text-zinc-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-zinc-400" />
                          ))}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Expanded Details */}
                {canExpand && expandedRow === row.id && (
                  <tr key={`${row.id}-details`} className="bg-zinc-50 border-b border-zinc-200">
                    <td colSpan={columns.length} className="px-4 py-4">
                      {expandedContent!(row)}
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default DataTable