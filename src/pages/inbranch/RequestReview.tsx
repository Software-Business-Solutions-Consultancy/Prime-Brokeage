import { Ban, ThumbsUp, UserX } from 'lucide-react'
import { useState } from 'react'
import DataTable, { type Column } from '../../components/shared/DataTable'
import { Modal } from '../../components/shared/Modal'
import { Button } from '../../components/shared/ui/button'
import Request from '/assets/img/request.svg'
import Return from '/assets/img/return.svg'
import Send from '/assets/img/send.svg'
import { useNavigate } from 'react-router'
import Approved from '/assets/img/approved.svg'
import Declined from '/assets/img/declined.svg'


const RequestReview = () => {
  type actions = 'send' | 'return' | 'declined'
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [actionType, setactionType] = useState<string>('');
const navigate = useNavigate()
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


const actionRequest = (type: actions) => {   
  console.log('actionRequest', type)
  setOpenModal(true)
  setactionType(type)
}

const decline = () => {
  console.log('decline')
  setOpenModal(true)
  setactionType('declined')
}



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
    key: "action",
    label: "Action",
    render: (value) => (
      <div className="flex gap-3">
        <Button onClick={() => actionRequest('send')} variant='transparent' iconPosition='right' iconType='img' icon={Send} >Send</Button>
        <Button onClick={() => actionRequest('return')} variant='transparent' iconPosition='right' iconType='img' icon={Return} >Return</Button>
      </div>
    ),
  },
  
  { key: "initiator", label: "Initiator" },
  { key: "accountNumber", label: "Account Number" },
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

{
  ((actionType === 'send') || (actionType === 'declined')) && (

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)} title="" size='xl'>

              <div className='p-12'>

                <img src={actionType === 'send' ? Approved: Declined} alt="Action icon" className='flex items-center justify-center w-fit mx-auto'  />
                <div className=' pb-6 border-primary border-b'>

                <p className='font-bold text-[27px] justify-center text-center flex items-center'>{actionType === 'send' ? 'Request has been sent for approval successfully' : 'Request sent back to customer'}</p>
                </div>
                  
                <div className='flex item-end justify-end mt-4'>
                <Button onClick={() => navigate(-1)}  icon={<ThumbsUp/>}>Okay</Button>
                </div>
              </div>
      </Modal>
  ) 
 }
 {actionType === 'return' && (

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)} title="" size='full'>

              <div className='p-12'>

                <textarea placeholder='Comment here' className='text-area border w-full mb-6 p-4 ' name="" id="" rows={5}></textarea>
      <div className="grid grid-cols-3 gap-6">
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

export default RequestReview
