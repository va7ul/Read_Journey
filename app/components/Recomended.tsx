'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { useQuery } from '@tanstack/react-query';
import { useShallow } from 'zustand/shallow';

import { getRecomendedBooks } from '@/assets/api';
import { Book } from '@/assets/definitions';
import { useDeviceLimit } from '@/assets/hooks/useDeviceLimit';
import { useAppStore } from '@/assets/store/store';
import ChevronLeftDisable from '@icons/chevron-left-disable.svg';
import ChevronLeftEnable from '@icons/chevron-left-enable.svg';
import ChevronRightDisable from '@icons/chevron-right-disable.svg';
import ChevronRightEnable from '@icons/chevron-right-enable.svg';

import { AddBookModal } from './modals/AddBookModal';

export const Recomended = () => {
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

  const { title, author, page, setParams } = useAppStore(
    useShallow(state => ({
      title: state.title,
      author: state.author,
      page: state.page,
      setParams: state.setParams,
    }))
  );

  const [limitReady, setLimitReady] = useState(false);
  const limit = useDeviceLimit();

  useEffect(() => {
    setLimitReady(true);
    setParams({ limit });
  }, [limit, setParams]);

  const { data, isError, error } = useQuery({
    queryKey: ['recomendedBooks', { title, author, page, limit }],
    queryFn: () => getRecomendedBooks({ title, author, page, limit }),
    staleTime: 60 * 1000,
    retry: 0,
  });

  if (isError) {
    console.error(error);
  }

  console.log(data);

  const isLeftBtnDisabled = page <= 1;
  const isRightBtnDisabled = page >= data?.totalPages;

  const decrement = () => {
    setParams({ page: page - 1 });
  };

  const increment = () => {
    setParams({ page: page + 1 });
  };

  if (!limitReady) return;

  return (
    <>
      <div className="bg-black-secondary w-full rounded-[30px] px-5 py-10 md:p-10 xl:pb-7">
        <div className="flex justify-between">
          <h2 className="text-xl/5 font-bold md:text-[28px]/[32px]">
            Recomended
          </h2>
          <div className="flex gap-2">
            <button
              className="border-white-primary/20 hover:bg-black-tertiary flex h-8 w-8 items-center justify-center border md:h-10 md:w-10"
              type="button"
              onClick={decrement}
              disabled={isLeftBtnDisabled}
            >
              <Image
                src={isLeftBtnDisabled ? ChevronLeftDisable : ChevronLeftEnable}
                alt=""
                className="h-4 w-4 md:h-5 md:w-5"
              />
            </button>
            <button
              className="border-white-primary/20 hover:bg-black-tertiary flex h-8 w-8 items-center justify-center border md:h-10 md:w-10"
              type="button"
              onClick={increment}
              disabled={isRightBtnDisabled}
            >
              <Image
                src={
                  isRightBtnDisabled ? ChevronRightDisable : ChevronRightEnable
                }
                alt=""
                className="h-4 w-4 md:h-5 md:w-5"
              />
            </button>
          </div>
        </div>

        <ul className="mt-5.5 grid grid-cols-2 gap-x-5 md:mt-5 md:grid-cols-4 md:gap-x-[25px] md:gap-y-7 xl:grid-cols-5 xl:gap-x-4">
          {data &&
            data?.results.map((book: Book) => {
              const { _id, imageUrl, title, author } = book;
              return (
                <li key={_id}>
                  <div
                    className="relative aspect-[137/208] min-h-[208px] min-w-[137px] cursor-pointer"
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
      </div>

      <AddBookModal isOpen={isOpen} book={selectedBook} onClose={handleClose} />
    </>
  );
};
