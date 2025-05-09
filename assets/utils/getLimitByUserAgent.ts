export const getLimitByUserAgent = (userAgent: string | undefined): number => {
  if (!userAgent) return 10;

  const ua = userAgent.toLowerCase();

  if (/mobile|iphone|android/.test(ua)) return 2;
  if (/tablet|ipad/.test(ua)) return 8;

  return 10;
};
