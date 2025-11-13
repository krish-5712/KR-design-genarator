import type { Product, PhoneBrand, ProductType, PhoneBrandId } from './types';
import { 
  TshirtIcon, 
  BagIcon, 
  PhoneIcon, 
  Iphone15ProIcon, 
  Iphone15Icon, 
  SamsungS24UltraIcon,
  SamsungS24Icon,
  Pixel8ProIcon, 
  SamsungA33Icon,
  Xiaomi14UltraIcon,
  PhoneIconVertical,
  PhoneIconSquare,
} from './components/icons';

const fullCoverDesignStyle = {
  width: '100%',
  height: '100%',
  top: '0',
  left: '0',
  transform: 'none',
  borderRadius: '0',
};

export const PRODUCTS: Record<ProductType, Product> = {
  tshirt: {
    id: 'tshirt',
    name: 'T-Shirt',
    mockup: TshirtIcon,
    designStyle: {
      width: '35%',
      height: '40%',
      top: '52%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  },
  bag: {
    id: 'bag',
    name: 'Tote Bag',
    mockup: BagIcon,
    designStyle: {
      width: '50%',
      height: '45%',
      top: '55%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  },
  phone: {
    id: 'phone',
    name: 'Phone Cover',
    mockup: PhoneIcon,
    designStyle: fullCoverDesignStyle,
  },
};

const addPhoneProps = (model: Omit<Product, 'designStyle'>): Product => ({
  ...model,
  designStyle: fullCoverDesignStyle,
});

export const PHONE_DATA: Record<PhoneBrandId, PhoneBrand> = {
  apple: {
    id: 'apple',
    name: 'Apple',
    models: {
      'iphone-15-pro-max': addPhoneProps({ id: 'iphone-15-pro-max', name: 'iPhone 15 Pro Max', mockup: Iphone15ProIcon }),
      'iphone-15-pro': addPhoneProps({ id: 'iphone-15-pro', name: 'iPhone 15 Pro', mockup: Iphone15ProIcon }),
      'iphone-15-plus': addPhoneProps({ id: 'iphone-15-plus', name: 'iPhone 15 Plus', mockup: Iphone15Icon }),
      'iphone-15': addPhoneProps({ id: 'iphone-15', name: 'iPhone 15', mockup: Iphone15Icon }),
      'iphone-14-pro-max': addPhoneProps({ id: 'iphone-14-pro-max', name: 'iPhone 14 Pro Max', mockup: Iphone15ProIcon }),
      'iphone-14-pro': addPhoneProps({ id: 'iphone-14-pro', name: 'iPhone 14 Pro', mockup: Iphone15ProIcon }),
      'iphone-14-plus': addPhoneProps({ id: 'iphone-14-plus', name: 'iPhone 14 Plus', mockup: Iphone15Icon }),
      'iphone-14': addPhoneProps({ id: 'iphone-14', name: 'iPhone 14', mockup: Iphone15Icon }),
      'iphone-se-3': addPhoneProps({ id: 'iphone-se-3', name: 'iPhone SE (2022)', mockup: Iphone15Icon }),
      'iphone-13-pro-max': addPhoneProps({ id: 'iphone-13-pro-max', name: 'iPhone 13 Pro Max', mockup: Iphone15ProIcon }),
      'iphone-13-pro': addPhoneProps({ id: 'iphone-13-pro', name: 'iPhone 13 Pro', mockup: Iphone15ProIcon }),
      'iphone-13': addPhoneProps({ id: 'iphone-13', name: 'iPhone 13', mockup: Iphone15Icon }),
      'iphone-13-mini': addPhoneProps({ id: 'iphone-13-mini', name: 'iPhone 13 mini', mockup: Iphone15Icon }),
      'iphone-12-pro-max': addPhoneProps({ id: 'iphone-12-pro-max', name: 'iPhone 12 Pro Max', mockup: Iphone15ProIcon }),
      'iphone-12-pro': addPhoneProps({ id: 'iphone-12-pro', name: 'iPhone 12 Pro', mockup: Iphone15ProIcon }),
      'iphone-12': addPhoneProps({ id: 'iphone-12', name: 'iPhone 12', mockup: Iphone15Icon }),
      'iphone-12-mini': addPhoneProps({ id: 'iphone-12-mini', name: 'iPhone 12 mini', mockup: Iphone15Icon }),
      'iphone-11-pro-max': addPhoneProps({ id: 'iphone-11-pro-max', name: 'iPhone 11 Pro Max', mockup: Iphone15ProIcon }),
      'iphone-11-pro': addPhoneProps({ id: 'iphone-11-pro', name: 'iPhone 11 Pro', mockup: Iphone15ProIcon }),
      'iphone-11': addPhoneProps({ id: 'iphone-11', name: 'iPhone 11', mockup: Iphone15Icon }),
      // Older models
      'iphone-xs-max': addPhoneProps({ id: 'iphone-xs-max', name: 'iPhone XS Max', mockup: Iphone15Icon }),
      'iphone-xs': addPhoneProps({ id: 'iphone-xs', name: 'iPhone XS', mockup: Iphone15Icon }),
      'iphone-xr': addPhoneProps({ id: 'iphone-xr', name: 'iPhone XR', mockup: Iphone15Icon }),
      'iphone-x': addPhoneProps({ id: 'iphone-x', name: 'iPhone X', mockup: Iphone15Icon }),
      'iphone-8-plus': addPhoneProps({ id: 'iphone-8-plus', name: 'iPhone 8 Plus', mockup: PhoneIcon }),
      'iphone-8': addPhoneProps({ id: 'iphone-8', name: 'iPhone 8', mockup: PhoneIcon }),
      'iphone-7-plus': addPhoneProps({ id: 'iphone-7-plus', name: 'iPhone 7 Plus', mockup: PhoneIcon }),
      'iphone-7': addPhoneProps({ id: 'iphone-7', name: 'iPhone 7', mockup: PhoneIcon }),
    },
  },
  google: {
    id: 'google',
    name: 'Google',
    models: {
      'pixel-fold': addPhoneProps({ id: 'pixel-fold', name: 'Pixel Fold', mockup: Pixel8ProIcon }),
      'pixel-8-pro': addPhoneProps({ id: 'pixel-8-pro', name: 'Pixel 8 Pro', mockup: Pixel8ProIcon }),
      'pixel-8': addPhoneProps({ id: 'pixel-8', name: 'Pixel 8', mockup: Pixel8ProIcon }),
      'pixel-7a': addPhoneProps({ id: 'pixel-7a', name: 'Pixel 7a', mockup: Pixel8ProIcon }),
      'pixel-7-pro': addPhoneProps({ id: 'pixel-7-pro', name: 'Pixel 7 Pro', mockup: Pixel8ProIcon }),
      'pixel-7': addPhoneProps({ id: 'pixel-7', name: 'Pixel 7', mockup: Pixel8ProIcon }),
      'pixel-6a': addPhoneProps({ id: 'pixel-6a', name: 'Pixel 6a', mockup: Pixel8ProIcon }),
      'pixel-6-pro': addPhoneProps({ id: 'pixel-6-pro', name: 'Pixel 6 Pro', mockup: Pixel8ProIcon }),
      'pixel-6': addPhoneProps({ id: 'pixel-6', name: 'Pixel 6', mockup: Pixel8ProIcon }),
      'pixel-5': addPhoneProps({ id: 'pixel-5', name: 'Pixel 5', mockup: PhoneIconSquare }),
      'pixel-4a': addPhoneProps({ id: 'pixel-4a', name: 'Pixel 4a', mockup: PhoneIconSquare }),
    },
  },
  samsung: {
    id: 'samsung',
    name: 'Samsung',
    models: {
       // Flagships
      'galaxy-s24-ultra': addPhoneProps({ id: 'galaxy-s24-ultra', name: 'Galaxy S24 Ultra', mockup: SamsungS24UltraIcon }),
      'galaxy-s23-ultra': addPhoneProps({ id: 'galaxy-s23-ultra', name: 'Galaxy S23 Ultra', mockup: SamsungS24UltraIcon }),
      'galaxy-s22-ultra': addPhoneProps({ id: 'galaxy-s22-ultra', name: 'Galaxy S22 Ultra', mockup: SamsungS24UltraIcon }),
      
      'galaxy-s24-plus': addPhoneProps({ id: 'galaxy-s24-plus', name: 'Galaxy S24+', mockup: SamsungS24Icon }),
      'galaxy-s24': addPhoneProps({ id: 'galaxy-s24', name: 'Galaxy S24', mockup: SamsungS24Icon }),
      'galaxy-s23-plus': addPhoneProps({ id: 'galaxy-s23-plus', name: 'Galaxy S23+', mockup: SamsungS24Icon }),
      'galaxy-s23': addPhoneProps({ id: 'galaxy-s23', name: 'Galaxy S23', mockup: SamsungS24Icon }),
      'galaxy-s23-fe': addPhoneProps({ id: 'galaxy-s23-fe', name: 'Galaxy S23 FE', mockup: SamsungS24Icon }),
      'galaxy-s22-plus': addPhoneProps({ id: 'galaxy-s22-plus', name: 'Galaxy S22+', mockup: SamsungS24Icon }),
      'galaxy-s22': addPhoneProps({ id: 'galaxy-s22', name: 'Galaxy S22', mockup: SamsungS24Icon }),

      // Foldables
      'galaxy-z-fold-6': addPhoneProps({ id: 'galaxy-z-fold-6', name: 'Galaxy Z Fold 6', mockup: PhoneIconVertical }),
      'galaxy-z-flip-6': addPhoneProps({ id: 'galaxy-z-flip-6', name: 'Galaxy Z Flip 6', mockup: PhoneIconVertical }),
      'galaxy-z-fold-5': addPhoneProps({ id: 'galaxy-z-fold-5', name: 'Galaxy Z Fold 5', mockup: PhoneIconVertical }),
      'galaxy-z-flip-5': addPhoneProps({ id: 'galaxy-z-flip-5', name: 'Galaxy Z Flip 5', mockup: PhoneIconVertical }),
      
      // A Series
      'galaxy-a55': addPhoneProps({ id: 'galaxy-a55', name: 'Galaxy A55', mockup: SamsungS24Icon }),
      'galaxy-a35': addPhoneProps({ id: 'galaxy-a35', name: 'Galaxy A35', mockup: SamsungS24Icon }),
      'galaxy-a54': addPhoneProps({ id: 'galaxy-a54', name: 'Galaxy A54', mockup: SamsungS24Icon }),
      'galaxy-a34': addPhoneProps({ id: 'galaxy-a34', name: 'Galaxy A34', mockup: SamsungS24Icon }),
      'galaxy-a33': addPhoneProps({ id: 'galaxy-a33', name: 'Galaxy A33', mockup: SamsungA33Icon }),

      // M Series
      'galaxy-m55': addPhoneProps({ id: 'galaxy-m55', name: 'Galaxy M55', mockup: SamsungS24Icon }),
    },
  },
  xiaomi: {
    id: 'xiaomi',
    name: 'Xiaomi',
    models: {
      'xiaomi-14-ultra': addPhoneProps({ id: 'xiaomi-14-ultra', name: 'Xiaomi 14 Ultra', mockup: Xiaomi14UltraIcon }),
      'xiaomi-14': addPhoneProps({ id: 'xiaomi-14', name: 'Xiaomi 14', mockup: PhoneIconSquare }),
      'xiaomi-13-ultra': addPhoneProps({ id: 'xiaomi-13-ultra', name: 'Xiaomi 13 Ultra', mockup: Xiaomi14UltraIcon }),
      'xiaomi-13-pro': addPhoneProps({ id: 'xiaomi-13-pro', name: 'Xiaomi 13 Pro', mockup: PhoneIconSquare }),
      'redmi-note-13-pro-plus': addPhoneProps({ id: 'redmi-note-13-pro-plus', name: 'Redmi Note 13 Pro+', mockup: PhoneIconSquare }),
      'redmi-note-13-pro': addPhoneProps({ id: 'redmi-note-13-pro', name: 'Redmi Note 13 Pro', mockup: PhoneIconSquare }),
      'poco-f6-pro': addPhoneProps({ id: 'poco-f6-pro', name: 'Poco F6 Pro', mockup: PhoneIconSquare }),
      'poco-x6-pro': addPhoneProps({ id: 'poco-x6-pro', name: 'Poco X6 Pro', mockup: PhoneIconSquare }),
    }
  },
  vivo: {
    id: 'vivo',
    name: 'Vivo',
    models: {
      'vivo-x100-pro': addPhoneProps({ id: 'vivo-x100-pro', name: 'Vivo X100 Pro', mockup: Xiaomi14UltraIcon }),
      'vivo-x90-pro': addPhoneProps({ id: 'vivo-x90-pro', name: 'Vivo X90 Pro', mockup: Xiaomi14UltraIcon }),
      'vivo-v30-pro': addPhoneProps({ id: 'vivo-v30-pro', name: 'Vivo V30 Pro', mockup: PhoneIconSquare }),
      'vivo-v29-pro': addPhoneProps({ id: 'vivo-v29-pro', name: 'Vivo V29 Pro', mockup: PhoneIconSquare }),
    }
  },
  oppo: {
    id: 'oppo',
    name: 'Oppo',
    models: {
      'oppo-find-x7-ultra': addPhoneProps({ id: 'oppo-find-x7-ultra', name: 'Oppo Find X7 Ultra', mockup: Xiaomi14UltraIcon }),
      'oppo-find-x6-pro': addPhoneProps({ id: 'oppo-find-x6-pro', name: 'Oppo Find X6 Pro', mockup: Xiaomi14UltraIcon }),
      'oppo-reno-11-pro': addPhoneProps({ id: 'oppo-reno-11-pro', name: 'Oppo Reno 11 Pro', mockup: PhoneIconVertical }),
      'oppo-reno-10-pro': addPhoneProps({ id: 'oppo-reno-10-pro', name: 'Oppo Reno 10 Pro', mockup: PhoneIconVertical }),
    }
  },
  realme: {
    id: 'realme',
    name: 'Realme',
    models: {
      'realme-gt-6': addPhoneProps({ id: 'realme-gt-6', name: 'Realme GT 6', mockup: Pixel8ProIcon }),
      'realme-gt-5-pro': addPhoneProps({ id: 'realme-gt-5-pro', name: 'Realme GT 5 Pro', mockup: Xiaomi14UltraIcon }),
      'realme-12-pro-plus': addPhoneProps({ id: 'realme-12-pro-plus', name: 'Realme 12 Pro+', mockup: Xiaomi14UltraIcon }),
    }
  },
  oneplus: {
    id: 'oneplus',
    name: 'OnePlus',
    models: {
      'oneplus-12': addPhoneProps({ id: 'oneplus-12', name: 'OnePlus 12', mockup: Xiaomi14UltraIcon }),
      'oneplus-12r': addPhoneProps({ id: 'oneplus-12r', name: 'OnePlus 12R', mockup: Xiaomi14UltraIcon }),
      'oneplus-open': addPhoneProps({ id: 'oneplus-open', name: 'OnePlus Open', mockup: Xiaomi14UltraIcon }),
      'oneplus-11': addPhoneProps({ id: 'oneplus-11', name: 'OnePlus 11', mockup: Xiaomi14UltraIcon }),
      'oneplus-nord-3': addPhoneProps({ id: 'oneplus-nord-3', name: 'OnePlus Nord 3', mockup: PhoneIconVertical }),
    },
  },
  motorola: {
    id: 'motorola',
    name: 'Motorola',
    models: {
      'moto-razr-40-ultra': addPhoneProps({ id: 'moto-razr-40-ultra', name: 'Moto Razr 40 Ultra', mockup: Pixel8ProIcon }),
      'moto-edge-50-pro': addPhoneProps({ id: 'moto-edge-50-pro', name: 'Moto Edge 50 Pro', mockup: PhoneIconSquare }),
      'moto-g84': addPhoneProps({ id: 'moto-g84', name: 'Moto G84', mockup: PhoneIconSquare }),
    }
  },
  iqoo: {
    id: 'iqoo',
    name: 'iQOO',
    models: {
      'iqoo-12': addPhoneProps({ id: 'iqoo-12', name: 'iQOO 12', mockup: PhoneIconSquare }),
      'iqoo-neo-9-pro': addPhoneProps({ id: 'iqoo-neo-9-pro', name: 'iQOO Neo 9 Pro', mockup: PhoneIconSquare }),
    }
  },
  infinix: {
    id: 'infinix',
    name: 'Infinix',
    models: {
        'infinix-gt-20-pro': addPhoneProps({ id: 'infinix-gt-20-pro', name: 'Infinix GT 20 Pro', mockup: PhoneIconSquare }),
        'infinix-note-40-pro': addPhoneProps({ id: 'infinix-note-40-pro', name: 'Infinix Note 40 Pro', mockup: PhoneIconSquare }),
    }
  },
  tecno: {
      id: 'tecno',
      name: 'Tecno',
      models: {
          'tecno-phantom-v-fold': addPhoneProps({ id: 'tecno-phantom-v-fold', name: 'Tecno Phantom V Fold', mockup: Xiaomi14UltraIcon }),
          'tecno-camon-30-premier': addPhoneProps({ id: 'tecno-camon-30-premier', name: 'Tecno Camon 30 Premier', mockup: Xiaomi14UltraIcon }),
      }
  },
  nokia: {
      id: 'nokia',
      name: 'Nokia',
      models: {
          'nokia-g42': addPhoneProps({ id: 'nokia-g42', name: 'Nokia G42', mockup: PhoneIconVertical }),
          'nokia-x30': addPhoneProps({ id: 'nokia-x30', name: 'Nokia X30', mockup: PhoneIconVertical }),
      }
  },
  lava: {
      id: 'lava',
      name: 'Lava',
      models: {
          'lava-agni-2': addPhoneProps({ id: 'lava-agni-2', name: 'Lava Agni 2', mockup: Xiaomi14UltraIcon }),
          'lava-blaze-curve': addPhoneProps({ id: 'lava-blaze-curve', name: 'Lava Blaze Curve', mockup: PhoneIconVertical }),
      }
  },
  micromax: {
      id: 'micromax',
      name: 'Micromax',
      models: {
          'micromax-in-note-2': addPhoneProps({ id: 'micromax-in-note-2', name: 'Micromax IN Note 2', mockup: PhoneIconVertical }),
      }
  },
  karbonn: {
      id: 'karbonn',
      name: 'Karbonn',
      models: {
        'karbonn-titanium-s9-plus': addPhoneProps({ id: 'karbonn-titanium-s9-plus', name: 'Karbonn Titanium S9 Plus', mockup: PhoneIcon }),
      }
  },
  lyf: {
      id: 'lyf',
      name: 'LYF',
      models: {
        'lyf-earth-1': addPhoneProps({ id: 'lyf-earth-1', name: 'LYF Earth 1', mockup: PhoneIcon }),
      }
  },
  celkon: {
      id: 'celkon',
      name: 'Celkon',
      models: {
        'celkon-star-4g-plus': addPhoneProps({ id: 'celkon-star-4g-plus', name: 'Celkon Star 4G+', mockup: PhoneIcon }),
      }
  },
};