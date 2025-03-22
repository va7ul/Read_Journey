'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <ul className="flex gap-x-8 gap-y-7 text-sm max-md:flex-col md:text-base xl:gap-x-10">
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
  );
};
