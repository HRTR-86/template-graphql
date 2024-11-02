import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';

dayjs.locale(ja);

/**
 * 日時をフォーマットする
 * @param dateTime
 * @param format
 */
export const format = (
  dateTime: string,
  format: string | undefined = 'YYYY/MM/DD(dd) HH:mm',
): string => {
  const targetDateTime = dayjs(dateTime);

  if (!targetDateTime.isValid()) {
    return '';
  }

  return targetDateTime.format(format);
};
