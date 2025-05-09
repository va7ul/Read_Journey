'use client';

import Image from 'next/image';
import ChevronLeftDisable from '@icons/chevron-left-disable.svg';
import ChevronLeftEnable from '@icons/chevron-left-enable.svg';
import ChevronRightDisable from '@icons/chevron-right-disable.svg';
import ChevronRightEnable from '@icons/chevron-right-enable.svg';
import { useQuery } from '@tanstack/react-query';
import { getRecomendedBooks } from '@/assets/api';
import { useAppStore } from '@/assets/store/store';
import { useShallow } from 'zustand/shallow';
import { useDeviceLimit } from '@/assets/hooks/useDeviceLimit';
import { useEffect } from 'react';

export const Recomended = () => {
  const { title, author, page, setParams } = useAppStore(
    useShallow(state => ({
      title: state.title,
      author: state.author,
      page: state.page,
      setParams: state.setParams,
    }))
  );

  const limit = useDeviceLimit();
  useEffect(() => {
    setParams({ limit: limit });
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

  return (
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
    </div>
  );
};
