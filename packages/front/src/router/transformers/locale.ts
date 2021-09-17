import { ParameterTransformer } from '@/front/src/router/transformers/_types'
import { getI18nInstance } from '@/shared/src/composables/use-plugins'

export const localeTransformer: ParameterTransformer<string | undefined> = {
  encode(input) {
    if (!input) {
      input = getI18nInstance().locale.value
    }

    return input
  },
  decode(input) {
    return input
  },
}
