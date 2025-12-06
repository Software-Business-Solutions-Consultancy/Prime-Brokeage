import * as yup from 'yup';



// Auth Schemas
export const loginSchema = yup.object({
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 8 characters')
    .required('Password is required'),
  rememberMe: yup.boolean().default(false),
});

export const newRequestSchema = yup.object({
  faceValue: yup.string().required('This is required'),
  side: yup.string().required('This is required'),
  counterParty: yup.string().required('This is required'),
  settlementDate: yup.string().required('This is required'),
  securityName: yup.string().required('Security name is required'),
  securityType: yup.string().required('Security type is required'),
  priceYield: yup.string().required('Price yield is required'),
  accountName: yup.string().required('This is required'),
  accountNumber: yup
    .string()
    .min(10, 'Password must be at least 8 characters')
    .max(10, 'Password must be at least 8 characters')
    .required('Password is required'),
});

// Types
export type LoginFormData = yup.InferType<typeof loginSchema>;
export type newRequestFormData = yup.InferType<typeof newRequestSchema>;

