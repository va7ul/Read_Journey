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
import { schema } from '@/assets/schemes/register';
import { useAuthStore } from '@/assets/store/useAuthStore';
// import { CustomLoader } from '../CustomLoader';

type Inputs = {
  name: string;
  email: string;
  password: string;
};

export const Register = () => {
  // const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { signUp } = useAuthStore();
  // const { signUp, isLoading } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<Inputs>({
    // defaultValues: {
    //   name: 'test@ukr.net',
    //   email: 'test@ukr.net',
    //   password: '1234567',
    // },
    resolver: yupResolver(schema),
  });

  const onShow = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<Inputs> = async ({ name, email, password }) => {
    try {
      await signUp(name, email, password);
      // router.back();
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
      <form id="login-form">
        <div className="input-container">
          <span className="placeholder">Name:</span>
          <input
            className={clsx(
              'pl-14 md:pl-16',
              errors.name ? 'border-error' : isSubmitted && 'border-success'
            )}
            suppressHydrationWarning={true}
            {...register('name')}
          />
        </div>
        {errors.name && <div className="error">{errors.name?.message}</div>}

        <div className="input-container mt-2 md:mt-3.5">
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
      <div className="mt-5 md:mt-[82px] xl:mt-auto">
        <button
          className="btn-light px-[29px] py-3 md:px-[54px] md:py-4"
          onClick={handleSubmit(onSubmit)}
        >
          Registration
        </button>
        <Link
          href="/login"
          className="text-white-secondary hover:text-white-primary ml-3.5 border-b-1 md:ml-5"
        >
          Already have an account?
        </Link>
      </div>
    </>
  );
};
