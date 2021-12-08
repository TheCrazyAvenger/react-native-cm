export const getShippingName = (shippingMethod: string) => {
  const shippingMethods: any = {
    baseShipping: 'Base Shipping',
    usps: 'USPS Priority',
    ups: 'UPS 3-Day Air',
  };

  return shippingMethods[shippingMethod];
};
