import {
  Manrope_400Regular,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
} from '@expo-google-fonts/manrope';
import {
  LibreCaslonText_400Regular,
  LibreCaslonText_700Bold,
} from '@expo-google-fonts/libre-caslon-text';
import {
  NotoNaskhArabic_400Regular,
  NotoNaskhArabic_500Medium,
  NotoNaskhArabic_600SemiBold,
  NotoNaskhArabic_700Bold,
} from '@expo-google-fonts/noto-naskh-arabic';
import { useFonts } from 'expo-font';

export function useLoadFonts() {
  return useFonts({
    Manrope: Manrope_400Regular,
    'Manrope-SemiBold': Manrope_600SemiBold,
    'Manrope-Bold': Manrope_700Bold,
    'Manrope-ExtraBold': Manrope_800ExtraBold,
    LibreCaslonText: LibreCaslonText_400Regular,
    'LibreCaslonText-Bold': LibreCaslonText_700Bold,
    ArabicText: NotoNaskhArabic_400Regular,
    'ArabicText-Medium': NotoNaskhArabic_500Medium,
    'ArabicText-SemiBold': NotoNaskhArabic_600SemiBold,
    'ArabicText-Bold': NotoNaskhArabic_700Bold,
  });
}
