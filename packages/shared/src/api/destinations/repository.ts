import {
  createDummyPlainDestination,
  wrapWithRichDestinationObject,
} from '@/shared/src/api/destinations/helper'
import {
  Destination,
  PlainDestination,
} from '@/shared/src/api/destinations/models'
import { importFirebase } from '@/shared/src/misc/misc'

export async function findOrigin(code: string): Promise<PlainDestination> {
  const { countryCollection } = await importFirebase()
  const doc = await countryCollection.doc(code).get()
  const data = doc.data()
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

export async function findOrigins(): Promise<PlainDestination[]> {
  const { countryCollection } = await importFirebase()
  // const results = await countryCollection.limit(1).get()
  const results = await countryCollection.get()

  return results.docs.map((snapshot) => snapshot.data())
}

async function updateOriginDocument(
  reference: string,
  object: Partial<PlainDestination>,
): Promise<void> {
  const { countryCollection } = await importFirebase()
  await countryCollection.doc(reference).set(object, { merge: true })
}

export async function updateOriginField<
  K extends keyof PlainDestination,
  V extends PlainDestination[K]
>(reference: string, field: K, value: V): Promise<void> {
  await updateOriginDocument(reference, { [field]: value })
}
