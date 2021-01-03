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
