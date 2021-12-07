export const getReedemImage = (name: string) => {
  const images: any = {
    goldCoin: require('@assets/images/reedem/goldCoin.png'),
    silverCoin: require('@assets/images/reedem/silverCoin.png'),
  };

  return images[name];
};
