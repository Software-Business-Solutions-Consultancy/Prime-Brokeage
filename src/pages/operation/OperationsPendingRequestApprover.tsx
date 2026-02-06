import { useState } from 'react'
import DataTable, { type Column } from '../../components/shared/DataTable'
import { Button } from '../../components/shared/ui/button'
import Request from '/assets/img/request.svg'
import Send from '/assets/img/send.svg'
import { Modal } from '../../components/shared/Modal'
import Approved from '/assets/img/approved.svg'
import { Ban, Eye, ThumbsUp, UserX, View, ViewIcon } from 'lucide-react'
import { useNavigate } from 'react-router'
import Declined from '/assets/img/declined.svg'


const OperationsRequestReportApproval = () => {
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState<string>('request')

  const approverTab = [
    {name: 'Customer Requests', id: 'request'},
    {name: 'Upload Approval Request', id: 'approver'},
  ]
    const [openModal, setOpenModal] = useState<boolean>(false);
  const [actionType, setactionType] = useState<string>('');

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
    accountName: "ANINYE GUA",
  },

]

         const approverData: any[] = [
  {
    id: 1,
    requestId: "PB220345",
    status: "Pending",
    transactionStatus: "Pending",
    initiator: "Banke",
    dateInitiated: "10/04/2024 - 14:56",
    transactionComment: "NA",
    authorizer: "Agbaje Jimi",
    dateApproved: "10/04/2024 - 14:56",
    accountNumber: "0978654356",
    accountName: "ANINYE HILARY OGUGUA",
    securityNumber: '03349394949'
  },
  {
    id: 2,
    requestId: "PB220345",
    status: "Pending",
    transactionStatus: "Pending",
    initiator: "Banke",
    dateInitiated: "10/04/2024 - 14:56",
    transactionComment: "NA",
    authorizer: "Agbaje Jimi",
    dateApproved: "10/04/2024 - 14:56",
    accountNumber: "0978654356",
    accountName: "ANINYE HILARY OGUGUA",
    securityNumber: '03349394949'
  },

]


const viewRequest = (data: any) => {
  sessionStorage.setItem('actionType', activeTab)
  console.log(data)
  navigate(`/operations/pending-request/view/${data.id}`)
}




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
  { key: "action", label: "Action",
     render: (row, value) => (
      <div className="flex gap-5">
        <Eye onClick={() => viewRequest(value)} color='#FF4116'/>
      </div>
    ), },
  
  
  { key: "initiator", label: "Initiator" },
  { key: "dateInitiated", label: "Date Initiated" },
  { key: "accountNumber", label: "Account Number" },
]

const approvalColumns: Column<any>[] = [
  {
    key: "id",
    label: "S/N",
    render: (value) => (
      <span className="flex items-center gap-2">
        {String(value)}
      </span>
    ),
  },
  { key: "transactionId", label: "Request ID" },
  { key: "action", label: "Action",
     render: (row, value) => (
      <div className="flex gap-5">
        <Eye onClick={() => viewRequest(value)} color='#FF4116'/>
      </div>
    ), },
  
  
  { key: "initiator", label: "Initiator" },
  { key: "dateInitiated", label: "Date Initiated" },
  { key: "accountNumber", label: "Security Number" },
]



const approverColumns: Column<any>[] = [
  {
    key: "id",
    label: "S/N",
    render: (value) => (
      <span className="flex items-center gap-2">
        {String(value)}
      </span>
    ),
  },
  { key: "requestId", label: "Request ID" },
  { key: "status", label: "Status" },
 
  { key: "authorizer", label: "Authorizer" },
  { key: "dateApproved", label: "Approved Date" },
  { key: "securityNumber", label: "Security Number" },
]


const actionRequest = (type: string) => {   
  console.log('actionRequest', type)
  setOpenModal(true)
  setactionType(type)
}


const decline = () => {
  console.log('decline')
  setOpenModal(true)
  setactionType('declined')
}



  return (
    <div>
      <div className='flex gap-4 items-center mb-6'>
        <img src={Request} alt="Report Icon" />
        <p className='font-bold text-[32px]'>Pending Requests</p>
      </div>
     

        <div className="grid grid-cols-2 mb-2">
          {
            approverTab?.map((item: any) => (
              <div onClick={() => setActiveTab(item.id)} className={`cursor-pointer flex items-center justify-center border-b-[3px] py-[10px] ${activeTab === item?.id ? 'border-b border-[#FF8200]' : 'border-b border-[#EBEAFF]'}`}>
                  {item?.name}
              </div>
            ))
          }
        </div>
        <DataTable
        data={activeTab === 'request' ? transactions: approverData}
        columns={activeTab === 'request' ? columns : approvalColumns}
        searchKeys={["transactionId", "initiator"]}
        isExpandable={false}
        expandedContent={(row) => (
          <div className="grid grid-cols-2 gap-4 max-w-md">
            {
              activeTab === 'request' ? (
                <>
                <p className="text-sm font-medium text-zinc-700">Account Name</p>
                <p className="text-sm text-zinc-600">{row.transactionComment}</p>
                </>
              ) : (
                <>
                <p className="text-sm font-medium text-zinc-700">Security Number</p>
                <p className="text-sm text-zinc-600">{row.securityNumber}</p>
                <p className="text-sm font-medium text-zinc-700">Comment</p>
                <p className="text-sm text-zinc-600">{row.transactionComment}</p>
                </>
              )
            }
            
            
          </div>
        )}
        
      />

      {
  ((actionType === 'send') || (actionType === 'declined')) && (

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)} title="" size='xl'>

              <div className='p-12'>

                <img src={actionType === 'send' ? Approved: Declined} alt="Action icon" className='flex items-center justify-center w-fit mx-auto'  />
                <div className=' pb-6  border-[#FF4116] border-b'>

                <p className='font-bold text-[27px] justify-center text-center flex items-center'>{actionType === 'send' ? 'Request has been sent for approval successfully' : 'Request sent back to the initator!'}</p>
                </div>
                  
                <div className='flex item-end justify-end mt-4'>
                <Button className='bg-gradient-to-r from-[#FF8200] to-[#FF002B]' onClick={() => navigate(-1)}  icon={<ThumbsUp/>}>Okay</Button>
                </div>
              </div>
      </Modal>
  ) 
 }

 {actionType === 'return' && (

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)} title="" size='full'>

              <div className='p-12'>

                <textarea placeholder='Comment here' className='text-area border w-full mb-6 p-4 ' name="" id="" rows={5}></textarea>
      <div className="grid grid-cols-2 gap-6">
          <Button type="button" onClick={() => decline()} variant='danger' icon={<Ban/>} > Decline </Button>
          <Button type="button" onClick={() => navigate(-1)} variant={'secondary'} icon={<UserX/>} > Cancel </Button>


      </div>
              </div>
      </Modal>
  )
}
    </div>
  )
}

export default OperationsRequestReportApproval
