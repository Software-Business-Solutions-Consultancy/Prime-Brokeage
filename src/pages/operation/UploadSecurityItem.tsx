import { useState } from "react";
import Request from "/assets/img/request.svg";
import { Button } from "../../components/shared/ui/button";
import { LogInIcon, ThumbsUp, UserPen, UserX } from "lucide-react";
import {
  newRequestSchema,
  type newRequestFormData,
} from "../../core/libs/validations/validationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Input } from "../../components/shared/ui/input";
import { cn } from "../../core/libs/utils";
import { useNavigate } from "react-router";
import { Modal } from "../../components/shared/Modal";
import Approved from '/assets/img/approved.svg'
import { FileInput } from "../../components/shared/ui/fileupload";



const UploadSecurityItem = () => {
        const [intro, setIntro] = useState<string>('Kindly fill all the fields below');
        const navigate = useNavigate()
  const [actionType, setactionType] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);

        const {
            // register,
            // handleSubmit,
            formState: { errors },
            // setError,
          } = useForm<newRequestFormData>({
            resolver: yupResolver(newRequestSchema),
            defaultValues: {
              securityName: "",
              securityType: "",
              
            },
          });

           const preview = (status: any) => {
    setIntro('Please confirm all the details you have provided');
  }

  const submit = () => {
      setOpenModal(true)
  setactionType('send')

  }

  const cancel = () => {
    navigate('/customer/pending-request')
    // Submit logic here
  }

  const handleFileUpload = (file: File | null) => {
  console.log(file)
//   setHasFile(true)
  
} 

  return (
    <div>
        <div className='flex gap-4 items-center mb-6'>
        <img src={Request} alt="Report Icon" />
        <p className='font-bold text-[32px]'>Upload Security Item</p>
      </div>
            <p className="text-red-500">{intro}</p>
            <form >
                <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mt-6 mb-6">
         
          <div>
            <label
              htmlFor="securityName"
              className="block text-sm font-medium text-black mb-1"
            >
             Security Name
            </label>
            <Input
              type="text"
              placeholder="Security Name"
              id="securityName"
              aria-invalid={!!errors.securityName}
              className={cn(
                "focus-visible:ring-primary",
                errors.securityName &&
                  "border-app-danger focus-visible:ring-danger"
              )}
            />
          </div>
        
          <div>
            <label
              htmlFor="securityType"
              className="block text-sm font-medium text-black mb-1"
            >
             Security Type
            </label>
            <Input
              placeholder="Security Type"
              id="securityType"
              aria-invalid={!!errors.securityType}
              className={cn(
                "focus-visible:ring-primary",
                errors.securityType &&
                  "border-app-danger focus-visible:ring-danger"
              )}
            />
          </div>

          <div className="col-span-2">
            <p className="text-center">OR</p>
          </div>

          <div className="flex gap-10 items-center col-span-2 mb-12">
                      <p className='text-sm text-[#212529] '>Excel/CSV Upload</p>
                      <FileInput className='border w-3/4' onFileChange={handleFileUpload}/>
            
          </div>
         
        </div>

            </form>
        <div className="grid grid-cols-2 w-full gap-6">
          <Button className="btn-main"  onClick={() => submit()}  icon={ <LogInIcon/>}> Submit </Button>
          <Button type="button" variant="secondary" onClick={() => cancel()} icon={<UserX/>} > Cancel </Button>
            
        </div>

            {
  actionType === 'send' && (

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)} title="" size='xl'>

              <div className='p-12'>

                <img src={Approved} alt="Action icon" className='flex items-center justify-center w-fit mx-auto'  />
                <div className=' pb-6 border-primary border-b'>

                <p className='font-bold text-[27px] justify-center text-center flex items-center'>{'Request has been sent for approval successfully'}</p>
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

export default UploadSecurityItem