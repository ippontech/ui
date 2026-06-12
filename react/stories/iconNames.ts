// The icon name lists are derived from the generated `@ippon-ui/icons` type
// definitions (the source of truth, regenerated from the Ionicons SVGs), so the
// Storybook controls always stay in sync with the available icons.
import iconTypes from '@ippon-ui/icons/types/index.d.ts?raw';

const namesOf = (type: string): string[] => {
  const start = iconTypes.indexOf(`${type} =`);
  if (start === -1) {
    return [];
  }
  const end = iconTypes.indexOf(';', start);
  return [...iconTypes.slice(start, end).matchAll(/'([^']+)'/g)].map((match) => match[1]);
};

export const classicIconNames = namesOf('IconClassic');
export const logoIconNames = namesOf('IconLogo');
export const allIconNames = [...classicIconNames, ...logoIconNames];
