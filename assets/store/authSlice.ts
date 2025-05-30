import { StateCreator } from 'zustand';

import { signIn, signOut, signUp } from '../api';
import { AuthState, StoreState, User } from '../definitions';

export const authSlice: StateCreator<StoreState, [], [], AuthState> = set => ({
  user: {
    _id: null,
    name: null,
    email: null,
    token: null,
    refreshToken: null,
  },
  isLoading: true,
  error: null,

  signUp: async ({ name, email, password }) => {
    set({ error: null });
    try {
      const user = await signUp({ name, email, password });
      set({ user });
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  signIn: async ({ email, password }) => {
    set({ error: null });
    try {
      const user = await signIn({ email, password });
      set({ user });
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    set({ error: null });
    try {
      const { message } = await signOut();
      console.log(message);
    } catch (error) {
      throw error;
    } finally {
      set({ user: null, isLoading: false });
    }
  },

  getCurrentUser: async (user: User | null) => {
    set({ user });
  },
});
