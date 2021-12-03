export const getPaymentName = (paymentMethod: string) => {
  const payments = {
    creditCard: 'Credit/Debit Card',
    bankWire: 'Bank Wire',
    payPal: 'PayPal',
    cashBalance: 'Cash Balance',
    eCheck: 'ACH/eCheck',
  };
  //@ts-ignore
  return payments[paymentMethod];
};
