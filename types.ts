export type Language = 'en' | 'bs' | 'de' | 'tr';

export enum AppTab {
  LANDING = 'LANDING',
  CITY_GUIDE = 'CITY_GUIDE',
  HISTORY = 'HISTORY',
  MAP = 'MAP',
  QUEST = 'QUEST',
  GALLERY = 'GALLERY',
  WALLET = 'WALLET',
  TASK_MANAGER = 'TASK_MANAGER',
  FOOD = 'FOOD',
  ACCOMMODATION = 'ACCOMMODATION',
  AR = 'AR',
  PARKING = 'PARKING',
}

export interface TranslationSet {
  [key: string]: string;
}

export interface Location {
  id: string;
  name: Record<Language, string>;
  description: Record<Language, string>;
  image: string;
  coordinates: [number, number];
  category: string;
  qrCode: string;
  discount: string | number;
  _setIsLocked?: (locked: boolean) => void;
}

export interface LocationData {
  name: string;
  rating: number;
  user_ratings_total: number;
  address: string;
  latitude: number;
  longitude: number;
  category: string;
  type: string;
  image?: string;
  website?: string;
}
