export const getCardType = (cardType: string | null) => {
  const cardTypes = {
    visa: 'Visa',
    masterCard: 'Master Card',
    americanExpress: 'American Express',
    discover: 'Discover',
    Unknown: '',
  };
  //@ts-ignore
  return cardTypes[cardType];
};
