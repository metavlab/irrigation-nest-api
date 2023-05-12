import * as dayjs from 'dayjs';

/**
 *
 * @param dateNum
 *      number,string or date
 * @param format default YYYY-MM-DD HH:mm:ss
 * @returns string
 *
 */
export const formatDate = (
  dateNum: string | number | Date,
  formater = 'YYYY-MM-DD HH:mm:ss',
): string => {
  return dayjs(dateNum).format(formater);
};
