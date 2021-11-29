import {cardNumberValidation} from '.';
import {Visa} from '../assets/images/settings';

export const setCard = (value: string) => {
  const number = cardNumberValidation(value);
  if (number.match(/^4[0-9]{3} [0-9]{4} [0-9]{4} [0-9]{4}$/)) {
    return 'visa';
  } else if (
    number.match(
      /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)\s[0-9]{4} [0-9]{4} [0-9]{4}$/,
    )
  ) {
    return 'masterCard';
  } else if (number.match(/^3[47][0-9]{2} [0-9]{6} [0-9]{5}$/)) {
    return 'americanExpress';
  } else if (number.match(/^6(?:011|5[0-9]{2}) [0-9]{4} [0-9]{4} [0-9]{4}$/)) {
    return 'discover';
  } else {
    return null;
  }
};
