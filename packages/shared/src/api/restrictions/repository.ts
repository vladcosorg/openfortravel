import { generateID } from '@/shared/src/api/restrictions/common'
import {
  PlainRestriction,
  restrictionDefaults,
} from '@/shared/src/api/restrictions/models'
import { importFirebase } from '@/shared/src/misc/misc'

export async function findRestrictionsByOrigin(
  originCode: string,
): Promise<PlainRestriction[]> {
  const { restrictionCollection } = await importFirebase()

  const results = await restrictionCollection
    .where('origin', '==', originCode)
    .limit(50)
    .get()

  return results.docs.map((snapshot) => snapshot.data())
}

export async function findRestrictionsByDestination(
  destinationCode: string,
): Promise<PlainRestriction[]> {
  const { restrictionCollection } = await importFirebase()
  const results = await restrictionCollection
    .where('destination', '==', destinationCode)
    .get()

  return results.docs.map((snapshot) => snapshot.data())
}

// export async function findRestrictionsByDestination(
//   destinationCode: string,
// ): Promise<PlainRestriction[]> {
//   const key = `restrictions/destination/${destinationCode}`
//   let data: PlainRestriction[] | null = LocalStorage.getItem(key)
//
//   if (!data) {
//     const { restrictionCollection } = await importFirebase()
//     const results = await restrictionCollection
//       .where('destination', '==', destinationCode)
//       .get()
//     data = results.docs.map((snapshot) => snapshot.data())
//     if (data.length > 0) {
//       LocalStorage.set(`restrictions/destination/${destinationCode}`, data)
//     }
//   }
//
//   return data
// }

export async function findRestrictionByOriginAndDestination(
  originCode: string,
  destinationCode: string,
): Promise<PlainRestriction> {
  const { restrictionCollection } = await importFirebase()
  const doc = await restrictionCollection
    .doc(generateID(originCode, destinationCode))
    .get()

  const data = doc.data()

  if (!data) {
    return Object.assign({}, restrictionDefaults, {
      origin: originCode,
      destination: destinationCode,
    })
  }

  return data
}
