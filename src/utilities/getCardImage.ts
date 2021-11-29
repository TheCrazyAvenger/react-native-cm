import {
  AmericanExpress,
  Discover,
  MasterCard,
  Visa,
} from '../assets/images/settings';

export const getCardImage = (cardType: string | null) => {
  const cardTypes = {
    visa: Visa,
    masterCard: MasterCard,
    americanExpress: AmericanExpress,
    discover: Discover,
    Unknown: null,
  };
  //@ts-ignore
  return cardTypes[cardType];
};
