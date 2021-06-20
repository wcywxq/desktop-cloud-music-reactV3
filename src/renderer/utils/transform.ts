import dayjs from "dayjs";

export const transformDate = (val?: Date) => dayjs(val).format("YYYY-MM-DD");

export const transformUnit = (val: number) => {
  if (!val) return 0;
  let length = val.toString().length;
  if (length > 4 && length < 9) {
    return `${(val / 10000).toFixed(2)}w`;
  }
  if (length > 8) {
    return `${(val / 1000000000).toFixed(2)}亿`;
  }
  return val;
};
