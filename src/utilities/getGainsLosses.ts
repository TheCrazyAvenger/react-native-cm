export const getGainsLosses = (
  data: any,
  operations: any,
  ownedMetals: any,
) => {
  const gainsLosses = data.data.reduce((acc: number, metal: any) => {
    const {name, buy} = metal;
    const buyOperations = operations.filter((item: any) =>
      item.image === 'buy' && item.type.split(' ')[1] === name ? true : false,
    );

    const holdingsPriceAsk = ownedMetals[name] * buy;
    //   buyOperations.reduce((acc: number, next: any) => acc + +next.oz, 0) * buy;

    let acquisitionCost = 0;

    if (buyOperations[0]) {
      acquisitionCost =
        buyOperations[0].oz * buyOperations[0].usd.split('$')[1];
    }

    return acc + holdingsPriceAsk - acquisitionCost;
  }, 0);

  const metalHoldings = data.data.reduce((acc: number, metal: any) => {
    const {name, buy} = metal;

    const holdingsPrice = ownedMetals[name] * buy;

    return acc + holdingsPrice;
  }, 0);
  return {gainsLosses, metalHoldings};
};
