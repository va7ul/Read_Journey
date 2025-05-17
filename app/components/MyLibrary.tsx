'use client';

import Image from 'next/image';

import { useQuery } from '@tanstack/react-query';

import { getLibrary } from '@/assets/api';
import { Book } from '@/assets/definitions';

type Props = {
  children: React.ReactNode;
};

export const MyLibrary = ({ children }: Props) => {
  const { data, isError, error } = useQuery({
    queryKey: ['myBooks'],
    queryFn: () => getLibrary(),
    staleTime: 60 * 1000,
    retry: 0,
  });

  if (isError) {
    console.error(error);
  }

  console.log(data);

  return (
    <>
      <div className="bg-black-secondary w-full rounded-[30px] px-5 py-10 md:p-10 xl:pb-7">
        <div className="flex justify-between">
          <h2 className="text-xl/5 font-bold md:text-[28px]/[32px]">
            My library
          </h2>
          {children}
        </div>

        <ul className="mt-5.5 grid grid-cols-2 gap-x-5 md:mt-5 md:grid-cols-4 md:gap-x-[25px] md:gap-y-7 xl:grid-cols-5 xl:gap-x-4">
          {data?.map((book: Book) => {
            const { _id, imageUrl, title, author } = book;
            return (
              <li key={_id}>
                <div
                  className="relative aspect-[137/208] min-h-[208px] min-w-[137px] cursor-pointer"
                  //   onClick={() => handleOpen(book)}
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

      {/* <AddBookModal isOpen={isOpen} book={selectedBook} onClose={handleClose} /> */}
    </>
  );
};
