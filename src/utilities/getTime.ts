import {getMonth} from '@utilities';

export const getTime = (dateString: string) => {
  const date = new Date(dateString);
  const monthName = getMonth(date.getMonth());
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const localDate = date.toLocaleDateString();
  const month = date.getMonth() + 1;

  return {month, day, year, hours, minutes, seconds, localDate, monthName};
};
