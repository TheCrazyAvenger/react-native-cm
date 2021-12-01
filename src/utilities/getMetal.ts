export const getMetal = (name: string) => {
  const metals = {
    Gold: 0,
    Silver: 1,
    Palladium: 2,
    Platinum: 3,
  };
  //@ts-ignore
  return metals[name] | null;
};
