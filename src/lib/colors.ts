/**
 * Color System for Legal Tech Application
 * Using black and white theme with various shades
 * Modify these values to change the entire theme
 */

export const colors = {
  // White shades
  white: {
    pure: '#FFFFFF',
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
  },
  
  // Black shades
  black: {
    pure: '#000000',
    50: '#18181B',
    100: '#27272A',
    200: '#3F3F46',
    300: '#52525B',
    400: '#71717A',
  },
  
  // Neutral shades (gray scale)
  neutral: {
    50: '#FAFAFA',
    100: '#F4F4F5',
    200: '#E4E4E7',
    300: '#D4D4D8',
    400: '#A1A1AA',
    500: '#71717A',
    600: '#52525B',
    700: '#3F3F46',
    800: '#27272A',
    900: '#18181B',
    950: '#09090B',
  },
  
  // Semantic colors
  background: {
    primary: 'rgba(255, 255, 255, 0.95)', // Slight transparency for navbar
    secondary: '#FAFAFA',
    dark: '#09090B',
    transparent: 'rgba(255, 255, 255, 0)',
  },
  
  text: {
    primary: '#09090B',
    secondary: '#52525B',
    tertiary: '#A1A1AA',
    inverse: '#FFFFFF',
  },
  
  border: {
    light: '#E4E4E7',
    medium: '#D4D4D8',
    dark: '#3F3F46',
  },
  
  hover: {
    light: '#F4F4F5',
    medium: '#E4E4E7',
    dark: '#27272A',
  },
} as const;

export type Colors = typeof colors;
