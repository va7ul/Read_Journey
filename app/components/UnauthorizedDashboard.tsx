import Image from 'next/image';
import IphoneMobile from '@images/IphoneMobile.png';
import IphoneDesktop from '@images/IphoneDesktop.png';
import { Logo } from './Logo';

type Props = {
  children: React.ReactNode;
};

export const UnauthorizedDashboard = ({ children }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-2.5 p-5 md:flex-row md:gap-x-4 md:p-8">
      <div className="bg-black-secondary h-full w-full rounded-[30px] p-5 pb-10 md:px-16 md:py-10 md:max-xl:pb-[214px] xl:max-h-[736px] xl:max-w-[600px]">
        <Logo />
        <h1 className="mt-10 mb-5 max-w-[295px] text-[32px] font-bold md:mt-[156px] md:mb-10 md:max-w-[444px] md:text-[64px] xl:mt-[108px]">
          Expand your mind, reading
          <span className="text-white-tertiar/50"> a book</span>
        </h1>
        {children}
      </div>
      <div className="bg-black-secondary rounded-[30px] px-10 pt-5 md:px-24.5 md:pt-20 md:max-xl:hidden xl:max-h-[736px] xl:max-w-[600px]">
        <Image
          src={IphoneMobile}
          alt="Photo of iPhone"
          className="min-md:hidden"
        />
        <Image
          src={IphoneDesktop}
          alt="Photo of iPhone"
          className="h-[656px] w-[405px] max-xl:hidden"
        />
      </div>
    </div>
  );
};
