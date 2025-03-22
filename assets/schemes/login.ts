import * as yup from 'yup';

export const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .trim()
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Invalid email format')
    .required(),
  password: yup.string().min(7).max(32).trim().required(),
});
