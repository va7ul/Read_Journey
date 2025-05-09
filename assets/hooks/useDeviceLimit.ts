import { useEffect, useState } from 'react';
import { getLimitByWindow } from '../utils/getLimitByWindow';

export const useDeviceLimit = (): number => {
  const [limit, setLimit] = useState(() =>
    typeof window !== 'undefined' ? getLimitByWindow(window.innerWidth) : 10
  );

  useEffect(() => {
    const handleResize = () => {
      setLimit(getLimitByWindow(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return limit;
};
