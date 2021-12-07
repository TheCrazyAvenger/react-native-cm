export const getMetalsColor = (id: number) => {
  const metalsColor: any = {
    1: '#FFBD00',
    2: '#2F80ED',
    3: '#219653',
    4: '#F2994A',
  };

  return metalsColor[id];
};
