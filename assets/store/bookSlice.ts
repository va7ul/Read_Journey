import { StateCreator } from 'zustand';
import { BookState, StoreState } from '../definitions';
import { getLimitByWindow } from '../utils/getLimitByWindow';

const initialLimit =
  typeof window !== 'undefined' ? getLimitByWindow(window.innerWidth) : 10;

export const bookSlice: StateCreator<StoreState, [], [], BookState> = set => ({
  // isLoading: true,
  // error: null,

  title: '',
  author: '',
  page: 1,
  limit: initialLimit,
  setParams: params => {
    set(state => ({ ...state, ...params }));
  },
});
