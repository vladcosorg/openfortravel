import { generateID } from '@/front/src/api/restrictions/common'
import {
  PlainRestriction,
  restrictionDefaults,
} from '@/front/src/api/restrictions/models'

export async function findRestrictionsByOrigin(
  originCode: string,
): Promise<PlainRestriction[]> {
  const { restrictionCollection } = await import('@/front/src/misc/firebase')
  const results = await restrictionCollection
    .where('origin', '==', originCode)
    .get()

  return results.docs.map((snapshot) => snapshot.data())
}

export async function findRestrictionsByDestination(
  destinationCode: string,
): Promise<PlainRestriction[]> {
  const { restrictionCollection } = await import('@/front/src/misc/firebase')
  const results = await restrictionCollection
    .where('destination', '==', destinationCode)
    .get()

  return results.docs.map((snapshot) => snapshot.data())
}

export async function findRestrictionByOriginAndDestination(
  originCode: string,
  destinationCode: string,
): Promise<PlainRestriction> {
  const { restrictionCollection } = await import('@/front/src/misc/firebase')
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
