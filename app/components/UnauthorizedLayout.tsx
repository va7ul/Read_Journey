import Image from 'next/image';
import LogoImg from '@icons/logo.svg';
import IphoneMobile from '@images/IphoneMobile.png';
import IphoneDesktop from '@images/IphoneDesktop.png';

type Props = {
  children: React.ReactNode;
};

export const UnauthorizedLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-2.5 p-5 md:flex-row md:gap-x-4 md:p-8">
      <div className="bg-black-secondary flex w-full flex-col rounded-[30px] p-5 pb-10 md:min-h-[960px] md:px-16 md:py-10 md:max-xl:pb-[214px] xl:min-h-[800px] xl:max-w-[600px]">
        <div className="flex gap-x-1">
          <Image src={LogoImg} alt="Brand logo" />
          <span className="text-lg font-bold max-md:hidden">READ JOURNEY</span>
        </div>
        <h1 className="mt-10 mb-5 max-w-[295px] text-[32px] font-bold md:mt-[156px] md:mb-10 md:max-w-[444px] md:text-[64px] md:leading-[60px] xl:mt-[100px]">
          Expand your mind, reading
          <span className="text-white-tertiar/50"> a book</span>
        </h1>
        {children}
      </div>
      <div className="bg-black-secondary rounded-[30px] px-10 pt-5 md:px-24.5 md:pt-20 md:max-xl:hidden xl:min-h-[800px] xl:max-w-[600px]">
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
