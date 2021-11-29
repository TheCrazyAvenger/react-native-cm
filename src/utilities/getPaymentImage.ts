import {CreditCard, BankWire, ACH, PayPal} from '../assets/images/settings';

export const getPaymentImage = (payment: string) => {
  const payments = {
    'Credit/Debit Card': CreditCard,
    'Bank Wire': BankWire,
    'ACH/eCheck': ACH,
    PayPal: PayPal,
  };
  //@ts-ignore
  return payments[payment];
};
