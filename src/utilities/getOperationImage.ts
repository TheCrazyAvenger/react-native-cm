import {Buy, Deposit, Redeem, Sold, WithDraw} from '../assets/images/home';

export const getOperationImage = (name: string) => {
  const metals = {
    buy: Buy,
    sell: Sold,
    withdraw: WithDraw,
    redeem: Redeem,
    fund: Deposit,
  };
  //@ts-ignore
  return metals[name];
};
