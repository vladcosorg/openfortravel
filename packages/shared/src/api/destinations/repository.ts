import { getDoc, doc, collection, setDoc } from 'firebase/firestore'

import {
  createDummyPlainDestination,
  wrapWithRichDestinationObject,
} from '@/shared/src/api/destinations/helper'
import type {
  Destination,
  MappedPlainDestinationCollection,
  PlainDestination,
} from '@/shared/src/api/destinations/models'
import { countryCollection, firestore } from '@/shared/src/misc/firebase'

export async function findOrigin(code: string): Promise<PlainDestination> {
  const snapshot = await getDoc(doc(countryCollection, code))

  const data = snapshot.data()
  if (!data) {
    return createDummyPlainDestination({ countryCode: code })
  }

  return data
}

export async function findOriginAsRichObject(
  code: string,
): Promise<Destination> {
  return wrapWithRichDestinationObject(await findOrigin(code))
}

export async function findMappedOrigins(): Promise<MappedPlainDestinationCollection> {
  const result = (
    await getDoc(doc(collection(firestore, 'countries'), '_all'))
  ).data()

  if (result === undefined) {
    throw new Error('Aggegated country result is missing')
  }

  return result.collection as MappedPlainDestinationCollection
}

export async function findOrigins(): Promise<PlainDestination[]> {
  return Object.values(await findMappedOrigins())
}

export async function updateOriginDocument(
  reference: string,
  object: Partial<PlainDestination>,
): Promise<void> {
  await setDoc(doc(countryCollection, reference), object, { merge: true })
}

export async function updateOriginField<
  K extends keyof PlainDestination,
  V extends PlainDestination[K],
>(reference: string, field: K, value: V): Promise<void> {
  await updateOriginDocument(reference, { [field]: value })
}
