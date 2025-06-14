import { useQuery } from '@tanstack/react-query';

import { getBook } from '@/assets/api';
import { GroupedProgress } from '@/assets/definitions';
import { getGroupedProgress } from '@/assets/utils/getGroupedProgress';

import { ReadingList } from './ReadingList';
import { SidebarNav } from './SidebarNav';

export const Diary = ({ id }: { id: string }) => {
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
  const inactiveReading = progress
    ?.filter(el => el.status === 'inactive')
    .toSorted((a, b) => new Date(b.finishReading).getTime() - new Date(a.finishReading).getTime());

  const groupedProgress: GroupedProgress = getGroupedProgress(inactiveReading);

  return (
    <div className="mt-10 flex flex-col md:max-xl:mt-0 md:max-xl:ml-10 md:max-xl:w-[50%]">
      <div className="flex justify-between">
        <h3 className="text-lg/[18px] font-bold md:text-xl/[20px]">Diary</h3>
        <SidebarNav />
      </div>
      <div className="bg-black-tertiary after:bg-black-secondary relative mt-5 flex w-full flex-col items-center justify-center rounded-[12px] py-4 after:absolute after:top-4 after:bottom-4 after:left-[23px] after:w-[2px]">
        <ul className="flex h-[180px] w-full flex-col gap-4 overflow-y-auto">
          <ReadingList groupedProgress={groupedProgress} totalPages={totalPages} />
        </ul>
      </div>
    </div>
  );
};
