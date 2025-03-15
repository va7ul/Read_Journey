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
      <div className="bg-black-secondary w-full rounded-[30px] p-5 pb-10 md:px-16 md:py-10">
        <Logo />
        <h1 className="mt-10 max-w-[295px] text-[32px] leading-none font-bold md:max-w-[444px] md:text-[64px]">
          Expand your mind, reading
          <span className="text-white-tertiar/50"> a book</span>
        </h1>
        {children}
      </div>
      <div className="bg-black-secondary w-full rounded-[30px] px-10 pt-5 md:px-24.5 md:pt-20 md:max-xl:hidden">
        <Image
          src={IphoneMobile}
          alt="Photo of iPhone"
          className="min-md:hidden"
        />
        <Image
          src={IphoneDesktop}
          alt="Photo of iPhone"
          className="max-xl:hidden"
        />
      </div>
    </div>
  );
};
