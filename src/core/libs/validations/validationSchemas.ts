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

// Types
export type LoginFormData = yup.InferType<typeof loginSchema>;

