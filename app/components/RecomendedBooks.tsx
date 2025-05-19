'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { motion } from 'framer-motion';

import { getRecomendedBooks } from '@/assets/api';
import { Book } from '@/assets/definitions';
import Arrow from '@icons/arrow.svg';
import BookDefault from '@images/no-book.jpg';

import { AddBookModal } from './modals/AddBookModal';
import { MultiPopUp } from './modals/MultiPopUp';

export const RecomendedBooks = () => {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleModalOpen = (book: Book) => {
    document.body.classList.add('overflow-hidden');
    setIsModalOpen(true);
    setSelectedBook(book);
  };

  const handlePopUpOpen = () => {
    document.body.classList.add('overflow-hidden');
    setIsPopUpOpen(true);
  };

  const handleModalClose = () => {
    document.body.classList.remove('overflow-hidden');
    setIsModalOpen(false);
  };

  const handlePopUpClose = () => {
    document.body.classList.remove('overflow-hidden');
    setIsPopUpOpen(false);
  };

  const { data, isError, error } = useQuery({
    queryKey: ['recomendedBooks', { title: '', author: '', page: 1, limit: 3 }],
    queryFn: () => getRecomendedBooks({ limit: 3 }),
    staleTime: 60 * 1000,
    retry: 0,
  });

  if (isError) {
    console.error(error);
  }

  console.log(data);

  return (
    <>
      <div className="bg-black-tertiary relative mt-5 flex w-full flex-col rounded-xl p-5 md:max-xl:w-[50%] md:max-xl:py-6.5 xl:mt-19.5">
        <h3 className="text-lg leading-none font-bold md:text-xl">
          Recommended books
        </h3>

        <ul className="mt-3.5 grid grid-cols-3 content-stretch gap-x-5 md:mt-5 md:gap-x-[25px]">
          {data &&
            data?.results.map((book: Book) => {
              const { _id, imageUrl, title, author } = book;

              return (
                <li key={_id} className="flex h-full flex-col">
                  <div
                    className={clsx(
                      'bg-black-secondary aspect-[71/107] cursor-pointer rounded-lg xl:max-h-[107px]',
                      imageUrl
                        ? 'relative min-h-[107px] min-w-[71px]'
                        : 'flex flex-1 items-center justify-center'
                    )}
                    onClick={() => handleModalOpen(book)}
                  >
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt="Book Photo"
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 15vw"
                        className="rounded-lg"
                      />
                    ) : (
                      <Image
                        src={BookDefault}
                        alt="Book Photo"
                        width={137}
                        height={208}
                        className="w-full rounded-lg object-contain"
                      />
                    )}
                  </div>
                  <h3 className="mt-2 truncate text-sm/[18px] font-bold">
                    {title}
                  </h3>
                  <p className="text-white-secondary mt-0.5 text-[10px]/[12px]">
                    {author}
                  </p>
                </li>
              );
            })}
        </ul>

        <div className="mt-4.5 md:mt-5">
          <Link
            href="/"
            className="text-white-secondary hover:text-white-primary border-b-1 text-sm leading-4.5"
          >
            Home
          </Link>
        </div>
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          onClick={() => router.push('/')}
          className="absolute right-5 bottom-5 md:max-xl:bottom-6.5"
        >
          <Image src={Arrow} alt="Right arrow" />
        </motion.button>
      </div>

      <AddBookModal
        isOpen={isModalOpen}
        book={selectedBook}
        onOpenPopUp={handlePopUpOpen}
        onClose={handleModalClose}
      />
      <MultiPopUp isOpen={isPopUpOpen} onClose={handlePopUpClose} />
    </>
  );
};
