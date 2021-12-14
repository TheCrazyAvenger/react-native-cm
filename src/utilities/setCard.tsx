import {cardNumberValidation} from '.';
import {Visa} from '../assets/images/settings';

export const setCard = (value: string) => {
  const number = value.replace(/ /g, '');
  if (number.match(/^4[0-9]{12}(?:[0-9]{3})?$/)) {
    return 'visa';
  } else if (
    number.match(
      /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/,
    )
  ) {
    return 'masterCard';
  } else if (number.match(/^3[47][0-9]{13}$/)) {
    return 'americanExpress';
  } else if (
    number.match(
      /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/,
    )
  ) {
    return 'discover';
  } else {
    return null;
  }
};
