'use client';

import { useState } from 'react';
import Image from 'next/image';
import LogoImg from '@icons/logo.svg';
import Menu from '@icons/mob-menu.svg';
import { MobMenu } from './MobMenu';
import { Navigation } from './Navigation';

export const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-5 pb-2.5 md:p-8 md:pb-4">
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
            U
          </div>
          <div className="ml-2 max-xl:hidden">User Name</div>
          <button className="ml-2.5 md:hidden" onClick={() => setOpen(true)}>
            <Image src={Menu} alt="Photo of iPhone" />
          </button>
          <button className="btn-dark ml-4 px-7 py-3 max-md:hidden">
            Log out
          </button>
        </div>
      </div>

      <MobMenu isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
};
