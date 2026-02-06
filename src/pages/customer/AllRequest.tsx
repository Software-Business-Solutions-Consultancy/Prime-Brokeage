import DataTable, { type Column } from '../../components/shared/DataTable'
import Request from '/assets/img/request.svg'

const AllRequest = () => {



interface Transaction {
  id: number
  transactionId: string
  requestStatus: string
  authorizer: string
  dateInitiated: string
  transactionComment: string
  dateApproved: string
}

const transactions: Transaction[] = [
  {
    id: 1,
    transactionId: "PB220345",
    requestStatus: "Pending",
    authorizer: "Banke",
    dateInitiated: "10/04/2024 - 14:56",
    transactionComment: "NA",
    dateApproved: "10/04/2024 - 14:56",
  },
 
  {
    id: 1,
    transactionId: "PB220345",
    requestStatus: "Pending",
    authorizer: "Banke",
    dateInitiated: "10/04/2024 - 14:56",
    transactionComment: "NA",
    dateApproved: "10/04/2024 - 14:56",
  },
 
  {
    id: 1,
    transactionId: "PB220345",
    requestStatus: "Pending",
    authorizer: "Banke",
    dateInitiated: "10/04/2024 - 14:56",
    transactionComment: "NA",
    dateApproved: "10/04/2024 - 14:56",
  },
 
  {
    id: 1,
    transactionId: "PB220345",
    requestStatus: "Pending",
    authorizer: "Banke",
    dateInitiated: "10/04/2024 - 14:56",
    transactionComment: "NA",
    dateApproved: "10/04/2024 - 14:56",
  },
 
  {
    id: 1,
    transactionId: "PB220345",
    requestStatus: "Pending",
    authorizer: "Banke",
    dateInitiated: "10/04/2024 - 14:56",
    transactionComment: "NA",
    dateApproved: "10/04/2024 - 14:56",
  },
 
]

const columns: Column<Transaction>[] = [
  {
    key: "id",
    label: "S/N",
    render: (value) => (
      <span className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-500" />
        {String(value)}
      </span>
    ),
  },
  { key: "transactionId", label: "Transaction ID" },
  {
    key: "requestStatus",
    label: "Request Status",
    render: (value) => (
      <span className={value === "Pending" ? "text-orange-500" : "text-green-500"}>{String(value)}</span>
    ),
  },
  
  { key: "authorizer", label: "Initiator" },
  { key: "dateInitiated", label: "Date Approved" },
  { key: "transactionComment", label: "Comment" },
]

  return (
    <div>
      
      <div className='flex gap-4 items-center mb-6 border-b border-[#BA68C8]'>
        <img src={Request} alt="Report Icon" />
        <p className='font-bold text-[32px]'>Requests Pending Authorization</p>
      </div>
     

        <DataTable
        data={transactions}
        columns={columns}
        isExpandable={false}
        searchKeys={["transactionId"]}
        expandedContent={(row) => (
          <div className="grid grid-cols-2 gap-4 max-w-md">
            <p className="text-sm font-medium text-zinc-700">Transaction Comment</p>
            <p className="text-sm text-zinc-600">{row.transactionComment}</p>
            <p className="text-sm font-medium text-zinc-700">Authorizer</p>
            <p className="text-sm text-zinc-600">{row.authorizer}</p>
            <p className="text-sm font-medium text-zinc-700">Date Approved</p>
            <p className="text-sm text-zinc-600">{row.dateApproved}</p>
            <p className="text-sm font-medium text-zinc-700">Account Number</p>
          </div>
        )}
        
      />
    </div>
  )
}

export default AllRequest
