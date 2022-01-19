import {getMonth} from './getMonth';
import {getTime} from './getTime';

export const getTimeLineDate = (date: Date, value: number, type = 'date') => {
  try {
    if (type === 'date' || type === 'year') {
      const newDate = new Date(date.setDate(date.getDate() - Math.abs(value)));
      const month = getMonth(newDate.getMonth(), 'Short');
      const day = newDate.getDate();
      const year = newDate.getFullYear();

      return type === 'date' ? `${month} ${day}` : `${year}`;
    } else {
      const numberOfMlSeconds = date.getTime();
      const addMlSeconds = 60 * 60 * value * 2995;
      const newTime = new Date(numberOfMlSeconds + addMlSeconds);

      const {hours, minutes} = getTime(newTime);

      return `${hours < 10 ? '0' + hours : hours}:${
        minutes < 10 ? '0' + minutes : minutes
      }`;
    }
  } catch (e) {
    console.log(e);
  }
};
