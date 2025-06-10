import { useQuery } from '@tanstack/react-query';
import { ArcElement, Chart as ChartJS, ChartOptions, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { getBook } from '@/assets/api';

import { SidebarNav } from './SidebarNav';

export const Statistics = ({ id }: { id: string }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const {
    data: book,
    isError,
    error,
  } = useQuery({
    queryKey: ['bookInfo', id],
    queryFn: () => getBook({ id }),
    staleTime: 60 * 1000,
    retry: 0,
  });

  if (isError) {
    console.error(error);
  }

  if (!book) return null;

  const { progress, totalPages } = book;
  const lastReadedPage = Math.max(...(progress?.map(el => (el.finishPage ? el.finishPage : 0)) ?? [0]));
  const readedPercentage = ((lastReadedPage / totalPages) * 100).toFixed(2);

  const data = {
    datasets: [
      {
        label: '% of readed pages',
        data: [readedPercentage, 100],
        backgroundColor: ['#30b94d', '#1f1f1f'],
        borderWidth: 0,
        borderRadius: [30, -0],
        spacing: 0,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    cutout: '80%',
    responsive: true,
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    events: [],
  };

  return (
    <div className="mt-10 flex flex-col md:max-xl:mt-0 md:max-xl:ml-10 md:max-xl:w-[50%]">
      <div className="flex justify-between">
        <h3 className="text-lg/[18px] font-bold md:text-xl/[20px]">Statistics</h3>
        <SidebarNav />
      </div>
      <p className="text-white-secondary mt-5 text-sm/[18px] max-xl:hidden">
        Each page, each chapter is a new round of knowledge, a new step towards understanding. By rewriting statistics,
        we create our own reading history.
      </p>
      <div className="bg-black-tertiary mt-5 flex w-full flex-col items-center justify-center gap-5 rounded-[12px] py-5 md:gap-4 md:max-xl:py-7 xl:gap-2.5">
        <div className="relative h-[116px] w-[116px] md:h-[138px] md:w-[138px] xl:h-[190px] xl:w-[190px]">
          <span className="absolute top-[48px] left-[37px] text-lg/[20px] font-bold md:top-[59px] md:left-[46px] md:text-xl/[20px] xl:top-[85px] xl:left-[72px]">
            100%
          </span>
          <Doughnut data={data} options={options} />
        </div>
        <div className="flex gap-4">
          <div className="bg-success h-3.5 w-3.5 rounded-[4px]"></div>
          <div>
            <p className="text-sm/[18px] md:text-xl/[20px]">{readedPercentage}%</p>
            <p className="text-white-secondary mt-1 text-[10px]/[12px] md:mt-2 md:text-xs/[14px]">
              {lastReadedPage} pages read
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
