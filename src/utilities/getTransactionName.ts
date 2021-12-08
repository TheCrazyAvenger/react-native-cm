export const getTransactionName = (id: any) => {
  const transactions: any = {
    0: 'All',
    1: 'buy',
    2: 'sell',
    3: 'fund',
    4: 'withdraw',
    5: 'reedem',
  };

  return transactions[id];
};
