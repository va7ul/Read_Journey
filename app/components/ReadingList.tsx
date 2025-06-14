import Image from 'next/image';

import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { GroupedProgress } from '@/assets/definitions';
import Trash from '@icons/trash.svg';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

type Props = {
  groupedProgress: GroupedProgress;
  totalPages: number;
};

export const ReadingList = ({ groupedProgress, totalPages }: Props) => {
  return (
    <>
      {Object.entries(groupedProgress).map(([date, { pages, list }]) => (
        <li key={date} className="flex flex-col justify-center">
          <div className="mr-9 mb-4 ml-4 flex justify-between">
            <div className="flex gap-2.5">
              <div className="bg-white-primary relative z-10 flex h-4 w-4 items-center justify-center rounded-[4px] md:h-5 md:w-5">
                <div className="bg-black-primary h-2 w-2 rounded-[2px] md:h-3 md:w-3"></div>
              </div>
              <p className="text-xs/[16px] font-bold md:text-base/[18px]">{date}</p>
            </div>
            <p className="text-xs-[16px]">{pages} pages</p>
          </div>

          <ul className="mr-4 ml-10.5 flex flex-col gap-4">
            {list?.map(({ _id, speed, finishPage, startPage, finishReading, startReading }) => {
              const data = {
                labels: ['', ''],
                datasets: [
                  {
                    label: 'Dataset',
                    data: [startPage, finishPage],
                    borderColor: '#30B94D',
                    backgroundColor: '#30B94D33',
                    fill: true,
                    borderWidth: 2,
                    borderCapStyle: 'round' as const,
                  },
                ],
              };

              const options = {
                responsive: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                  title: {
                    display: false,
                  },
                  tooltip: {
                    enabled: false,
                  },
                },
                elements: {
                  point: {
                    radius: 0,
                  },
                },
                scales: {
                  x: {
                    display: false,
                    // min: 0,
                    // max: 25,
                  },
                  y: {
                    display: false,
                    min: 0,
                    max: finishPage + 2,
                  },
                },
                events: [],
              };

              const durationMs = new Date(finishReading).getTime() - new Date(startReading).getTime();
              const durationMinutes = Math.round(durationMs / 1000 / 60);

              return (
                <li key={_id} className="flex">
                  <div className="flex flex-col">
                    <p className="text-sm/[18px]">{(((finishPage - startPage) / totalPages) * 100).toFixed(1)}%</p>
                    <p className="text-white-secondary mt-1 text-[10px]/[12px]">{durationMinutes} minutes</p>
                  </div>
                  <div className="text-white-secondary mx-0 ml-auto flex flex-col items-end">
                    <div className="flex h-[18px] w-[43px] justify-end md:h-[24px] md:w-[59px]">
                      <Line options={options} data={data} />
                    </div>
                    <p className="mt-2 text-[10px]/[12px]">
                      {speed} pages <br />
                      per hour
                    </p>
                  </div>
                  <button type="button" className="mt-0.5 ml-1.5 flex items-start">
                    <Image src={Trash} alt="Trash icon" />
                  </button>
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </>
  );
};
