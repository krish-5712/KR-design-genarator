export type Style = 'photorealistic' | 'digital-art' | 'anime' | 'fantasy';
export type AspectRatio = '1:1' | '16:9' | '9:16';

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}
