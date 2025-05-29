'use client';

import { useSearchParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { getBook } from '@/assets/api';

import { Diary } from './Diary';
import { Progress } from './Progress';
import { Statistics } from './Statistics';

export const Details = ({ id }: { id: string }) => {
  const searchParams = useSearchParams();
  const view = searchParams.get('view');

  const {
    data: book,
    isError,
    error,
  } = useQuery({
    queryKey: ['bookInfo', id],
    queryFn: () => getBook({ id }),
    staleTime: 60 * 1000,
    retry: 0,
  });

  if (isError) {
    console.error(error);
  }

  if (!book) return null;

  return (
    <>
      {!book.progress.length ? (
        <Progress />
      ) : view === 'statistics' ? (
        <Statistics />
      ) : (
        <Diary />
      )}
    </>
  );
};
