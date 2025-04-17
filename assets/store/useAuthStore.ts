import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { signUp, signIn, refreshUser, signOut } from '../utils/api';

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
  getCurrentUser: () => Promise<void>;
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

        getCurrentUser: async () => {
          set({ error: null });
          try {
            const { user } = await refreshUser();

            set({ user });
          } catch (error) {
            set({ user: null });
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
            useAuthStore.persist.clearStorage();
          }
        },
      })),
      { name: 'auth', partialize: state => ({ user: state.user }) }
    ),
    { name: 'AuthStore' }
  )
);

export const getAuthStore = useAuthStore.getState;
