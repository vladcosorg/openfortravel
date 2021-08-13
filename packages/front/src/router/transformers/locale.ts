import { useI18n } from '@/shared/src/composables/use-plugins'

import { ParameterTransformer } from '@/front/src/router/transformers/_types'

export const localeTransformer: ParameterTransformer<string | undefined> = {
  encode(input) {
    if (!input) {
      input = useI18n().locale
    }

    return input
  },
  decode(input) {
    return input
  },
}
