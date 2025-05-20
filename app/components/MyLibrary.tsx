'use client';

import { useState } from 'react';

import Image from 'next/image';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';

import { deleteBook, getLibrary } from '@/assets/api';
import { Book } from '@/assets/definitions';
import { useAppStore } from '@/assets/store/store';
import TrashIcon from '@icons/trash.svg';
import Books from '@images/books.png';
import BookDefault from '@images/no-book.jpg';

import { StartReadingModal } from './modals/StartReadingModal';

type Props = {
  children: React.ReactNode;
};

export const MyLibrary = ({ children }: Props) => {
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

  const sortedBy = useAppStore(state => state.sortedBy);
  const queryClient = useQueryClient();

  const { mutate: handleDelete } = useMutation({
    mutationFn: (id: string) => deleteBook(id),
    onSuccess: ({ id }) => {
      queryClient.setQueryData(['myBooks'], (books: Book[]) =>
        books.filter(book => book._id !== id)
      );
    },
    onError: error => {
      console.error('Failed to delete book:', error);
    },
  });

  const { data, isError, error } = useQuery({
    queryKey: ['myBooks'],
    queryFn: () => getLibrary(),
    staleTime: 60 * 1000,
  });

  if (isError) {
    console.error(error);
  }
  console.log(data);

  const filteredBooks =
    sortedBy === 'all'
      ? data
      : data.filter((book: Book) => book.status === sortedBy);

  return (
    <>
      <div className="bg-black-secondary w-full rounded-[30px] px-5 py-10 md:p-10 xl:pb-7">
        <div className="flex justify-between">
          <h2 className="text-xl/5 font-bold md:text-[28px]/[32px]">
            My library
          </h2>
          {children}
        </div>

        {filteredBooks?.length ? (
          <ul className="mt-3.5 grid grid-cols-2 content-stretch gap-5 md:grid-cols-4 md:gap-x-[25px] md:gap-y-7 xl:grid-cols-5 xl:gap-x-4">
            {filteredBooks.map((book: Book) => {
              const { _id, imageUrl, title, author } = book;
              return (
                <li key={_id} className="flex h-full flex-col">
                  <div
                    className={clsx(
                      'bg-black-tertiary aspect-[137/208] cursor-pointer rounded-lg',
                      imageUrl
                        ? 'relative min-h-[208px] min-w-[137px]'
                        : 'flex flex-1 items-center justify-center'
                    )}
                    onClick={() => handleOpen(book)}
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
                  <div className="mt-2 flex justify-between gap-3.5">
                    <div className="truncate">
                      <h3 className="text-sm/[18px] font-bold">{title}</h3>
                      <p className="text-white-secondary mt-0.5 text-[10px]/[12px]">
                        {author}
                      </p>
                    </div>
                    <button
                      className="flex h-7 min-w-7 items-center justify-center border border-solid border-[#E85050]/20 bg-[#E85050]/10 hover:bg-[#E85050]/30"
                      onClick={() => handleDelete(_id)}
                    >
                      <Image src={TrashIcon} alt="" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="flex flex-col items-center pt-[64px] max-xl:pb-[120px] max-md:px-[50px] max-md:pb-[60px] md:pt-[86px] xl:pt-[148px]">
            <div className="bg-black-tertiary flex h-[100px] w-[100px] items-center justify-center rounded-full md:h-[130px] md:w-[130px]">
              <Image
                src={Books}
                alt="Like icon"
                width={50}
                height={50}
                className="md:h-[70px] md:w-[70px]"
              />
            </div>
            <p className="text-white-primary mt-2.5 text-center text-sm/[18px] md:mt-5">
              To start training, add
              <span className="text-white-secondary"> some of your books </span>
              or
              <br />
              from the recommended ones
            </p>
          </div>
        )}
      </div>

      <StartReadingModal
        isOpen={isOpen}
        book={selectedBook}
        onClose={handleClose}
      />
    </>
  );
};
