export const setIntervalAsync = (timer: NodeJS.Timeout | null, fn: any, ms: number) => {
  fn().then(() => {
    timer = setTimeout(() => setIntervalAsync(timer, fn, ms), ms);
  });
};
