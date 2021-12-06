import {
  CreditCard,
  BankWire,
  ACH,
  PayPal,
  CashBalance,
  CreditCardBold,
  BankWireBold,
  ECheckBold,
  PayPalBold,
} from '@assets/images/settings';

export const getPaymentImage = (payment: string) => {
  const payments = {
    creditCard: CreditCard,
    bankWire: BankWire,
    payPal: PayPal,
    cashBalance: CashBalance,
    eCheck: ACH,
    creditCardBold: CreditCardBold,
    bankWireBold: BankWireBold,
    eCheckBold: ECheckBold,
    payPalBold: PayPalBold,
  };
  //@ts-ignore
  return payments[payment];
};
