'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/assets/store/useAuthStore';

export const ClientAuthInit = () => {
  const { getCurrentUser } = useAuthStore();

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  return null;
};
