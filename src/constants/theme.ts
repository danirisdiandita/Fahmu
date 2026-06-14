import '@/global.css';

import { Platform } from 'react-native';

export const SereneColors = {
  surface: '#fbf9f5',
  surfaceDim: '#dbdad6',
  surfaceBright: '#fbf9f5',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f5f3ef',
  surfaceContainer: '#efeeea',
  surfaceContainerHigh: '#eae8e4',
  surfaceContainerHighest: '#e4e2de',
  onSurface: '#1b1c1a',
  onSurfaceVariant: '#404944',
  inverseSurface: '#30312e',
  inverseOnSurface: '#f2f0ed',
  outline: '#707974',
  outlineVariant: '#bfc9c3',
  surfaceTint: '#2b6954',
  primary: '#003527',
  onPrimary: '#ffffff',
  primaryContainer: '#064e3b',
  onPrimaryContainer: '#80bea6',
  inversePrimary: '#95d3ba',
  secondary: '#735c00',
  onSecondary: '#ffffff',
  secondaryContainer: '#fed65b',
  onSecondaryContainer: '#745c00',
  tertiary: '#202f40',
  onTertiary: '#ffffff',
  tertiaryContainer: '#374557',
  onTertiaryContainer: '#a3b2c8',
  error: '#ba1a1a',
  onError: '#ffffff',
  errorContainer: '#ffdad6',
  onErrorContainer: '#93000a',
  primaryFixed: '#b0f0d6',
  primaryFixedDim: '#95d3ba',
  onPrimaryFixed: '#002117',
  onPrimaryFixedVariant: '#0b513d',
  secondaryFixed: '#ffe088',
  secondaryFixedDim: '#e9c349',
  onSecondaryFixed: '#241a00',
  onSecondaryFixedVariant: '#574500',
  tertiaryFixed: '#d4e4fa',
  tertiaryFixedDim: '#b9c8de',
  onTertiaryFixed: '#0d1c2d',
  onTertiaryFixedVariant: '#39485a',
  background: '#fbf9f5',
  onBackground: '#1b1c1a',
  surfaceVariant: '#e4e2de',
} as const;

export const Colors = {
  light: {
    text: SereneColors.onSurface,
    backgroundElement: SereneColors.surfaceContainerHigh,
    backgroundSelected: SereneColors.surfaceContainerHighest,
    textSecondary: SereneColors.onSurfaceVariant,
    ...SereneColors,
  },
  dark: {
    text: SereneColors.inverseOnSurface,
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
    ...SereneColors,
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'Manrope',
    serif: 'LibreCaslonText',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'Manrope',
    serif: 'LibreCaslonText',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'Manrope, system-ui, sans-serif',
    serif: 'Libre Caslon Text, Georgia, serif',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Typography = {
  displaySm: {
    fontFamily: Fonts.serif,
    fontSize: 36,
    fontWeight: '400',
    lineHeight: 44,
    letterSpacing: -0.02,
  },
  headlineLg: {
    fontFamily: Fonts.serif,
    fontSize: 28,
    fontWeight: '400',
    lineHeight: 36,
  },
  headlineLgMobile: {
    fontFamily: Fonts.serif,
    fontSize: 24,
    fontWeight: '400',
    lineHeight: 32,
  },
  headlineMd: {
    fontFamily: Fonts.serif,
    fontSize: 24,
    fontWeight: '400',
    lineHeight: 32,
  },
  bodyLg: {
    fontFamily: Fonts.sans,
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 28,
  },
  bodyMd: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  labelMd: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    letterSpacing: 0.05,
  },
} as const;

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const ArabicFont = 'ArabicText';

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  twoXl: 24,
  full: 9999,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
