export const getColor = (text: string | number) => {
  const isDown = text.toString().includes('-');
  if (isDown) return 'red';
  return 'green';
};
