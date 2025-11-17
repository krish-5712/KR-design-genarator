import type { Style, AspectRatio } from './types';

export const STYLE_OPTIONS: { value: Style; label: string }[] = [
  { value: 'photorealistic', label: 'Photorealistic' },
  { value: 'digital-art', label: 'Digital Art' },
  { value: 'anime', label: 'Anime' },
  { value: 'fantasy', label: 'Fantasy' },
];

export const ASPECT_RATIO_OPTIONS: { value: AspectRatio; label: string }[] = [
  { value: '1:1', label: 'Square (1:1)' },
  { value: '16:9', label: 'Landscape (16:9)' },
  { value: '9:16', label: 'Portrait (9:16)' },
];
