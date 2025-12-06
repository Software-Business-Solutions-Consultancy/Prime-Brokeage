"use client"

import { useState, useMemo } from "react"
import { ChevronDown, ChevronUp, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"

interface Transaction {
  id: number
  transactionId: string
  requestStatus: string
  transactionStatus: string
  initiator: string
  dateInitiated: string
  details: {
    transactionComment: string
    authorizer: string
    dateApproved: string
    accountNumber: string
  }
}

type SortKey = keyof Pick<
  Transaction,
  "id" | "transactionId" | "requestStatus" | "transactionStatus" | "initiator" | "dateInitiated"
>
type SortDirection = "asc" | "desc" | null

interface SortConfig {
  key: SortKey | null
  direction: SortDirection
}

const mockData: Transaction[] = [
  {
    id: 1,
    transactionId: "PB220345",
    requestStatus: "Pending",
    transactionStatus: "Pending",
    initiator: "Banke",
    dateInitiated: "10/04/2024 - 14:56",
    details: {
      transactionComment: "NA",
      authorizer: "Agbaje Jimi",
      dateApproved: "10/04/2024 - 14:56",
      accountNumber: "0978654356",
    },
  },
  {
    id: 2,
    transactionId: "PB220346",
    requestStatus: "Approved",
    transactionStatus: "Completed",
    initiator: "John",
    dateInitiated: "11/04/2024 - 09:30",
    details: {
      transactionComment: "Urgent transfer",
      authorizer: "Sarah Smith",
      dateApproved: "11/04/2024 - 10:15",
      accountNumber: "0978654357",
    },
  },
]

function SortableHeader({
  label,
  sortKey,
  sortConfig,
  onSort,
}: {
  label: string
  sortKey: SortKey
  sortConfig: SortConfig
  onSort: (key: SortKey) => void
}) {
  const isActive = sortConfig.key === sortKey

  return (
    <th
      className="px-4 py-3 text-left text-sm font-medium cursor-pointer hover:bg-zinc-800 transition-colors select-none"
      onClick={() => onSort(sortKey)}
    >
      <span className="flex items-center gap-1">
        {label}
        {isActive && sortConfig.direction === "asc" ? (
          <ArrowUp className="w-4 h-4" />
        ) : isActive && sortConfig.direction === "desc" ? (
          <ArrowDown className="w-4 h-4" />
        ) : (
          <ArrowUpDown className="w-4 h-4 opacity-50" />
        )}
      </span>
    </th>
  )
}

export function TransactionTable() {
  const [expandedRow, setExpandedRow] = useState<number | null>(null)
  const [entriesPerPage, setEntriesPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: null })

  const toggleRow = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id)
  }

  const handleSort = (key: SortKey) => {
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
    let data = mockData.filter(
      (item) =>
        item.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.initiator.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    if (sortConfig.key && sortConfig.direction) {
      data = [...data].sort((a, b) => {
        const aValue = a[sortConfig.key!]
        const bValue = b[sortConfig.key!]

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1
        return 0
      })
    }

    return data
  }, [searchTerm, sortConfig])

  return (
    <div className="w-full">
      {/* Controls */}
      <div className="flex items-center justify-between mb-4">
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
        <div className="flex items-center gap-2">
          <span className="text-sm text-zinc-600">Search:</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-zinc-300 rounded px-3 py-1 text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-zinc-200">
        <table className="w-full">
          <thead className="relative">
            <tr className="bg-zinc-900 text-white">
              <SortableHeader label="S/N" sortKey="id" sortConfig={sortConfig} onSort={handleSort} />
              <SortableHeader
                label="Transaction ID"
                sortKey="transactionId"
                sortConfig={sortConfig}
                onSort={handleSort}
              />
              <SortableHeader
                label="Request Status"
                sortKey="requestStatus"
                sortConfig={sortConfig}
                onSort={handleSort}
              />
              <SortableHeader
                label="Transaction Status"
                sortKey="transactionStatus"
                sortConfig={sortConfig}
                onSort={handleSort}
              />
              <SortableHeader label="Initiator" sortKey="initiator" sortConfig={sortConfig} onSort={handleSort} />
              <SortableHeader
                label="Date Initiated"
                sortKey="dateInitiated"
                sortConfig={sortConfig}
                onSort={handleSort}
              />
            </tr>
            {/* Gradient bottom border */}
            <tr>
              <td colSpan={6} className="h-[3px] bg-gradient-to-r from-[#FF8200] to-[#FF002B] p-0" />
            </tr>
          </thead>

          <tbody className="bg-white">
            {filteredAndSortedData.map((transaction) => (
              <>
                {/* Main Row */}
                <tr
                  key={transaction.id}
                  onClick={() => toggleRow(transaction.id)}
                  className="border-b border-zinc-200 cursor-pointer hover:bg-zinc-50 transition-colors"
                >
                  <td className="px-4 py-3 text-sm">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      {transaction.id}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{transaction.transactionId}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={transaction.requestStatus === "Pending" ? "text-orange-500" : "text-green-500"}>
                      {transaction.requestStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={transaction.transactionStatus === "Pending" ? "text-orange-500" : "text-green-500"}
                    >
                      {transaction.transactionStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{transaction.initiator}</td>
                  <td className="px-4 py-3 text-sm flex items-center justify-between">
                    {transaction.dateInitiated}
                    {expandedRow === transaction.id ? (
                      <ChevronUp className="w-4 h-4 text-zinc-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-400" />
                    )}
                  </td>
                </tr>

                {/* Expanded Details */}
                {expandedRow === transaction.id && (
                  <tr key={`${transaction.id}-details`} className="bg-zinc-50 border-b border-zinc-200">
                    <td colSpan={6} className="px-4 py-4">
                      <div className="grid grid-cols-2 gap-4 max-w-md">
                        <div>
                          <p className="text-sm font-medium text-zinc-700">Transaction Comment</p>
                        </div>
                        <div>
                          <p className="text-sm text-zinc-600">{transaction.details.transactionComment}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-zinc-700">Authorizer</p>
                        </div>
                        <div>
                          <p className="text-sm text-zinc-600">{transaction.details.authorizer}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-zinc-700">Date Approved</p>
                        </div>
                        <div>
                          <p className="text-sm text-zinc-600">{transaction.details.dateApproved}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-zinc-700">Account Number</p>
                        </div>
                        <div>
                          <p className="text-sm text-zinc-600">{transaction.details.accountNumber}</p>
                        </div>
                      </div>
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
export default TransactionTable