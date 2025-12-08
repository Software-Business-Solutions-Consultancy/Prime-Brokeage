import { useState } from 'react'
import DataTable, { type Column } from '../../components/shared/DataTable'
import { Button } from '../../components/shared/ui/button'
import Request from '/assets/img/request.svg'
import Send from '/assets/img/send.svg'
import { Modal } from '../../components/shared/Modal'
import Approved from '/assets/img/approved.svg'
import { ThumbsUp } from 'lucide-react'


const OperationsRequestReport = () => {
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
  { key: "action", label: "Action",
     render: (value) => (
      <div className="flex gap-3">
        <Button onClick={() => actionRequest('send')} variant='transparent' iconPosition='right' iconType='img' icon={Send} >Send</Button>
      </div>
    ), },
  
  
  { key: "initiator", label: "Initiator" },
  { key: "accountNumber", label: "Account Number" },
  { key: "dateInitiated", label: "Date Initiated" },
]


const actionRequest = (type: string) => {   
  console.log('actionRequest', type)
  setOpenModal(true)
  setactionType(type)
}

  return (
    <div>
      <div className='flex gap-4 items-center mb-6'>
        <img src={Request} alt="Report Icon" />
        <p className='font-bold text-[32px]'>Pending Requests</p>
      </div>
     

        <DataTable
        data={transactions}
        columns={columns}
        searchKeys={["transactionId", "initiator"]}
        expandedContent={(row) => (
          <div className="grid grid-cols-2 gap-4 max-w-md">
            <p className="text-sm font-medium text-zinc-700">Account Name</p>
            <p className="text-sm text-zinc-600">{row.accountName}</p>
            
          </div>
        )}
        
      />

      {
  actionType === 'send' && (

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)} title="" size='xl'>

              <div className='p-12'>

                <img src={Approved} alt="Action icon" className='flex items-center justify-center w-fit mx-auto'  />
                <div className=' pb-6 border-primary border-b'>

                <p className='font-bold text-[27px] justify-center text-center flex items-center'>{'Request has been sent for approval successfully'}</p>
                </div>
                  
                <div className='flex item-end justify-end mt-4'>
                <Button onClick={() => setOpenModal(false)}  icon={<ThumbsUp/>}>Okay</Button>
                </div>
              </div>
      </Modal>
  ) 
 }
    </div>
  )
}

export default OperationsRequestReport
