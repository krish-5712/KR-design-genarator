import type { Product } from './types';
import { TshirtIcon, BagIcon, PhoneIcon } from './components/icons';

export const PRODUCTS: Record<string, Product> = {
  tshirt: {
    id: 'tshirt',
    name: 'T-Shirt',
    mockup: TshirtIcon,
    designStyle: {
      width: '35%',
      height: '40%',
      top: '25%',
      left: '50%',
      transform: 'translateX(-50%)',
    },
  },
  bag: {
    id: 'bag',
    name: 'School Bag',
    mockup: BagIcon,
    designStyle: {
      width: '50%',
      height: '40%',
      top: '30%',
      left: '50%',
      transform: 'translateX(-50%)',
    },
  },
  phone: {
    id: 'phone',
    name: 'Phone Cover',
    mockup: PhoneIcon,
    designStyle: {
      width: '80%',
      height: '80%',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  },
};