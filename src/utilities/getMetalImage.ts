import {Gold, Palladium, Platinum, Silver} from '../assets/images/settings';

export const getMetalImage = (metal: string) => {
  const metals: any = {
    Gold: Gold,
    Silver: Silver,
    Platinum: Platinum,
    Palladium: Palladium,
  };

  return metals[metal];
};
