// utils/isMobile.ts
export const isMobileRequest = (userAgent?: string | null) => {
  return userAgent?.toLowerCase().includes("mobile") ?? false;
};
