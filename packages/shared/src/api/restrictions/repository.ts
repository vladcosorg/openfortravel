import {
  generateID,
  getViewCollection,
  RestrictionDirection,
} from '@/shared/src/api/restrictions/common'
import {
  MappedPlainRestrictionCollection,
  PlainRestriction,
  restrictionDefaults,
} from '@/shared/src/api/restrictions/models'
import { importFirebase } from '@/shared/src/misc/misc'

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

async function findRestrictionsByDirection(
  originCode: string,
  direction: RestrictionDirection,
): Promise<PlainRestriction[]> {
  return Object.values(
    await findMappedRestrictionsByDirection(originCode, direction),
  )
}

export async function findMappedRestrictionsByOrigin(
  originCode: string,
): Promise<MappedPlainRestrictionCollection> {
  return findMappedRestrictionsByDirection(originCode, 'origin')
}

export async function findRestrictionsByOrigin(
  originCode: string,
): Promise<PlainRestriction[]> {
  return findRestrictionsByDirection(originCode, 'origin')
}

export async function findRestrictionsByDestination(
  destinationCode: string,
): Promise<PlainRestriction[]> {
  return findRestrictionsByDirection(destinationCode, 'destination')
}

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
