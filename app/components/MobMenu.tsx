import { useEffect } from 'react';
import Image from 'next/image';
import X from '@icons/x.svg';
import { Navigation } from './Navigation';

type Props = {
  isOpen: boolean;
  handleLogOut: () => void;
  onClose: () => void;
};

export const MobMenu = ({ isOpen, handleLogOut, onClose }: Props) => {
  useEffect(() => {
    // Закриваємо Drawer при натисканні ESC
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // Закриваємо Drawer при зміні розміру екрану
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [onClose]);

  return (
    <>
      {isOpen && (
        <div
          className="bg-black-primary/60 fixed inset-0 z-10 transition-opacity"
          onClick={onClose}
        />
      )}

      <div
        className={`bg-black-tertiary fixed top-0 right-0 z-10 flex h-full w-[50%] min-w-[200px] transform flex-col items-center justify-between pt-70 pb-10 transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <Navigation onClose={onClose} />
        <button
          onClick={onClose}
          className="hover:bg-black-secondary absolute top-8.5 right-10 p-1.5 text-white"
        >
          <Image src={X} alt="Photo of iPhone" />
        </button>
        <button
          className="btn-dark w-[92px] px-5 py-2.5"
          onClick={handleLogOut}
        >
          Log out
        </button>
      </div>
    </>
  );
};
