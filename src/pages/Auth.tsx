import React, { useState } from 'react'
import CustomerImg from '/assets/img/customer-auth.svg'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../components/shared/ui/input'
import { loginSchema, type LoginFormData } from '../core/libs/validations/validationSchemas';
import { cn } from '../core/libs/utils';
// import { useNavigate } from 'react-router';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

const Auth = () => {

      const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

  
      const {
    // register,
    handleSubmit,
    formState: { errors },
    // setError,
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });


  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  }
  return (
    <div className='flex h-screen'>
      <div className='w-1/2 px-[70px] pt-12'>
      <h4 className='pb-6 font-bold text-4xl'>CMB Prime Brokerage Portal</h4>
      <p className='pb-3 text-2xl'>Login</p>
      <p className='pb-4 text-[15px]'>Kindly sign in with your Coronation Merchant Bank credential to continue.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

      <div>
         <label htmlFor="userName" className="block text-sm font-medium text-black mb-1">
                      Username
                    </label>
            <Input placeholder='Username'  id='username' aria-invalid={!!errors.email}
                      className={cn(
                        'focus-visible:ring-app-primary',
                        errors.email && 'border-app-danger focus-visible:ring-app-danger'
                      )} />
      </div>
      <div>
         <label htmlFor="password" className="block text-sm font-medium text-black mb-1">
                      Password
                    </label>
                    <div className="relative">

            <Input placeholder='Password' type={showPassword ? 'text' : 'password'}  id='password' aria-invalid={!!errors.email}
                      className={cn(
                        'focus-visible:ring-app-primary',
                        errors.email && 'border-app-danger focus-visible:ring-app-danger'
                      )} />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-app-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-4 w-4" />
                        ) : (
                          <EyeIcon className="h-4 w-4" />
                        )}
                      </button>
                    </div>
      </div>
      <button type='submit' className='bg-[#BA68C8] text-white py-3 rounded-md transition-colors '> {isLoading ? 'Loading...' : 'Login'}</button>
        </form>
      </div>
      <div className='w/1-2 '>
        <img src={CustomerImg} alt="" className='flex items-center justify-center' />
      </div>
    </div>
  )
}

export default Auth
