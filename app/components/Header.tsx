'use client';

import { useState } from 'react';
import Image from 'next/image';
import LogoImg from '@icons/logo.svg';
import Menu from '@icons/mob-menu.svg';
import { MobMenu } from './MobMenu';
import { Navigation } from './Navigation';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/assets/store/store';
import { useShallow } from 'zustand/shallow';

export const Header = () => {
  const { push } = useRouter();
  const [open, setOpen] = useState(false);
  const [animation, setAnimation] = useState(false);
  const { user, signOut } = useAppStore(
    useShallow(state => ({
      user: state.user,
      signOut: state.signOut,
    }))
  );

  const handleOpen = () => {
    document.body.classList.add('overflow-hidden');
    setOpen(true);
    setTimeout(() => {
      setAnimation(true);
    }, 100);
  };

  const handleClose = () => {
    document.body.classList.remove('overflow-hidden');
    setAnimation(false);
    setTimeout(() => {
      setOpen(false);
    }, 500);
  };

  const handleLogOut = async () => {
    try {
      await signOut();
      push('/login');
      // toast.success('Welcome!');
    } catch (error) {
      const err = error as Error;

      console.log(err.message);
      // toast.error(err.message);
    }
  };

  return (
    <div className="mx-auto max-w-[1216px] p-5 pb-2.5 md:p-8 md:pb-4">
      <div className="bg-black-secondary flex items-center justify-between rounded-[15px] p-5">
        <div className="flex gap-x-1">
          <Image src={LogoImg} alt="Brand logo" />
          <span className="text-lg font-bold max-xl:hidden">READ JOURNEY</span>
        </div>
        <div className="max-md:hidden">
          <Navigation />
        </div>
        <div className="flex items-center text-base font-bold">
          <div className="border-white-primary/20 bg-black-tertiary flex h-[35px] w-[35px] items-center justify-center rounded-full border border-solid md:h-10 md:w-10">
            {user?.name?.slice(0, 1).toUpperCase()}
          </div>
          <div className="ml-2 max-xl:hidden">{user?.name}</div>
          <button className="ml-2.5 md:hidden" onClick={handleOpen}>
            <Image src={Menu} alt="Burger icon" />
          </button>
          <button
            className="btn-dark ml-4 px-7 py-3 max-md:hidden"
            onClick={handleLogOut}
          >
            Log out
          </button>
        </div>
      </div>

      {open && (
        <MobMenu
          animation={animation}
          handleLogOut={handleLogOut}
          onClose={handleClose}
        />
      )}
    </div>
  );
};
