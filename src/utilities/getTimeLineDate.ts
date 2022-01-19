import {getMonth} from './getMonth';

export const getTimeLineDate = (type = 1, value: any) => {
  const date = new Date(value);

  return type === 1
    ? `${date.getHours()}:${
        date.getMinutes() < 10 ? '0' : ''
      }${date.getMinutes()}`
    : type === 2 || type === 3
    ? date.toLocaleDateString().split('/')[1] +
      ' ' +
      getMonth(date.getMonth(), 'Short')
    : type === 4 || type === 5
    ? date.getFullYear()
    : date.toLocaleDateString();
};
