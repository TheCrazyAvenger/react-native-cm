import {
  CreditCard,
  BankWire,
  ACH,
  PayPal,
  CashBalance,
} from '@assets/images/settings';

export const getPaymentImage = (payment: string) => {
  const payments = {
    creditCard: CreditCard,
    bankWire: BankWire,
    payPal: PayPal,
    cashBalance: CashBalance,
    eCheck: ACH,
  };
  //@ts-ignore
  return payments[payment];
};
