import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { StoreState } from '../definitions';

import { authSlice } from './authSlice';
import { bookSlice } from './bookSlice';

export const useAppStore = create<StoreState>()(
  devtools(
    immer((...a) => ({
      ...authSlice(...a),
      ...bookSlice(...a),
    })),
    { name: 'AppStore' }
  )
);

export const getAuthStore = useAppStore.getState;
