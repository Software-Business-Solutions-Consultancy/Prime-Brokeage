// import { useNavigate } from "react-router"
import DataTable, { type Column } from '../../components/shared/DataTable'
import Request from '/assets/img/request.svg'

const InbranchSortingMerging = () => {
    // const navigate = useNavigate()
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
    accountName: "ANINYE HILARY OGUGUA",
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
    accountName: "ANINYE HILARY OGUGUA",
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
  
  
  { key: "initiator", label: "Initiator" },
  { key: "dateInitiated", label: "Date Initiated" },
  { key: "accountNumber", label: "Account Number" },
  { key: "accountName", label: "Account Name" },
]


  return (
    <div>
       <div className='flex gap-4 items-center mb-6'>
        <img src={Request} alt="Report Icon" />
        <p className='font-bold text-[32px]'>Sorting and Matching Requests</p>
      </div>
      <p className="text-[#FF0000] mb-[30px]">Authorized Customer Request</p>
      <DataTable
              data={transactions}
              columns={columns}
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
                </div>
              )}
              
            />


            
    </div>
  )
}

export default InbranchSortingMerging
