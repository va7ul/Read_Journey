'use client';

import { useAppStore } from '@/assets/store/store';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  title: string;
  author: string;
};

export const FindBook = () => {
  const setParams = useAppStore(state => state.setParams);

  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm<Inputs>({});

  const onSubmit: SubmitHandler<Inputs> = ({ title, author }) => {
    console.log({ title, author });
    setParams({ title, author });
  };

  return (
    <div className="w-full md:max-xl:w-[50%] xl:text-sm/[18px]">
      <h4 className="pl-3.5 max-md:text-[10px]/[12px]">Filters:</h4>
      <form id="login-form">
        <div className="input-container mt-2">
          <span className="placeholder">Book title:</span>
          <input
            className="pl-18.5 md:pl-21.5"
            suppressHydrationWarning={true}
            type="text"
            {...register('title')}
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
