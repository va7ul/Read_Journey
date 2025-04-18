import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { signUp, signIn, signOut } from '../utils/api';
import { User } from '../definitions';

type AuthState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  getCurrentUser: (user: User | null) => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
  devtools(
    immer(set => ({
      user: {
        name: null,
        email: null,
        token: null,
        refreshToken: null,
      },
      isLoading: true,
      error: null,

      signUp: async (name, email, password) => {
        set({ error: null });
        try {
          const { user } = await signUp(name, email, password);
          set({ user });
        } catch (error) {
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      signIn: async (email, password) => {
        set({ error: null });
        try {
          const { user } = await signIn(email, password);
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
    })),
    { name: 'AuthStore' }
  )
);

export const getAuthStore = useAuthStore.getState;
