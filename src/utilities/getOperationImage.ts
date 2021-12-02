import {Buy, Redeem, Sold, WithDraw} from '../assets/images/home';
import {Fund} from '../assets/images/navigation';

export const getOperationImage = (name: string) => {
  const metals = {
    buy: Buy,
    sell: Sold,
    withdraw: WithDraw,
    redeem: Redeem,
    fund: Fund,
  };
  //@ts-ignore
  return metals[name];
};
