import * as yup from 'yup';

export const schema = yup.object().shape({
  title: yup.string().min(2).max(32).trim().required(),
  author: yup.string().min(2).max(32).trim().required(),
  totalPages: yup.number().positive().integer().required(),
});
