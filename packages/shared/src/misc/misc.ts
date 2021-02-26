// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types

export async function importFirebase() {
  return await import(
    /* webpackChunkName: "firebase" */ '@/shared/src/misc/firebase'
  )
}

export function transformKeys<T extends Record<string, unknown>>(
  inputObject: T,
  transformCallback: (key: string) => string,
): T {
  return Object.fromEntries(
    Object.entries(inputObject).map(([key, value]) => [
      transformCallback(key),
      value,
    ]),
  ) as T
}

export function transformArrayCollectionToMappedCollection<T>(
  arrayCollection: T[],
  indexKey: keyof T,
): Record<string, T> {
  return arrayCollection.reduce((acc, item) => {
    const indexValue = (item[indexKey] as unknown) as string
    acc[indexValue] = item
    return acc
  }, {} as Record<string, T>)
}

export function wrapCollection<T, R>(input: T[], mapper: (element: T) => R): R[]
export function wrapCollection<T, R>(
  input: Record<string, T>,
  mapper: (element: T) => R,
): Record<string, R>
export function wrapCollection<T, R>(
  input: T[] | Record<string, T>,
  mapper: (element: T) => R,
): Record<string, R> | R[] {
  if (Array.isArray(input)) {
    return input.map((element) => mapper(element))
  } else {
    const objectEntries = Object.entries(input).map(([key, element]) => [
      key,
      mapper(element),
    ])
    return Object.fromEntries(objectEntries)
  }
}

export function createGeneratorForRandomIntegerInRange(
  from: number,
  to: number,
  withPrefix = '',
): () => string | number {
  return () => {
    const result = Math.floor(Math.random() * (to - from + 1)) + from
    if (withPrefix) {
      return result + withPrefix
    }

    return result
  }
}
