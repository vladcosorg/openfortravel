// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function importFirebase() {
  return await import(
    /* webpackChunkName: "firebase" */ '@/shared/src/misc/firebase'
  )
}
