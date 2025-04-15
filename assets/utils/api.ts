import axios from 'axios';
import { handleError } from './handleError';
axios.defaults.baseURL = 'https://readjourney.b.goit.study/api';

export const signUp = async (name: string, email: string, password: string) => {
  try {
    const { data } = await axios.post('/users/signup', {
      name,
      email,
      password,
    });
    axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;
    return { user: data };
  } catch (error) {
    throw new Error(handleError(error));
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const { data } = await axios.post('/users/signin', {
      email,
      password,
    });
    axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;
    return { user: data };
  } catch (error) {
    throw new Error(handleError(error));
  }
};

export const signOut = async () => {
  try {
    const { data } = await axios.post('/users/signout');
    delete axios.defaults.headers.common.Authorization;
    return data.message;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

// const myUser = {
//   email: 'test@ukr.net',
//   name: 'test',
//   refreshToken:
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZmU1MWJkNTkxNDk2NGI0YTkxZThjOCIsImlhdCI6MTc0NDcyMDMxNywiZXhwIjoxNzQ1MzI1MTE3fQ.ZLx5OUcvMEDUff1ZqJRrwly46VE5Poed65GnUVQR894',
//   token:
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZmU1MWJkNTkxNDk2NGI0YTkxZThjOCIsImlhdCI6MTc0NDcyMDMxNywiZXhwIjoxNzQ0NzIzOTE3fQ.RvslDY8cR4IJwzL0aqWVoqtg-NUIjNS4dPDQbtOxfdU',
// };
