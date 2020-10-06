import { countryCollection } from 'boot/firebase'
import { i18n } from 'boot/i18n'
import * as firebase from 'firebase/app'
import {
  getFlagForCountryCode,
  getLabelForCountryCode,
} from 'src/misc/I18nCountryList'
import { TranslateResult } from 'vue-i18n'
import FirestoreDataConverter = firebase.firestore.FirestoreDataConverter

export enum DestinationStatus {
  FORBIDDEN = 'forbidden',
  ALLOWED = 'allowed',
  CONDITIONAL = 'conditional',
}

export interface DestinationDocument {
  notes?: string
  status?: DestinationStatus
  testRequired?: boolean
}

export interface PlainDestination extends Required<DestinationDocument> {
  countryCode: string
  isDummy: boolean
}

export const destinationDefaults: Omit<PlainDestination, 'countryCode'> = {
  notes: '',
  status: DestinationStatus.ALLOWED,
  testRequired: false,
  isDummy: true,
}

export function isValidDestination(
  destination: Partial<PlainDestination>,
): destination is PlainDestination {
  return destination.countryCode !== undefined
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
  constructor(protected document: IncompletePlainDestination) {
    Object.assign(this, document)
  }

  get countryLabel(): string {
    return getLabelForCountryCode(this.countryCode)
  }

  get countryFlag(): string {
    return getFlagForCountryCode(this.countryCode)
  }
}

export type PlainDestinationCollection = PlainDestination[]

const destinationCountryConverter: FirestoreDataConverter<PlainDestination> = {
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
  await countryCollection
    .doc(hostCountryISO)
    .collection('destinations')
    .doc(destinationCountryISO)
    .set(object, { merge: true })
}

export function getStatusList(): DestinationStatus[] {
  return Object.values(DestinationStatus)
}

export function getStatusListPairs(): {
  label: TranslateResult
  value: DestinationStatus
}[] {
  return getStatusList().map((value) => ({
    label: i18n.t(value),
    value,
  }))
}
