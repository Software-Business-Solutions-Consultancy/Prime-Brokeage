// import { useNavigate } from "react-router"
import DataTable, { type Column } from '../../components/shared/DataTable'
import { Button } from '../../components/shared/ui/button'
import Request from '/assets/img/request.svg'
import Excel from '/assets/img/mexcel.png'
import SortingMerge from '/assets/img/sortingmerge.svg'
import { FileInput } from '../../components/shared/ui/fileupload'
import { useState } from 'react'
import { ArrowDownWideNarrow, ThumbsUp } from 'lucide-react'
import { BloombergMergedTable } from '../../components/shared/BloomberMergedTable'
import { Modal } from '../../components/shared/Modal'
import { useNavigate } from 'react-router'
import Approved from '/assets/img/approved.svg'


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


const [hasFile, setHasFile] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false);
const navigate = useNavigate()

const handleFileUpload = (file: File | null) => {
  console.log(file)
  setHasFile(true)
  
} 


const sortMatch = () => {
  console.log('sortMatch')
  setShowMergeResult(true)
}


const bloombergData: any[] = [
  {
    id: 1,
    sn: "1",
    customerDetails: "0013456786\nANNYE HILARY ODUWA",
    customerRequest: {
      price: "50,000,000",
      securityName: "Lorem Iusmp",
      qty: "Lorem Iusmp",
      side: "Lorem Iusmp",
    },
    bloombergOutput: {
      price: "50,000,000",
      securityName: "Lorem Iusmp",
      qty: "Lorem Iusmp",
      side: "Lorem Iusmp",
    },
  },
  {
    id: 2,
    sn: "2",
    customerDetails: "0013456786\nANNYE HILARY ODUWA",
    customerRequest: {
      price: "50,000,000",
      securityName: "Lorem Iusmp",
      qty: "Lorem Iusmp",
      side: "Lorem Iusmp",
    },
    bloombergOutput: {
      price: "50,000,000",
      securityName: "Lorem Iusmp",
      qty: "Lorem Iusmp",
      side: "Lorem Iusmp",
    },
  },
  {
    id: 3,
    sn: "3",
    customerDetails: "0013456786\nANNYE HILARY ODUWA",
    customerRequest: {
      price: "50,000,000",
      securityName: "Lorem Iusmp",
      qty: "Lorem Iusmp",
      side: "Lorem Iusmp",
    },
    bloombergOutput: {
      price: "50,000,000",
      securityName: "Lorem Iusmp",
      qty: "Lorem Iusmp",
      side: "Lorem Iusmp",
    },
  },
]

const bloombergRequestColumns = [
  // { key: "customerDetails" as const, label: "Customer Details", sortable: true },
  { key: "price" as const, label: "Price", sortable: true },
  { key: "securityName" as const, label: "Security Name", sortable: true },
  { key: "qty" as const, label: "Qty", sortable: true },
  { key: "side" as const, label: "Side", sortable: true },
]

const bloombergOutputColumns = [
  { key: "price" as const, label: "Price", sortable: true },
  { key: "securityName" as const, label: "Security Name", sortable: true },
  { key: "qty" as const, label: "Qty", sortable: true },
  { key: "side" as const, label: "Side", sortable: true },
]

const bloombergSharedColumns = [
  {
    key: "sn",
    label: "S/N",
    render: (value: any) => (
      <span className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-purple-500" />
        {String(value)}
      </span>
    ),
  },
  {
    key: "customerNumber",
    label: "Customer Details",
    render: (value: any, row: any) => (
      <div className="text-sm">
        <div>{row.customerNumber}</div>
        <div className="text-zinc-600">{row.customerDetails}</div>
      </div>
    ),
  },
]

const [showMergeResult, setShowMergeResult] = useState<boolean>(false)


const confirmSortMatch = () => {
setOpenModal(true)
navigate('/gmt/sorted-merged') 
}
  return (
    <div>
       <div className='flex gap-4 items-center mb-6'>
        <img src={Request} alt="Report Icon" />
        <p className='font-bold text-[32px]'>Sorting and Matching Requests</p>
      </div>
      {
        !hasFile && !showMergeResult && (
          <div>

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


      <div className='flex items-center gap-4 mt-[36px]'>
          <p className='text-sm text-[#212529] '>Bloomberg Report</p>
          <FileInput className='w-2/4' onFileChange={handleFileUpload}/>
        
        <Button iconType='img' icon={Excel} className='bg-gradient-to-r from-[#FF8200] to-[#FF002B]'>Upload</Button>
      </div>
          </div>
        )
      }

      {
        hasFile && !showMergeResult && (
          <div>
            <p className="text-[#FF0000] mb-[30px]"> Customer Request</p>
      
      <DataTable
              data={transactions}
              columns={columns}
              isExpandable={false}
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
            <p className="text-[#FF0000] mb-[30px]">Bloomberg Request</p>
      
      <DataTable
              data={transactions}
              columns={columns}
              isExpandable={false}
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

             <div className='flex items-center gap-4 mt-[36px]'>
          <p className='text-sm text-[#212529] '>Sorting / Matching</p>
        
        <Button onClick={() => sortMatch()}  icon={<ArrowDownWideNarrow/>} className='bg-gradient-to-r from-[#FF8200] to-[#FF002B]'>Sort / Match Request</Button>
      </div>
            
          </div>
        )
      }


      {
        showMergeResult &&
        <div>
      <p className="text-[#FF0000] mb-[30px]">Sorting and Merge Output</p>

          <BloombergMergedTable
              data={bloombergData}
              sharedColumns={bloombergSharedColumns}
              requestColumns={bloombergRequestColumns}
              outputColumns={bloombergOutputColumns}
              searchKeys={["customerNumber", "customerName"]}
            />

                    <Button onClick={() => confirmSortMatch()} iconType='img' icon={SortingMerge} className='bg-gradient-to-r from-[#FF8200] to-[#FF002B] mt-4'>Confirm Sorting / Matching </Button>

        </div>

      }

      {
  openModal && (

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)} title="" size='xl'>

              <div className='p-12'>

                <img src={Approved} alt="Action icon" className='flex items-center justify-center w-fit mx-auto'  />
                <div className=' pb-6 border-primary border-b'>

                <p className='font-bold text-[27px] justify-center text-center flex items-center'>Sccessful request sent for payment</p>
                </div>
                  
                <div className='flex item-end justify-end mt-4'>
                <Button className='bg-gradient-to-r from-[#FF8200] to-[#FF002B]' onClick={() => navigate(-1)}  icon={<ThumbsUp/>}>Okay</Button>
                </div>
              </div>
      </Modal>
  ) 
 }


            
    </div>
  )
}

export default InbranchSortingMerging
