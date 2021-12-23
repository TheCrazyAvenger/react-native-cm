export const getGainsLosses = (
  data: any,
  operations: any,
  ownedMetals: any,
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
    //   buyOperations.reduce((acc: number, next: any) => acc + +next.oz, 0) * buy;

    let acquisitionCost = 0;

    if (buyOperations[0]) {
      acquisitionCost = buyOperations[0].oz * +buyOperations[0].total;
    }

    return acc + holdingsPriceAsk - acquisitionCost * ownedMetals[name];
  }, 0);

  const metalHoldings = data.data.reduce((acc: number, metal: any) => {
    const {name, buy} = metal;

    const holdingsPrice = ownedMetals[name] * buy;

    return acc + holdingsPrice;
  }, 0);
  return {gainsLosses, metalHoldings};
};
