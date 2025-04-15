import axios from 'axios';

export const handleError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message;
  } else {
    return 'An error occurred. Please try again';
  }
};
