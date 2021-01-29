import dayjs from 'dayjs';

export const toLocaleDate = (date) => dayjs(date).format('YYYY-MM-DD HH:mm:ss');
