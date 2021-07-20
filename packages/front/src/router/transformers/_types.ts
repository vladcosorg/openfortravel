import { OptionalExceptFor } from '@/shared/src/misc/type-helpers'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export type ParameterTransformer<D = string> = {
  encode: (input?: D) => string | undefined
  decode: (input?: string) => D
  contextField?: RestrictionNodeType
  isRequired?: boolean
}

export type DecodedParameters<T extends ParameterTransformerMap> =
  OptionalExceptFor<
    {
      [K in keyof T]: ReturnType<T[K]['decode']>
    },
    'destinationSlug'
  >

export type EncodedParameters<T extends ParameterTransformerMap> = {
  [K in keyof T]: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ParameterTransformerMap = Record<string, ParameterTransformer<any>>
