'use client';

import { useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { User } from '@/assets/definitions';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/assets/store/store';

type Props = {
  user: User | null;
  isError: boolean;
};

export const UserAuthInit = ({ user, isError }: Props) => {
  const getCurrentUser = useAppStore(state => state.getCurrentUser);
  const { push } = useRouter();
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (isError && !hasRedirected.current) {
      Cookies.remove('token');
      hasRedirected.current = true;
      push('/login');
    }
  }, [isError, push]);

  useEffect(() => {
    if (user) {
      getCurrentUser(user);
    }
  }, [user, getCurrentUser]);

  return null;
};
