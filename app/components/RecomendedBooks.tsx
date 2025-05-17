'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

import { getRecomendedBooks } from '@/assets/api';
import { Book } from '@/assets/definitions';
import Arrow from '@icons/arrow.svg';

import { AddBookModal } from './modals/AddBookModal';

export const RecomendedBooks = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleOpen = (book: Book) => {
    document.body.classList.add('overflow-hidden');
    setIsOpen(true);
    setSelectedBook(book);
  };

  const handleClose = () => {
    document.body.classList.remove('overflow-hidden');
    setIsOpen(false);
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

        <ul className="mt-3.5 grid grid-cols-3 gap-x-5 md:mt-5 md:gap-x-[25px]">
          {data?.results.map((book: Book) => {
            const { _id, imageUrl, title, author } = book;
            return (
              <li key={_id}>
                <div
                  className="relative aspect-[71/107] min-h-[107px] min-w-[71px] cursor-pointer"
                  onClick={() => handleOpen(book)}
                >
                  <Image
                    src={imageUrl}
                    alt="Book Photo"
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 15vw"
                    className="rounded-lg"
                  />
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

      <AddBookModal isOpen={isOpen} book={selectedBook} onClose={handleClose} />
    </>
  );
};
