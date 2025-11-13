import type React from 'react';

export type ProductType = 'tshirt' | 'bag' | 'phone';
export type PhoneBrandId =
  | 'apple'
  | 'google'
  | 'samsung'
  | 'xiaomi'
  | 'vivo'
  | 'oppo'
  | 'realme'
  | 'oneplus'
  | 'motorola'
  | 'infinix'
  | 'tecno'
  | 'nokia'
  | 'lava'
  | 'micromax'
  | 'karbonn'
  | 'lyf'
  | 'celkon'
  | 'iqoo';

export type PhoneModelId = string;

export interface Product {
  id: ProductType | PhoneModelId;
  name: string;
  mockup: React.FC<React.SVGProps<SVGSVGElement>>;
  designStyle: React.CSSProperties;
}

export interface PhoneBrand {
    id: PhoneBrandId;
    name: string;
    models: Record<PhoneModelId, Product>;
}