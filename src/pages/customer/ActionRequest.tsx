import { Ban, ThumbsUp, UserX } from 'lucide-react'
import DataTable, { type Column } from '../../components/shared/DataTable'
import Request from '/assets/img/request.svg'
import Approved from '/assets/img/approved.svg'
import Declined from '/assets/img/declined.svg'
import { Button } from '../../components/shared/ui/button'
import { useNavigate } from 'react-router'
import { Modal } from '../../components/shared/Modal'
import { useEffect, useState } from 'react'

const ActionRequest = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [actionType, setactionType] = useState<string>('');
const navigate = useNavigate()
  interface Request {
  id: string
  initiator: string
  dateInitiated: string
  accountNumber: string
  accountName: string
}


const requests: Request[] = [
  {
    id: "PB5520345", 
    initiator: "John Doe",
    dateInitiated: "10/04/2024 - 14:56",
    accountNumber: "1234567890",
    accountName: "John's Investment Account",
  },
 

]

const columns: Column<Request>[] = [
  {
    label: 'Transaction ID', key: 'id',
  },
  { 
    label: 'Initiator', key: 'initiator',
  },
  {
    label: 'Date Initiated', key: 'dateInitiated',
  },
  {
    label: 'Account Number', key: 'accountNumber',
  },
  {
    label: 'Account Name', key: 'accountName',
  },
];


const approve = () => {
  console.log('approve')
  setOpenModal(true)
  setactionType('approve')
}


const decline = () => {   
  console.log('decline')
  setOpenModal(true)
  setactionType('decline')
}

useEffect(() => { 
  console.log('actionType', actionType) 
})



  return (
    <div>
         <div className='flex gap-4 items-center mb-6'>
        <img src={Request} alt="Report Icon" />
        <p className='font-bold text-[32px]'>Action Request</p>
      </div>
      <div className='mb-3'>

       <DataTable
              data={requests}
              columns={columns}
              isExpandable={true}
              showSearch={false}
              expandedContent={() => (
                <div className="grid grid-cols-2 gap-4 max-w-md">
                  <p className="text-sm font-medium text-zinc-700">Security Name</p>
                  <p className="text-sm text-zinc-600">Lorem</p>
                  <p className="text-sm font-medium text-zinc-700">Security Type</p>
                  <p className="text-sm text-zinc-600">Lorem</p>
                  <p className="text-sm font-medium text-zinc-700">Face Value</p>
                  <p className="text-sm text-zinc-600">Lorem</p>
                  <p className="text-sm font-medium text-zinc-700">Price Yield</p>
                  <p className="text-sm text-zinc-600">50,000</p>
                  <p className="text-sm font-medium text-zinc-700">Settlement Date</p>
                  <p className="text-sm text-zinc-600">10/11/2005</p>
                  <p className="text-sm font-medium text-zinc-700">Side</p>
                  <p className="text-sm text-zinc-600">Sell</p>
                  <p className="text-sm font-medium text-zinc-700">Counter party</p>
                  <p className="text-sm text-zinc-600">CMB</p>

                </div>
              )}
            />
      </div>
      <div className='my-4 pb-2  border-primary border-b'>
        <p>Comment and Approval</p>


      </div>
      <textarea placeholder='Comment here' className='text-area border w-full mb-6 p-4 ' name="" id="" rows={5}></textarea>
      <div className="grid grid-cols-3 gap-6">
            <Button type="button" onClick={() => approve()} className='bg-[#008000]' > Approve </Button>
          <Button type="button" onClick={() => decline()} variant='danger' icon={<Ban/>} > Decline </Button>
          <Button type="button" onClick={() => navigate(-1)} variant={'secondary'} icon={<UserX/>} > Cancel </Button>


      </div>



      <Modal isOpen={openModal} onClose={() => setOpenModal(false)} title="Decline Request" size='xl'>

              <div className='p-12'>

                <img src={actionType === 'approve' ? Approved: Declined} alt="Action icon" className='flex items-center justify-center w-fit mx-auto'  />
                <div className=' pb-6 border-primary border-b'>

                <p className=' font-bold text-[27px] text-center flex items-center'>{ actionType === 'approve' ? 'Request has been sent back to the Initiator' : 'Request has been successfully approved'}</p>
                </div>
                  
                <div className='flex item-end justify-end mt-4'>
                <Button onClick={() => navigate(-1)}  icon={<ThumbsUp/>}>Okay</Button>
                </div>
              </div>
      </Modal>
    </div>



  )
}

export default ActionRequest
