export const getMetalsColor = (id: any) => {
  const metalsColor: any = {
    1: '#FFBD00',
    2: '#2F80ED',
    3: '#219653',
    4: '#F2994A',
    Gold: '#FFBD00',
    Silver: '#2F80ED',
    Platinum: '#219653',
    Palladium: '#F2994A',
  };

  return metalsColor[id];
};
