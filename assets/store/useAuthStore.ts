import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { signUp, signIn, signOut } from '../utils/api';

type AuthState = {
  user: {
    name: string | null;
    email: string | null;
    token: string | null;
    refreshToken: string | null;
  } | null;
  isLoading: boolean;
  error: string | null;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      immer(set => ({
        user: {
          name: null,
          email: null,
          token: null,
          refreshToken: null,
        },
        isLoading: false,
        error: null,

        signUp: async (name, email, password) => {
          set({ isLoading: true, error: null });
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
          set({ isLoading: true, error: null });
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
          set({ isLoading: true, error: null });
          try {
            await signOut();
          } catch (error) {
            throw error;
          } finally {
            set({ user: null, isLoading: false });
          }
        },
      })),
      { name: 'auth', partialize: state => ({ user: state.user }) }
    ),
    { name: 'AuthStore' }
  )
);
