import { StateCreator } from 'zustand';

import { BookState, StoreState } from '../definitions';
import { getLimitByWindow } from '../utils/getLimitByWindow';

const initialLimit = typeof window !== 'undefined' ? getLimitByWindow(window.innerWidth) : 10;

const defaultBookState: Omit<BookState, 'setParams' | 'reset'> = {
  title: '',
  author: '',
  page: 1,
  limit: initialLimit,
  sortedBy: 'all',
};

export const bookSlice: StateCreator<StoreState, [], [], BookState> = set => ({
  // isLoading: true,
  // error: null,

  ...defaultBookState,
  setParams: params => {
    set(state => ({ ...state, ...params }));
  },
  reset: () =>
    set(state => ({
      ...state,
      ...defaultBookState,
    })),
});
