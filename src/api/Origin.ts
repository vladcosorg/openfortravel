import * as firebase from 'firebase/app'
import FirestoreDataConverter = firebase.firestore.FirestoreDataConverter

export interface OriginDocument {
  reference: string
}

export interface PlainOrigin extends OriginDocument {
  countryCode: string
  infoLink?: string
  bestByDate?: string
}

export class DummyPlainOrigin implements PlainOrigin {
  public readonly reference = ''
  constructor(public countryCode: string) {}
}

const dataConverter: FirestoreDataConverter<PlainOrigin> = {
  toFirestore({ reference }: PlainOrigin): OriginDocument {
    return { reference }
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot<OriginDocument>,
    options: firebase.firestore.SnapshotOptions,
  ): PlainOrigin {
    return Object.assign(
      {},
      { countryCode: snapshot.id },
      snapshot.data(options),
    )
  },
}

export async function getOrigin(code: string): Promise<PlainOrigin> {
  const { countryCollection } = await import('src/misc/firebase')
  const doc = await countryCollection
    .doc(code)
    .withConverter<PlainOrigin>(dataConverter)
    .get()

  const data = doc.data()
  if (!data) {
    return new DummyPlainOrigin(code)
  }

  return data
}

export async function getOrigins(): Promise<PlainOrigin[]> {
  const { countryCollection } = await import('src/misc/firebase')
  const results = await countryCollection
    .withConverter<PlainOrigin>(dataConverter)
    .get()

  return results.docs.map((snapshot) => snapshot.data())
}

export async function updateOriginDoc(
  reference: string,
  object: Partial<PlainOrigin>,
): Promise<void> {
  const { countryCollection } = await import('src/misc/firebase')
  await countryCollection.doc(reference).set(object, { merge: true })
}

export async function updateOriginField<
  K extends keyof PlainOrigin,
  V extends PlainOrigin[K]
>(reference: string, field: K, value: V): Promise<void> {
  await updateOriginDoc(reference, { [field]: value })
}
