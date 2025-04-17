import axios from 'axios';
import { handleError } from './handleError';
import { getAuthStore } from '../store/useAuthStore';

axios.defaults.baseURL = 'https://readjourney.b.goit.study/api';
axios.interceptors.request.use(config => {
  const token = getAuthStore().user?.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

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

export const refreshUser = async () => {
  try {
    const { data } = await axios.get('/users/current');
    return { user: data };
  } catch (error) {
    throw new Error(handleError(error));
  }
};

export const signOut = async () => {
  try {
    const { data } = await axios.post('/users/signout');
    delete axios.defaults.headers.common.Authorization;
    return data;
  } catch (error) {
    throw new Error(handleError(error));
  }
};
