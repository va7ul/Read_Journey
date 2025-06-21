import { GroupedProgress, Progress } from '../definitions';

import { getFormattedDate } from './getFormattedDate';

export const getGroupedProgress = (inactiveReading: Progress[]) => {
  return inactiveReading?.reduce((acc, item) => {
    const date = getFormattedDate(item.finishReading);

    if (!acc[date]) {
      acc[date] = { pages: 0, list: [] };
    }

    const pagesRead = item.finishPage - item.startPage;
    acc[date].pages += pagesRead;
    acc[date].list.push(item);
    return acc;
  }, {} as GroupedProgress);
};
