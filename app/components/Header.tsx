'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import LogoImg from '@icons/logo.svg';
import Menu from '@icons/mob-menu.svg';

export const Header = () => {
  const pathname = usePathname();

  return (
    <div className="p-5 pb-2.5 md:p-8 md:pb-4">
      <div className="bg-black-secondary flex items-center justify-between rounded-[15px] p-5">
        <div className="flex gap-x-1">
          <Image src={LogoImg} alt="Brand logo" />
          <span className="text-lg font-bold max-xl:hidden">READ JOURNEY</span>
        </div>
        <ul className="flex gap-x-8 max-md:hidden xl:gap-x-10">
          <li>
            <Link
              href="/"
              className={clsx(
                'hover:text-white-primary',
                pathname === '/'
                  ? 'text-white-primary current-page'
                  : 'text-white-secondary'
              )}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/library"
              className={clsx(
                'hover:text-white-primary',
                pathname === '/library'
                  ? 'text-white-primary current-page'
                  : 'text-white-secondary'
              )}
            >
              My library
            </Link>
          </li>
        </ul>
        <div className="flex items-center">
          <div className="border-white-primary/20 bg-black-tertiary flex h-[35px] w-[35px] items-center justify-center rounded-full border border-solid text-base font-bold md:h-10 md:w-10">
            U
          </div>
          <div className="ml-2 font-bold max-xl:hidden">User Name</div>
          <button className="ml-2.5 md:hidden">
            <Image src={Menu} alt="Photo of iPhone" />
          </button>
          <button className="btn-dark ml-4 px-7 py-3 max-md:hidden">
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};
