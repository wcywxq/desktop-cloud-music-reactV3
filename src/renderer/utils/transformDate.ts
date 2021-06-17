import dayjs from 'dayjs';

export const transformDate = (val?: Date) => dayjs(val).format('YYYY-MM-DD');
