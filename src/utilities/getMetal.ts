export const getMetal = (name: string | number) => {
  const metals: any = {
    Gold: 0,
    Silver: 1,
    Palladium: 2,
    Platinum: 3,
    1: 'Gold',
    2: 'Silver',
    3: 'Palladium',
    4: 'Platinum',
  };

  return metals[name];
};
