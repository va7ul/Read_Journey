'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { addNewBook } from '@/assets/api';
import { schema } from '@/assets/schemes/book';

type Inputs = {
  title: string;
  author: string;
  totalPages: number;
};

export const AddBook = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: {},
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async ({
    title,
    author,
    totalPages,
  }) => {
    console.log({ title, author, totalPages });
    try {
      const res = await addNewBook({ title, author, totalPages });
      console.log(res);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full md:max-xl:w-[50%] xl:text-sm/[18px]">
      <h4 className="pl-3.5 max-md:text-[10px]/[12px]">Create your library:</h4>
      <form id="add-book-form" className="mt-2">
        <div className="input-container">
          <span className="placeholder">Book title:</span>
          <input
            className="pl-18.5 md:pl-21.5"
            suppressHydrationWarning={true}
            type="text"
            {...register('title')}
          />
        </div>

        <div className="input-container mt-2">
          <span className="placeholder">The author:</span>
          <input
            className="pl-20.5 md:pl-24"
            suppressHydrationWarning={true}
            type="text"
            {...register('author')}
          />
        </div>

        <div className="input-container mt-2">
          <span className="placeholder">Number of pages:</span>
          <input
            className="pl-29 md:pl-34"
            suppressHydrationWarning={true}
            type="number"
            {...register('totalPages')}
          />
        </div>

        <button
          className="btn-dark mt-5 px-5 py-2.5 md:px-7 md:py-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          Add book
        </button>
      </form>
    </div>
  );
};
