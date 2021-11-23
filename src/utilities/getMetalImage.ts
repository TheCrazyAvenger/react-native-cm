import {Gold, Palladium, Platinum, Silver} from '../assets/images/settings';

export const getMetalImage = (metal: string) => {
  const metals = {
    Gold: Gold,
    Silver: Silver,
    Platinum: Platinum,
    Palladium: Palladium,
  };
  //@ts-ignore
  return metals[metal];
};
