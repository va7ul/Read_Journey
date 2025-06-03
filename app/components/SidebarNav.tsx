import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import HourglassActive from '@icons/hourglass-active.svg';
import Hourglass from '@icons/hourglass.svg';
import PieChartActive from '@icons/pie-chart-active.svg';
import PieChart from '@icons/pie-chart.svg';

export const SidebarNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const view = searchParams.get('view');
  const isDiary = view === 'diary';
  const isStatistics = view === 'statistics';

  const handleToggle = (view: 'diary' | 'statistics') => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('view', view);
    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="flex gap-2">
      <button onClick={() => handleToggle('diary')} className="block">
        <Image
          src={isDiary ? HourglassActive : Hourglass}
          alt="Like icon"
          width={16}
          height={16}
          className="md:h-[20px] md:w-[20px]"
        />
      </button>
      <button onClick={() => handleToggle('statistics')} className="block">
        <Image
          src={isStatistics ? PieChartActive : PieChart}
          alt="Like icon"
          width={16}
          height={16}
          className="md:h-[20px] md:w-[20px]"
        />
      </button>
    </div>
  );
};
