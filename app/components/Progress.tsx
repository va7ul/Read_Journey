import Image from 'next/image';

import Star from '@images/star.png';

export const Progress = () => {
  return (
    <div className="mt-10 flex flex-col md:max-xl:mt-0 md:max-xl:ml-10 md:max-xl:w-[50%]">
      <h3 className="text-lg/[18px] font-bold md:text-xl/[20px]">Progress</h3>
      <p className="text-white-secondary mt-3.5 text-sm/[18px] tracking-[-0.5]">
        Here you will see when and how much you read.
        <br />
        To record, click on the red button above.
      </p>
      <div className="bg-black-tertiary mx-auto my-5 flex h-[80px] w-[80px] items-center justify-center rounded-full md:mt-12.5 md:mb-13 md:h-[100px] md:w-[100px]">
        <Image src={Star} alt="Like icon" width={32} height={32} className="md:h-[50px] md:w-[50px]" />
      </div>
    </div>
  );
};
