import Image from 'next/image';
import { useParams } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';
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

import { readingDelete } from '@/assets/api';
import { Book, GroupedProgress } from '@/assets/definitions';
import Trash from '@icons/trash.svg';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

type Props = {
  groupedProgress: GroupedProgress;
  totalPages: number;
};

type ParamsProps = {
  bookId: string;
  readingId: string;
};

export const ReadingList = ({ groupedProgress, totalPages }: Props) => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const { mutateAsync: deleteReading } = useMutation<Book, Error, ParamsProps>({
    mutationFn: ({ bookId, readingId }) => readingDelete({ bookId, readingId }),
    onSuccess: book => {
      queryClient.setQueryData(['bookInfo', id], () => book);
    },
    onError: error => {
      console.error('Failed to add book:', error);
    },
  });

  const handleDelete = async (_id: string) => {
    try {
      await deleteReading({ bookId: id, readingId: _id });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {Object.entries(groupedProgress).map(([date, { pages, list }]) => (
        <li
          key={date}
          className="after:bg-black-secondary relative flex flex-col justify-center pb-4 after:absolute after:top-4 after:bottom-0 after:left-[23px] after:w-[2px] last:pb-0 last:after:content-none md:after:left-[25px] xl:pb-7 xl:after:left-[29px] xl:last:pb-0"
        >
          <div className="mr-9 mb-4 ml-4 flex justify-between md:mr-9.5 xl:mr-10.5 xl:mb-7 xl:ml-5">
            <div className="flex gap-2.5">
              <div className="bg-white-primary relative z-10 flex h-4 w-4 items-center justify-center rounded-[4px] md:h-5 md:w-5">
                <div className="bg-black-primary h-2 w-2 rounded-[2px] md:h-3 md:w-3"></div>
              </div>
              <p className="text-xs/[16px] font-bold md:text-base/[18px]">{date}</p>
            </div>
            <p className="text-xs-[16px] text-white-secondary">{pages} pages</p>
          </div>

          <ul className="mr-4 ml-10.5 flex flex-col gap-4 md:ml-11.5 xl:mr-5 xl:ml-12.5">
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
                maintainAspectRatio: false,
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
                    <p className="text-sm/[18px] md:text-xl/[20px]">
                      {(((finishPage - startPage) / totalPages) * 100).toFixed(1)}%
                    </p>
                    <p className="text-white-secondary mt-1 text-[10px]/[12px] md:mt-2 md:text-xs/[14px]">
                      {durationMinutes} minutes
                    </p>
                  </div>
                  <div className="text-white-secondary mx-0 ml-auto flex flex-col items-center">
                    <div className="flex h-[18px] w-[44px] justify-end md:h-[24px] md:w-[60px]">
                      <Line options={options} data={data} />
                    </div>
                    <p className="mt-1.5 text-[10px]/[12px] md:text-xs/[14px]">
                      {speed} pages <br />
                      per hour
                    </p>
                  </div>
                  <button
                    type="button"
                    className="mt-0.5 ml-1.5 flex items-start md:mt-1.5 md:ml-2"
                    onClick={() => handleDelete(_id)}
                  >
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
