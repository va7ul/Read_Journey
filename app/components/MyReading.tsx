'use client';

import Image from 'next/image';

import { useQuery } from '@tanstack/react-query';

import { getBook } from '@/assets/api';
import BookDefault from '@images/no-book.jpg';
import StartIcon from '@images/start.png';

export const MyReading = ({ id }: { id: string }) => {
  const { data, isError, error } = useQuery({
    queryKey: ['bookInfo', id],
    queryFn: () => getBook({ id }),
    staleTime: 60 * 1000,
    retry: 0,
  });

  if (isError) {
    console.error(error);
  }
  console.log(data);

  if (!data) return null;

  const { imageUrl, title, author } = data;

  const handleClick = () => {};

  return (
    <>
      <div className="bg-black-secondary w-full rounded-[30px] px-5 py-10 md:p-10 xl:pb-7">
        <div className="flex items-center justify-between">
          <h2 className="text-xl/5 font-bold md:text-[28px]/[32px]">
            My reading
          </h2>
          <p>ТУТ БУДЕ ЧАС!!!!</p>
        </div>

        <div className="mt-10 flex flex-col items-center md:mt-8 xl:mt-11">
          <div className="bg-black-tertiary flex min-h-[208px] items-center justify-center rounded-lg md:min-h-[256px] md:w-[170px] xl:min-h-[340px] xl:w-[224px]">
            <Image
              src={imageUrl || BookDefault}
              alt="Book Photo"
              width={137}
              height={208}
              className="rounded-lg md:w-[170px] xl:w-[224px]"
            />
          </div>
          <h3 className="mt-2.5 max-w-[60%] text-center text-sm/[18px] font-bold md:mt-6 md:max-w-[50%] md:text-xl/[20px]">
            {title}
          </h3>
          <p className="text-white-secondary mt-1.5 text-[10px]/[12px] md:mt-1 md:text-sm/[18px]">
            {author}
          </p>
          <button
            className="mt-5 md:mt-4 xl:mt-6"
            onClick={handleClick}
            type="button"
          >
            <Image
              src={StartIcon}
              alt=""
              width={40}
              height={40}
              className="md:h-[50px] md:w-[50px]"
            />
          </button>
        </div>
      </div>
    </>
  );
};
