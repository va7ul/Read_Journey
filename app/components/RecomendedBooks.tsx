'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Arrow from '@icons/arrow.svg';
import Books from '@images/books-small.png';

export const RecomendedBooks = () => {
  const router = useRouter();

  return (
    <div className="bg-black-tertiary relative mt-5 flex w-full flex-col rounded-xl p-5 md:max-xl:w-[50%] md:max-xl:py-6.5 xl:mt-19.5">
      <h3 className="text-lg font-bold md:text-xl">Recommended books</h3>
      <div className="mt-3.5 flex h-[142px] gap-x-3 md:mt-5">
        <Image src={Books} alt="Icon of books" width={71} height={107} />
        тут будуть книжки
      </div>

      <div className="mt-4.5 md:mt-5">
        <Link
          href="/"
          className="text-white-secondary hover:text-white-primary border-b-1 text-sm leading-4.5"
        >
          Home
        </Link>
      </div>
      <button
        className="absolute right-5 bottom-5 md:max-xl:bottom-6.5"
        onClick={() => router.push('/')}
      >
        <Image src={Arrow} alt="" />
      </button>
    </div>
  );
};
