export const cardNumberValidation = (value: string) => {
  let trimmed = value.replace(/\s+/g, '');
  if (trimmed.length > 16) {
    trimmed = trimmed.substr(0, 16);
  }

  let numbers = [];
  for (let i = 0; i < trimmed.length; i += 4) {
    numbers.push(trimmed.substr(i, 4));
  }

  return (value = numbers.join(' '));
};
