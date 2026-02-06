import { Ban, ThumbsUp, UserX } from 'lucide-react'
import { useState } from 'react'
import DataTable, { type Column } from '../../components/shared/DataTable'
import { Modal } from '../../components/shared/Modal'
import { Button } from '../../components/shared/ui/button'
import Request from '/assets/img/request.svg'
import { useNavigate } from 'react-router'
import Approved from '/assets/img/approved.svg'
import Declined from '/assets/img/declined.svg'



const GmtReport = () => {
    const columns: Column<any>[] = [
      {
        key: "id",
        label: "S/N",
        render: (value) => (
          <span className="flex items-center gap-2">
            {String(value)}
          </span>
        ),
      },
      { key: "transactionId", label: "Transaction ID" },
      {
        key: "action",
        label: "Request Status",
        render: () => (
          <div className="flex item-center gap-5">
            <p  className='text-[#209020] underline decoration-[#209020] cursor-pointer '>Process</p>
          </div>
        ),
      },
      {
        key: "action",
        label: "Transaction Status",
        render: () => (
          <div className="flex item-center gap-5">
            <p  className='text-[#209020] underline decoration-[#209020] cursor-pointer '>Process</p>
          </div>
        ),
      },
      
      { key: "initiator", label: "Initiator" },
      { key: "dateInitiated", label: "Date Initiated" },
    ]


       const transactions: any[] = [
  {
    id: 1,
    transactionId: "PB220345",
    requestStatus: "Pending",
    transactionStatus: "Pending",
    initiator: "Banke",
    dateInitiated: "10/04/2024 - 14:56",
    transactionComment: "NA",
    authorizer: "Agbaje Jimi",
    dateApproved: "10/04/2024 - 14:56",
    accountNumber: "0978654356",
  },
  {
    id: 2,
    transactionId: "PB220346",
    requestStatus: "Approved",
    transactionStatus: "Completed",
    initiator: "John",
    dateInitiated: "11/04/2024 - 09:30",
    transactionComment: "Urgent transfer",
    authorizer: "Sarah Smith",
    dateApproved: "11/04/2024 - 10:15",
    accountNumber: "0978654357",
  },
]

  return (
    <div>
           <div className='flex gap-4 items-center mb-6'>
        <img src={Request} alt="Report Icon" />
        <p className='font-bold text-[32px]'>Report</p>
      </div>
     

        <DataTable
        data={transactions}
        columns={columns}
        hasExport={true}
        hasFilter={true}
        searchKeys={["transactionId", "initiator"]}
        expandedContent={(row) => (
          <div className="grid grid-cols-2 gap-4 max-w-md">
            <p className="text-sm font-medium text-zinc-700">Account Name</p>
            <p className="text-sm text-zinc-600">{row.transactionComment}</p>
            <p className="text-sm font-medium text-zinc-700">Security Name</p>
            <p className="text-sm text-zinc-600">{row.authorizer}</p>
            <p className="text-sm font-medium text-zinc-700">Security Type</p>
            <p className="text-sm text-zinc-600">{row.dateApproved}</p>
            <p className="text-sm font-medium text-zinc-700">Face Value</p>
            <p className="text-sm text-zinc-600">{row.accountNumber}</p>
            <p className="text-sm font-medium text-zinc-700">Price/Yield</p>
            <p className="text-sm text-zinc-600">{'row.accountNumber'}</p>
            <p className="text-sm font-medium text-zinc-700">Settlement Date</p>
            <p className="text-sm text-zinc-600">{'10/04/2025'}</p>
            <p className="text-sm font-medium text-zinc-700">Side</p>
            <p className="text-sm text-zinc-600">{'Sell'}</p>
            <p className="text-sm font-medium text-zinc-700">Counter Party</p>
            <p className="text-sm text-zinc-600">{'CMD'}</p>
          </div>
        )}
        
      />
    </div>
  )
}

export default GmtReport