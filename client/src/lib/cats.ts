import porkyImg from '@/assets/cats/porky-nobg.png';
import doubaoImg from '@/assets/cats/doubao-nobg.png';
import ricecakeImg from '@/assets/cats/ricecake-nobg.png';
import wanwanImg from '@/assets/cats/wanwan-nobg.png';
import mochiImg from '@/assets/cats/mochi-nobg.png';
import mochaImg from '@/assets/cats/mocha-nobg.png';

export type CatChoice = 'porky' | 'doubao' | 'ricecake' | 'wanwan' | 'mochi' | 'mocha';

export const CAT_DATA = {
  porky: { id: 'porky', name: 'Porky', breed: 'Ragdoll', img: porkyImg, color: '#FDF4FF' },
  doubao: { id: 'doubao', name: 'Doubao', breed: 'Blue British Shorthair', img: doubaoImg, color: '#EFF6FF' },
  ricecake: { id: 'ricecake', name: 'Rice Cake', breed: 'Orange Tabby', img: ricecakeImg, color: '#FFF7ED' },
  wanwan: { id: 'wanwan', name: 'Wanwan', breed: 'White British Shorthair', img: wanwanImg, color: '#F8FAFC' },
  mochi: { id: 'mochi', name: 'Mochi', breed: 'Grey and White', img: mochiImg, color: '#F3F4F6' },
  mocha: { id: 'mocha', name: 'Mocha', breed: 'Black and White', img: mochaImg, color: '#FAFAF9' },
} as const;
