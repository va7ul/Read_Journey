'use client';

import { useEffect, useState } from 'react';

import { createPortal } from 'react-dom';

import Image from 'next/image';

import { AnimatePresence, motion } from 'framer-motion';

import X from '@icons/x.svg';
import Like from '@images/like-small.png';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const MultiPopUp = ({ isOpen, onClose }: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!mounted) return null;

  const modalRoot = document.getElementById('modal-root');

  if (!modalRoot) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-black-primary/60 fixed inset-0 z-10 px-5"
            onClick={onClose}
          >
            <motion.div
              key="modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-black-secondary border-white-secondary/20 relative top-[50vh] left-1/2 z-20 w-full max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-solid py-10 md:py-12.5"
              onClick={e => e.stopPropagation()}
            >
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                onClick={onClose}
                className="absolute top-4 right-4 text-white"
              >
                <Image src={X} alt="Close icon" />
              </motion.button>

              <div className="flex flex-col items-center">
                <Image
                  src={Like}
                  alt="Book Photo"
                  width={140}
                  height={213}
                  className="h-[213px] rounded-lg md:h-[233px] md:w-[153px]"
                />
                <h3 className="mt-4 max-w-[90%] truncate text-lg/[18px] font-bold md:text-xl/[20px]">
                  Good job
                </h3>
                <p className="text-white-secondary mt-0.5 text-xs/[14px] md:text-sm/[18px]">
                  Your book is now in
                  <span>the library! </span>
                  The joy knows no bounds and now you can start your training
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    modalRoot
  );
};
