'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { SubmitHandler, useForm } from 'react-hook-form';

import { schema } from '@/assets/schemes/login';
import { useAppStore } from '@/assets/store/store';
import EyeOff from '@icons/eye-off.svg';
import Eye from '@icons/eye.svg';
// import { CustomLoader } from '../CustomLoader';

type Inputs = {
  email: string;
  password: string;
};

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const signIn = useAppStore(state => state.signIn);
  const { push } = useRouter();
  // const { signIn, isLoading } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<Inputs>({
    // defaultValues: {
    //   email: 'test@ukr.net',
    //   password: '1234567',
    // },
    resolver: yupResolver(schema),
  });

  const onShow = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    try {
      await signIn(email, password);
      push('/');
      // toast.success('Welcome!');
    } catch (error) {
      const err = error as Error;

      console.log(err.message);
      // toast.error(err.message);
    }
  };

  return (
    <>
      {/* {loading && <CustomLoader />} */}
      <form id="signin-form">
        <div className="input-container">
          <span className="placeholder">Mail:</span>
          <input
            className={clsx(
              'pl-12 md:pl-13.5',
              errors.email ? 'border-error' : isSubmitted && 'border-success'
            )}
            suppressHydrationWarning={true}
            {...register('email')}
          />
        </div>
        {errors.email && <div className="error">{errors.email?.message}</div>}

        <div className="input-container mt-2 md:mt-3.5">
          <span className="placeholder">Password:</span>
          <input
            className={clsx(
              'pl-19.5 md:pl-22',
              errors.password ? 'border-error' : isSubmitted && 'border-success'
            )}
            suppressHydrationWarning={true}
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
          />
          <Image
            className="absolute top-3.5 right-4 cursor-pointer md:right-4.5 md:h-[20px] md:w-[20px]"
            src={showPassword ? EyeOff : Eye}
            alt={showPassword ? 'Open eye icon' : 'Close eye icon'}
            onClick={onShow}
            width={18}
            height={18}
          />
        </div>
        {errors.password && (
          <div className="error">{errors.password?.message}</div>
        )}
      </form>
      <div className="mt-auto max-md:mt-5">
        <button
          className="btn-light px-[45px] py-3 md:px-[64px] md:py-4"
          onClick={handleSubmit(onSubmit)}
        >
          Log In
        </button>
        <Link
          href="/register"
          className="text-white-secondary hover:text-white-primary ml-3.5 border-b-1 md:ml-5"
        >
          Don’t have an account?
        </Link>
      </div>
    </>
  );
};
