'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/assets/store/useAuthStore';

export const RestrictedRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user?.token) {
      router.push('/');
    }
  }, [isLoading, user, router]);

  if (user?.token) {
    return null;
  }

  return <>{children}</>;
};
