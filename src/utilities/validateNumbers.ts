export const validateNumbers = (str: string, digitsAfterDot: number = 2) => {
  const number = str
    .replace(/[^0-9.]/g, '')
    .replace('.', 'x')
    .replace(/\./g, '')
    .replace('x', '.')
    .replace(/,/g, '');

  const dot = str.indexOf('.');

  if (dot !== -1) {
    return number
      .slice(0, dot + digitsAfterDot)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else {
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
};
