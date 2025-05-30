'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { motion } from 'framer-motion';

import Arrow from '@icons/arrow.svg';

export const StartWorkout = () => {
  const router = useRouter();

  return (
    <div className="bg-black-tertiary relative mt-5 flex w-full flex-col rounded-xl p-5 md:max-xl:mt-0 md:max-xl:ml-8 md:max-xl:w-[50%]">
      <h3 className="text-lg font-bold md:text-xl">Start your workout</h3>
      <div className="mt-5 flex gap-x-3 md:mt-10">
        <div className="bg-white-primary text-black-secondary flex h-10 min-w-10 items-center justify-center rounded-full text-lg font-bold md:h-11 md:min-w-11">
          1
        </div>
        <p className="block text-sm/[18px]">
          Create a personal library:{' '}
          <span className="text-white-secondary flex">add the books you intend to read to it.</span>
        </p>
      </div>
      <div className="mt-5 flex gap-x-3">
        <div className="bg-white-primary text-black-secondary flex h-10 min-w-10 items-center justify-center rounded-full text-lg font-bold md:h-11 md:min-w-11">
          2
        </div>
        <p className="block text-sm/[18px]">
          Create your first workout:{' '}
          <span className="text-white-secondary flex">define a goal, choose a period, start training.</span>
        </p>
      </div>
      <div className="mt-5 md:mt-6.5">
        <Link href="/library" className="text-white-secondary hover:text-white-primary border-b-1 text-sm leading-4.5">
          My library
        </Link>
      </div>
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        onClick={() => router.push('/library')}
        className="absolute right-5 bottom-5"
      >
        <Image src={Arrow} alt="Right arrow" />
      </motion.button>
    </div>
  );
};
