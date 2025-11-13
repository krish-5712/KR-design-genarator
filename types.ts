// FIX: Import React to provide types for React.FC, React.SVGProps, and React.CSSProperties
import type React from 'react';

export type ProductType = 'tshirt' | 'bag' | 'phone';

export interface Product {
  id: ProductType;
  name: string;
  mockup: React.FC<React.SVGProps<SVGSVGElement>>;
  designStyle: React.CSSProperties;
}
