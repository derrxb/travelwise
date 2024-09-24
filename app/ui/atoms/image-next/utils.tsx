export const getImageProps = (path: string) => {
  return {
    lowSrc: `${path}/lqip-low.webp`,
    mediumSrc: `${path}/lqip-medium.webp`,
    originalSrc: `${path}/lqip-original.webp`,
  };
};
