import axios from 'axios';
import Cookies from 'js-cookie';

import { Book, BookState, User } from './definitions';
import { getAuthStore } from './store/store';
import { handleError } from './utils/handleError';

axios.defaults.baseURL = 'https://readjourney.b.goit.study/api';
axios.interceptors.request.use(config => {
  const token = getAuthStore().user?.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
      delete axios.defaults.headers.common.Authorization;
      Cookies.remove('token');
    }

    return Promise.reject(error);
  }
);

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
    Cookies.set('token', data.token);
    return { user: data };
  } catch (error) {
    throw new Error(handleError(error));
  }
};

export const signOut = async () => {
  try {
    const { data } = await axios.post('/users/signout');
    return data;
  } catch (error) {
    throw new Error(handleError(error));
  } finally {
    delete axios.defaults.headers.common.Authorization;
    Cookies.remove('token');
  }
};

export const refreshUser = async (token: string): Promise<User> => {
  try {
    const { data } = await axios.get('/users/current', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

export const getRecomendedBooks = async ({
  token,
  title,
  author,
  page,
  limit,
}: {
  token?: string;
} & Partial<BookState>) => {
  try {
    const { data } = await axios.get('/books/recommend', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        title,
        author,
        page,
        limit,
      },
    });

    return data;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

export const addNewBook = async ({
  title,
  author,
  totalPages,
}: Partial<Book>) => {
  try {
    const { data } = await axios.post('/books/add', {
      title,
      author,
      totalPages,
    });

    return data;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

export const addToLibrary = async (id: string) => {
  try {
    const { data } = await axios.post(`/books/add/${id}`);

    return data;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

export const deleteBook = async (id: string) => {
  try {
    const { data } = await axios.delete(`/books/remove/${id}`);

    return data;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

export const getLibrary = async (token?: string) => {
  try {
    const { data } = await axios.get('/books/own', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

export const readingStart = async ({
  id,
  page,
}: {
  id: string;
  page: number;
}) => {
  try {
    const { data } = await axios.post('/books/reading/start', { id, page });

    return data;
  } catch (error) {
    {
      throw new Error(handleError(error));
    }
  }
};

export const readingStop = async ({
  id,
  page,
}: {
  id: string;
  page: number;
}) => {
  try {
    const { data } = await axios.post('/books/reading/finish', { id, page });

    return data;
  } catch (error) {
    {
      throw new Error(handleError(error));
    }
  }
};

export const getBook = async ({
  token,
  id,
}: {
  token?: string;
  id: string;
}) => {
  try {
    const { data } = await axios.get(`/books/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    throw new Error(handleError(error));
  }
};
