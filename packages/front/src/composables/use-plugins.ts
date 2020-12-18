import { IVueI18n } from 'vue-i18n'

import { i18n } from '@/front/src/boot/i18n'

export function useI18n(): IVueI18n {
  return i18n
}
