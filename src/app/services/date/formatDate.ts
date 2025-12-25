import dayjs from 'dayjs';

export function formatDate(date: Date | null, format: string) {
  return dayjs(date).format(format);
}