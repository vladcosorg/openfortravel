import { ParameterTransformer } from '@/front/src/router/transformers/_types'

export const passthroughTransformer: ParameterTransformer<string> = {
  encode(input) {
    return input
  },
  decode(input) {
    return input
  },
}
