export const getFormattedDate = (finishReading: string): string => {
  const date = new Date(finishReading);
  const formattedDate = date.toLocaleDateString('uk-UA');
  return formattedDate;
};
