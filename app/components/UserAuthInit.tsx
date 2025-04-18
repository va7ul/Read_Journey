'use client';

import { useEffect } from 'react';
import { User } from '@/assets/definitions';
import { useAuthStore } from '@/assets/store/useAuthStore';

export const UserAuthInit = ({ user }: { user: User | null }) => {
  const { getCurrentUser } = useAuthStore();

  useEffect(() => {
    if (user) {
      getCurrentUser(user);
    }
  }, [user, getCurrentUser]);

  return null;
};
