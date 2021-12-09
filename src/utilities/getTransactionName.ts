export const getTransactionName = (id: any) => {
  const transactions: any = {
    0: 'All',
    1: 'Buy',
    2: 'Sell',
    3: 'Fund',
    4: 'Withdraw',
    5: 'Reedem',
  };

  return transactions[id];
};
