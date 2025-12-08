import DataTable, { type Column } from '../../components/shared/DataTable'
import Request from '/assets/img/request.svg'
const CustomerReport = () => {


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



const columns: Column<any>[] = [
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
  {
    key: "transactionStatus",
    label: "Transaction Status",
    render: (value) => (
      <span className={value === "Pending" ? "text-orange-500" : "text-green-500"}>{String(value)}</span>
    ),
  },
  { key: "initiator", label: "Initiator" },
  { key: "dateInitiated", label: "Date Initiated" },
]


  return (
     <div>
      
      <div className='flex gap-4 items-center mb-6'>
        <img src={Request} alt="Report Icon" />
        <p className='font-bold text-[32px]'>Requests Pending Authorization</p>
      </div>
     

        <DataTable
        data={transactions}
        columns={columns}
        searchKeys={["transactionId", "initiator"]}
        expandedContent={(row) => (
          <div className="grid grid-cols-2 gap-4 max-w-md">
            <p className="text-sm font-medium text-zinc-700">Transaction Comment</p>
            <p className="text-sm text-zinc-600">{row.transactionComment}</p>
            <p className="text-sm font-medium text-zinc-700">Authorizer</p>
            <p className="text-sm text-zinc-600">{row.authorizer}</p>
            <p className="text-sm font-medium text-zinc-700">Date Approved</p>
            <p className="text-sm text-zinc-600">{row.dateApproved}</p>
            <p className="text-sm font-medium text-zinc-700">Account Number</p>
            <p className="text-sm text-zinc-600">{row.accountNumber}</p>
            <p className="text-sm font-medium text-zinc-700">Security Name</p>
            <p className="text-sm text-zinc-600">{'row.accountNumber'}</p>
          </div>
        )}
        
      />
    </div>
  )
}

export default CustomerReport
