export type ParameterTransformer<D = string> = {
  encode: (input: D) => string
  decode: (input: string) => D
}

export type DecodedParameters<T extends ParameterTransformerMap> = {
  [K in keyof T]: ReturnType<T[K]['decode']>
}

export type EncodedParameters<T extends ParameterTransformerMap> = {
  [K in keyof T]: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ParameterTransformerMap = Record<string, ParameterTransformer<any>>
