'use client';

import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  book: string;
  author: string;
};

export const FindBook = () => {
  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm<Inputs>({
    // resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = ({ book, author }) => {
    // signIn(email, password);
    console.log({ book, author });
    // router.back();
  };

  return (
    <div className="w-full md:max-xl:w-[50%]">
      <h4 className="pl-3.5 max-md:text-[10px]">Filters:</h4>
      <form id="login-form">
        <div className="input-container mt-2">
          <span className="placeholder">Book title:</span>
          <input
            className="pl-18.5 md:pl-21.5"
            suppressHydrationWarning={true}
            type="text"
            {...register('book')}
          />
        </div>

        <div className="input-container mt-2 md:mt-3.5">
          <span className="placeholder">The author:</span>
          <input
            className="pl-20.5 md:pl-24"
            suppressHydrationWarning={true}
            type="text"
            {...register('author')}
          />
        </div>

        <button
          className="btn-dark mt-5 px-5 py-2.5 md:px-7 md:py-3"
          onClick={handleSubmit(onSubmit)}
        >
          To apply
        </button>
      </form>
    </div>
  );
};
