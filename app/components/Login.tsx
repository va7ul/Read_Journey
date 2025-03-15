'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
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
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: 'test@ukr.net',
      password: '123456',
    },
    resolver: yupResolver(schema),
  });

  const onShow = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<Inputs> = ({ email, password }) => {
    // signIn(email, password);
    console.log({ email, password });
    router.back();
  };

  return (
    <>
      {/* {loading && <CustomLoader />} */}
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <input
            className="w-full"
            suppressHydrationWarning={true}
            {...register('email')}
            placeholder="Mail"
          />
          <span>{errors.email?.message}</span>
        </div>
        <div className="">
          <input
            className="w-full"
            suppressHydrationWarning={true}
            {...register('password')}
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
          />
          <Image
            className="cursor-pointer md:h-[20px] md:w-[20px]"
            src={showPassword ? EyeOff : Eye}
            alt={showPassword ? 'Open eye icon' : 'Close eye icon'}
            onClick={onShow}
            width={18}
            height={18}
          />
          <span>{errors.password?.message}</span>
        </div>

        <button type="submit" className="">
          Log In
        </button>
      </form>
    </>
  );
};
