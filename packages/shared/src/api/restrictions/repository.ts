import type {
  RestrictionDirection} from '@/shared/src/api/restrictions/common';
import {
  generateID,
  getViewCollection
} from '@/shared/src/api/restrictions/common'
import type {
  MappedPlainRestrictionCollection,
  PlainRestriction} from '@/shared/src/api/restrictions/models';
import {
  restrictionDefaults,
} from '@/shared/src/api/restrictions/models'
import {
  importFirebase,
  transformArrayCollectionToMappedCollection,
} from '@/shared/src/misc/misc'

async function findMappedRestrictionsByDirection(
  originCode: string,
  direction: RestrictionDirection,
): Promise<MappedPlainRestrictionCollection> {
  const collection = await getViewCollection(direction)
  const results = await collection.doc(originCode).get()
  const data = results.data()

  if (!data) {
    return {}
  }

  return data
}

export async function findMappedRestrictionsByOrigin(
  originCode: string,
): Promise<MappedPlainRestrictionCollection> {
  return transformArrayCollectionToMappedCollection(
    await findRestrictionsByOrigin(originCode),
    'destination',
  )
}

export async function findRestrictionsByOrigin(
  originCode: string,
): Promise<PlainRestriction[]> {
  const { restrictionCollection } = await importFirebase()
  const results = await restrictionCollection.where('origin', '==', originCode).get()
  return results.docs.map((snapshot) => snapshot.data())
}

export async function findRestrictionsByDestination(
  destinationCode: string,
): Promise<PlainRestriction[]> {
  const { restrictionCollection } = await importFirebase()
  const results = await restrictionCollection.where('destination', '==', destinationCode).get()

  return results.docs.map((snapshot) => snapshot.data())
}

export async function findRestrictionByOriginAndDestination(
  originCode: string,
  destinationCode: string,
): Promise<PlainRestriction> {
  const { restrictionCollection } = await importFirebase()
  const doc = await restrictionCollection.doc(generateID(originCode, destinationCode)).get()

  const data = doc.data()

  if (!data) {
    return Object.assign({}, restrictionDefaults, {
      origin: originCode,
      destination: destinationCode,
    })
  }

  return data
}
