export const getNextYear = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth();
  const day = d.getDate();
  const nextYear = new Date(year + 1, month, day);
  return nextYear.toLocaleDateString();
};
