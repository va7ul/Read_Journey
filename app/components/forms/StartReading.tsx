'use client';

// import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'next/navigation';

// import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';

// import { addNewBook } from '@/assets/api';
// import { Book } from '@/assets/definitions';
// import { schema } from '@/assets/schemes/book';

type Inputs = {
  page: number;
};

export const StartReading = () => {
  // const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: {},
  } = useForm<Inputs>({
    // resolver: yupResolver(schema),
  });

  const { id }: { id: string } = useParams();
  console.log(id);

  // const { mutateAsync: addBook } = useMutation<Book, Error, Inputs>({
  //   mutationFn: ({ page }) => addNewBook({ page }),
  //   onSuccess: book => {
  //     queryClient.setQueryData(['myBooks'], (oldBooks: Book[]) =>
  //       oldBooks ? [...oldBooks, book] : [book]
  //     );
  //   },
  //   onError: error => {
  //     console.error('Failed to add book:', error);
  //   },
  // });

  const onSubmit: SubmitHandler<Inputs> = async ({ page }) => {
    console.log({ page });

    try {
      // await addBook({ page });
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full md:max-xl:w-[50%] xl:text-sm/[18px]">
      <h4 className="pl-3.5 max-md:text-[10px]/[12px]">Start page:</h4>
      <form id="add-book-form" className="mt-2">
        <div className="input-container mt-2">
          <span className="placeholder">Page number:</span>
          <input
            className="pl-25 md:pl-29"
            suppressHydrationWarning={true}
            type="number"
            {...register('page')}
          />
        </div>

        <button
          className="btn-dark mt-5 px-5 py-2.5 md:px-7 md:py-3"
          onClick={handleSubmit(onSubmit)}
        >
          To start
        </button>
      </form>
    </div>
  );
};
