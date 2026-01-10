import { twMerge } from 'tailwind-merge';
import clsx, { ClassValue } from 'clsx';

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(args));
};

export const ASSET_PATHS = {
  EVENTS: '/events',
  FEEDS: '/feeds',
  TEAMS: '/teams',
  HOME: '/home',
  FONTS: '/fonts',
} as const;