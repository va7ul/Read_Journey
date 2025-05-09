export const getLimitByWindow = (width: number) => {
  if (width < 768) return 2;
  if (width < 1280) return 8;
  return 10;
};
