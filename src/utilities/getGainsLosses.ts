export const getGainsLosses = (
  data: any,
  operations: any,
  ownedMetals: any,
  type: 'cash' | 'percent' = 'cash',
) => {
  const gainsLosses = data.data.reduce((acc: number, metal: any) => {
    const {name, buy} = metal;
    const buyOperations = operations
      .filter((item: any) =>
        item.type === 'Buy' && item.product === name ? true : false,
      )
      .sort(
        (item: any, next: any) =>
          new Date(`${item.date}, ${item.time}`) <
          new Date(`${next.date}, ${next.time}`),
      );

    const holdingsPriceAsk = ownedMetals[name] * buy;

    const totalAcquisitionCost = buyOperations.reduce(
      (acc: number, next: any) => acc + +next.oz * +next.spot,
      0,
    );

    return type === 'cash'
      ? acc + (holdingsPriceAsk - totalAcquisitionCost)
      : totalAcquisitionCost === 0
      ? acc + (holdingsPriceAsk - totalAcquisitionCost)
      : acc + (holdingsPriceAsk - totalAcquisitionCost) / totalAcquisitionCost;
  }, 0);

  const metalHoldings = data.data.reduce((acc: number, metal: any) => {
    const {name, buy} = metal;

    const holdingsPrice = ownedMetals[name] * buy;

    return acc + holdingsPrice;
  }, 0);
  return {gainsLosses, metalHoldings};
};
