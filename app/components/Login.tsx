'use client';

import { useState } from 'react';
// import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import Image from 'next/image';
import EyeOff from '@icons/eye-off.svg';
import Eye from '@icons/eye.svg';
import { schema } from '@/lib/schemes/login';
// import { CustomLoader } from '../CustomLoader';

type Inputs = {
  email: string;
  password: string;
};

export const Login = () => {
  // const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<Inputs>({
    // defaultValues: {
    //   email: 'test@ukr.net',
    //   password: '123456',
    // },
    resolver: yupResolver(schema),
  });

  const onShow = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<Inputs> = ({ email, password }) => {
    // signIn(email, password);
    console.log({ email, password });
    // router.back();
  };

  return (
    <>
      {/* {loading && <CustomLoader />} */}
      <form id="login-form">
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
      <div className="mt-auto">
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
