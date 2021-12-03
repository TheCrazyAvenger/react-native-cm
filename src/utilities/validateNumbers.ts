export const validateNumbers = (str: string) =>
  str
    .replace(/[^0-9.]/g, '')
    .replace('.', 'x')
    .replace(/\./g, '')
    .replace('x', '.');
