'use client';
// import { yupResolver } from '@hookform/resolvers/yup';

// import { schema } from '@/assets/schemes/book';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';

import { getBook, readingStart, readingStop } from '@/assets/api';
import { Book } from '@/assets/definitions';

type Inputs = {
  page: number;
};

export const AddReading = ({ id }: { id: string }) => {
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

  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: {},
  } = useForm<Inputs>({
    // resolver: yupResolver(schema),
  });

  const { mutateAsync: startReadBook } = useMutation<Book, Error, Inputs>({
    mutationFn: ({ page }) => {
      if (isReading) {
        return readingStop({ id, page });
      }

      if (page === lastReadedPage || page === lastReadedPage + 1) {
        return readingStart({ id, page });
      }

      throw new Error('Поверніться до сторінки, на якій Ви зупинились');
    },
    onSuccess: book => {
      queryClient.setQueryData(['bookInfo', id], () => book);
    },
    onError: error => {
      console.error('Failed to add book:', error);
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async ({ page }) => {
    try {
      if (page > totalPages) {
        return;
      }
      await startReadBook({ page });
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  if (!book) return null;

  const { progress, totalPages } = book;
  const isReading = progress?.some(el => el.status === 'active');
  const inactiveReading = progress?.filter(el => el.status === 'inactive');
  const lastReadedPage = inactiveReading?.[inactiveReading.length - 1]?.finishPage || 0;

  return (
    <div className="w-full md:max-xl:w-[50%] xl:text-sm/[18px]">
      <h4 className="pl-3.5 max-md:text-[10px]/[12px]">Start page:</h4>
      <form id="add-book-form" className="mt-2">
        <div className="input-container mt-2">
          <span className="placeholder">Page number:</span>
          <input className="pl-25 md:pl-29" suppressHydrationWarning={true} type="number" {...register('page')} />
        </div>

        <button className="btn-dark mt-5 px-5 py-2.5 md:px-7 md:py-3" onClick={handleSubmit(onSubmit)}>
          {isReading ? 'To stop' : 'To start'}
        </button>
      </form>
    </div>
  );
};
