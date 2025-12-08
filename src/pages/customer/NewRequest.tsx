import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Input } from "../../components/shared/ui/input";
import { cn } from "../../core/libs/utils";
import {
  newRequestSchema,
  type newRequestFormData,
} from "../../core/libs/validations/validationSchemas";
import Request from "/assets/img/request.svg";
import { Button } from "../../components/shared/ui/button";
import { LogInIcon, UserPen, UserX } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

const NewRequest = () => {
    const [intro, setIntro] = useState<string>('Fill all the fields below');
    const [showNext, setshowNext] = useState(false);
    const navigate = useNavigate()
  const {
    // register,
    // handleSubmit,
    formState: { errors },
    // setError,
  } = useForm<newRequestFormData>({
    resolver: yupResolver(newRequestSchema),
    defaultValues: {
      faceValue: "",
      side: "",
      counterParty: "",
      securityName: "",
      securityType: "",
      settlementDate: "",
      priceYield: "",
      accountName: "",
      accountNumber: "",
    },
  });

  const preview = (status: any) => {
    setshowNext(!status);
    setIntro('Please confirm all the details you have provided');
  }

  const submit = () => {
    console.log('submit', showNext);
    navigate('/customer/pending-request')
    // Submit logic here
  }

  return (
    <div>
      <div className="flex gap-4 items-center border-primary border-b mb-6">
        <img src={Request} alt="Report Icon" />
        <p className="font-bold text-[32px]">New Request</p>
      </div>
      <p>{intro}</p>
      <form>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mt-6 mb-6">
          <div>
            <label
              htmlFor="accountNumber"
              className="block text-sm font-medium text-black mb-1"
            >
              Account Number
            </label>
            <Input
              type="number"
              placeholder="Account Number"
              id="accountNumber"
              aria-invalid={!!errors.accountNumber}
              className={cn(
                "focus-visible:ring-primary",
                errors.accountNumber &&
                  "border-app-danger focus-visible:ring-danger"
              )}
            />
          </div>
          <div>
            <label
              htmlFor="faceValue"
              className="block text-sm font-medium text-black mb-1"
            >
              Face Value
            </label>
            <Input
              placeholder="Face Value"
              id="faceValue"
              aria-invalid={!!errors.faceValue}
              className={cn(
                "focus-visible:ring-primary",
                errors.faceValue &&
                  "border-app-danger focus-visible:ring-danger"
              )}
            />
          </div>
          <div>
            <label
              htmlFor="accountName"
              className="block text-sm font-medium text-black mb-1"
            >
              Account Name
            </label>
            <Input
              type="text"
              placeholder="Account Name"
              id="accountName"
              aria-invalid={!!errors.accountName}
              className={cn(
                "focus-visible:ring-primary",
                errors.accountName &&
                  "border-app-danger focus-visible:ring-danger"
              )}
            />
          </div>
          <div>
            <label
              htmlFor="priceYield"
              className="block text-sm font-medium text-black mb-1"
            >
             Price Yield
            </label>
            <Input
              type="text"
              placeholder="Price Yield"
              id="priceYield"
              aria-invalid={!!errors.priceYield}
              className={cn(
                "focus-visible:ring-primary",
                errors.priceYield &&
                  "border-app-danger focus-visible:ring-danger"
              )}
            />
          </div>
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
              htmlFor="settlementDate"
              className="block text-sm font-medium text-black mb-1"
            >
             Settlement Date
            </label>
            <Input
              type="date"
              placeholder="Settlement Date"
              id="settlementDate"
              aria-invalid={!!errors.settlementDate}
              className={cn(
                "focus-visible:ring-primary",
                errors.settlementDate &&
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
          <div>
            <label
              htmlFor="side"
              className="block text-sm font-medium text-black mb-1"
            >
             Side
            </label>
            <Input
              placeholder="Side"
              id="side"
              aria-invalid={!!errors.side}
              className={cn(
                "focus-visible:ring-primary",
                errors.side &&
                  "border-app-danger focus-visible:ring-danger"
              )}
            />
          </div>
          <div>
            <label
              htmlFor="counterParty"
              className="block text-sm font-medium text-black mb-1"
            >
             Counter Party
            </label>
            <Input
              placeholder="Counter Party"
              id="counterParty"
              aria-invalid={!!errors.counterParty}
              className={cn(
                "focus-visible:ring-primary",
                errors.counterParty &&
                  "border-app-danger focus-visible:ring-danger"
              )}
            />
          </div>

        </div>

        <div className="grid grid-cols-2 w-full gap-6">
          <Button type="button" onClick={() => preview(showNext)} variant={showNext ? 'outline' : 'primary'} icon={showNext ? <UserPen/> : <LogInIcon/>}> {showNext ? 'Edit' : 'Continue'} </Button>
          <Button type="button" onClick={() => submit()} variant={showNext ? 'primary' : 'secondary'} icon={showNext ? <LogInIcon/> :<UserX/>} > {showNext ? 'Submit' : 'Cancel'} </Button>
            
        </div>
      </form>
      <div></div>
    </div>
  );
};

export default NewRequest;
