'use client';

import { useEffect, useState } from 'react';

import { createPortal } from 'react-dom';

import Image from 'next/image';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';

import { addToLibrary } from '@/assets/api';
import { Book } from '@/assets/definitions';
import X from '@icons/x.svg';
import BookDefault from '@images/no-book.jpg';

type Props = {
  isOpen: boolean;
  onOpenPopUp: () => void;
  onClose: () => void;
  book: Book | null;
};

export const AddBookModal = ({ isOpen, onOpenPopUp, onClose, book }: Props) => {
  const [mounted, setMounted] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: setBook } = useMutation({
    mutationFn: () => addToLibrary(id),
    onSuccess: book => {
      queryClient.setQueryData(['myBooks'], (oldBooks: Book[]) => (oldBooks ? [...oldBooks, book] : [book]));
      onClose();
      onOpenPopUp();
    },
    onError: error => {
      console.error('Failed to add book:', error);
    },
  });

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
  if (!book) return null;

  const { imageUrl, title, author, totalPages, _id: id } = book;

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
                <div className="bg-black-tertiary flex min-h-[213px] items-center justify-center rounded-lg md:min-h-[233px] md:w-[153px]">
                  <Image
                    src={imageUrl || BookDefault}
                    alt="Book Photo"
                    width={140}
                    height={213}
                    className="rounded-lg md:w-[153px]"
                  />
                </div>
                <h3 className="mt-4 max-w-[80%] text-center text-lg/[18px] font-bold md:text-xl/[20px]">{title}</h3>
                <p className="text-white-secondary mt-0.5 text-xs/[14px] md:text-sm/[18px]">{author}</p>
                <p className="mt-1 text-[10px]/[12px]">{totalPages} pages</p>

                <button className="btn-dark mt-5 px-6 py-3 md:mt-8" onClick={() => setBook()}>
                  Add to library
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    modalRoot
  );
};
