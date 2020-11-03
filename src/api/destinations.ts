import type * as firebase from 'firebase'
import { TranslateResult } from 'vue-i18n'

import { i18n } from 'src/boot/i18n'
import { getCountryCodes, getLabelForCountryCode } from 'src/misc/country-list'

export enum DestinationStatus {
  FORBIDDEN = 'forbidden',
  ALLOWED = 'allowed',
  CONDITIONAL = 'conditional',
}

interface DestinationDocument {
  notes?: string
  status?: DestinationStatus
  testRequired?: boolean
  insuranceRequired?: boolean
  selfIsolation?: number
}

export interface PlainDestination extends Required<DestinationDocument> {
  countryCode: string
  isDummy: boolean
}

export const destinationDefaults: Omit<PlainDestination, 'countryCode'> = {
  notes: '',
  status: DestinationStatus.ALLOWED,
  testRequired: false,
  insuranceRequired: false,
  selfIsolation: 0,
  isDummy: true,
}

type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>
export type IncompletePlainDestination = AtLeast<
  PlainDestination,
  'countryCode'
>

export class Destination implements PlainDestination {
  public readonly countryCode!: string
  public readonly notes = ''
  public readonly status = DestinationStatus.ALLOWED
  public readonly testRequired = false
  public readonly isDummy = true
  public readonly insuranceRequired = false
  public readonly selfIsolation = 0
  constructor(protected document: IncompletePlainDestination) {
    Object.assign(this, document)
  }

  get countryLabel(): string {
    return getLabelForCountryCode(this.countryCode)
  }
}

export type PlainDestinationCollection = PlainDestination[]

const destinationCountryConverter: firebase.firestore.FirestoreDataConverter<PlainDestination> = {
  toFirestore({
    notes,
    status,
    testRequired,
  }: PlainDestination): DestinationDocument {
    return { notes, status, testRequired }
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot<DestinationDocument>,
    options: firebase.firestore.SnapshotOptions,
  ): PlainDestination {
    return Object.assign(
      {},
      destinationDefaults,
      { countryCode: snapshot.id, isDummy: false },
      snapshot.data(options),
    )
  },
}

export async function getOriginDestinations(
  code: string,
): Promise<PlainDestination[]> {
  const { countryCollection, firebase } = await import('src/misc/firebase')
  const results = await countryCollection
    .doc(code)
    .collection('destinations')
    .where(firebase.firestore.FieldPath.documentId(), '!=', code)
    .withConverter<PlainDestination>(destinationCountryConverter)
    .get()

  return results.docs.map((snapshot) => snapshot.data())
}

export async function getDestination(
  originCode: string,
  destinationCode: string,
): Promise<PlainDestination> {
  const { countryCollection } = await import('src/misc/firebase')
  const doc = await countryCollection
    .doc(originCode)
    .collection('destinations')
    .doc(destinationCode)
    .withConverter<PlainDestination>(destinationCountryConverter)
    .get()

  const data = doc.data()

  if (!data) {
    return Object.assign({}, destinationDefaults, {
      countryCode: destinationCode,
    })
  }

  return data
}

export async function saveCountryDestination(
  object: Partial<PlainDestination>,
  hostCountryISO: string,
  destinationCountryISO: string,
): Promise<void> {
  const { countryCollection } = await import('src/misc/firebase')
  await countryCollection
    .doc(hostCountryISO)
    .collection('destinations')
    .doc(destinationCountryISO)
    .set(object, { merge: true })
}

export async function updateAllCountryDestinations(
  object: Partial<PlainDestination>,
  hostCountryISO: string,
): Promise<void> {
  const { countryCollection, firestore } = await import('src/misc/firebase')
  const batch = firestore.batch()
  const collection = countryCollection
    .doc(hostCountryISO)
    .collection('destinations')
  for (const countryCode of getCountryCodes()) {
    batch.set(collection.doc(countryCode), object, { merge: true })
  }

  await batch.commit()
}

function getStatusList(): DestinationStatus[] {
  return Object.values(DestinationStatus)
}

export function getStatusListPairs(): {
  label: TranslateResult
  value: DestinationStatus
}[] {
  return getStatusList().map((value) => ({
    label: i18n.t(`status.${value}`),
    value,
  }))
}
