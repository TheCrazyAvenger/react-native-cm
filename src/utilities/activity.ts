import {Buy, Deposit, Sold, Redeem, WithDraw} from '../assets/images/home';

export const activity = [
  {
    type: 'Bought Platinum',
    date: 'May 7, 2021',
    color: '#135D2D',
    usd: '+ $5.45',
    oz: '0.002 oz',
    Image: Buy,
    id: '1',
  },
  {
    type: 'Sold Platinum',
    date: 'May 7, 2021',
    color: '#135D2D',
    usd: '+ $7.80',
    oz: '0.003 oz',
    Image: Sold,
    id: '2',
  },
  {
    type: 'Deposited Cash',
    date: 'May 7, 2021',
    color: '#135D2D',
    usd: '+ $28.45',
    Image: Deposit,
    id: '3',
  },
  {
    type: 'Redeemed Products F...',
    date: 'May 7, 2021',
    color: '#135D2D',
    usd: '+ $4.12',
    Image: Redeem,
    id: '4',
  },
  {
    type: 'Withdrawn cash',
    date: 'May 7, 2021',
    color: '#A01313',
    usd: '- $17.00',
    Image: WithDraw,
    id: '5',
  },
];
