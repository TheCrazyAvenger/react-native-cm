export const cardInputValidation = (value: string) =>
  value
    .replace(/[^\dA-Z]/g, '')
    .replace(/(.{4})/g, '$1 ')
    .trim();
