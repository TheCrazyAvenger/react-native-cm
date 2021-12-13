import {Gold, Palladium, Platinum, Silver} from '../assets/images/settings';

export const metals = [
  {
    color: '#FFBD00',
    backgroundColor: '#FFEDBB',
    Image: Gold,
    metal: 'Gold',
    linearGradient: ['#FFBD00', '#FFA800'],
    id: 1,
  },
  {
    color: '#2F80ED',
    backgroundColor: '#B7D5FF',
    Image: Silver,
    metal: 'Silver',
    linearGradient: ['#2F80ED', '#2F92ED'],
    id: 2,
  },
  {
    color: '#219653',
    backgroundColor: '#B9DFC9',
    Image: Platinum,
    metal: 'Platinum',
    linearGradient: ['#219653', '#219642'],
    id: 3,
  },
  {
    color: '#F2994A',
    backgroundColor: '#F8D5B5',
    Image: Palladium,
    metal: 'Palladium',
    linearGradient: ['#F2994A', '#F2864A'],
    id: 4,
  },
];
