import Image from 'next/image';
import LogoImg from '@icons/logo.svg';

export const Logo = () => {
  return (
    <div className="flex gap-x-1">
      <Image src={LogoImg} alt="Brand logo" />
      <span className="text-lg font-bold max-md:hidden">READ JOURNEY</span>
    </div>
  );
};
