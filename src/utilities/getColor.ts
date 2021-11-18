export const getColor = (text: string) => {
  const isUp = text.includes('+');
  if (isUp) return 'green';
  return 'red';
};
