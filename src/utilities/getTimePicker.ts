export const getTimePicker = (id: any) => {
  const time: any = {
    1: 'day',
    2: 'week',
    3: 'month',
    4: 'year',
    5: 'years',
  };

  return time[id];
};
