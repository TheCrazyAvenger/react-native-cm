export const getCardName = (cards: any, cardFullName: string) =>
  cards.filter((item: any) => item.fullName === cardFullName)[0].cardType;
