import type {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  CollectionReference,
} from 'firebase/firestore'
import { collection } from 'firebase/firestore'
import { pick } from 'lodash'
import mapValues from 'lodash/mapValues'

import type {
  PlainRestriction,
  MappedPlainRestrictionCollection,
  MappedRestrictionDocumentCollection,
  RestrictionDocument,
} from '@/shared/src/api/restrictions/models'
import {
  Restriction,
  restrictionDefaults,
} from '@/shared/src/api/restrictions/models'
import { firestore } from '@/shared/src/misc/firebase'

export type RestrictionDirection = 'origin' | 'destination'
export function generateIDFromEntity(restriction: PlainRestriction): string {
  return generateID(restriction.origin, restriction.destination)
}

export function generateID(
  originCode: string,
  destinationCode: string,
): string {
  return `${originCode}${destinationCode}`
}

export const dataConverter: FirestoreDataConverter<PlainRestriction> = {
  toFirestore(restriction: PlainRestriction): RestrictionDocument {
    if (restriction instanceof Restriction) {
      restriction = restriction.toPlainRestriction()
    }
    return restriction
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot<RestrictionDocument>,
    options: SnapshotOptions,
  ): PlainRestriction {
    return Object.assign(
      {},
      restrictionDefaults,
      pick(snapshot.data(options), Object.keys(restrictionDefaults)),
    )
  },
}

export function getViewCollection(
  type: RestrictionDirection,
): CollectionReference<MappedPlainRestrictionCollection> {
  return collection(
    firestore,
    type === 'origin' ? 'viewByOrigin' : 'viewByDestination',
  ).withConverter<MappedPlainRestrictionCollection>({
    toFirestore() {
      throw new Error('Persistance is not supported')
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot<MappedRestrictionDocumentCollection>,
      options: SnapshotOptions,
    ): MappedPlainRestrictionCollection {
      const expectedKeys = Object.keys(restrictionDefaults)
      return mapValues(snapshot.data(options), (item) =>
        Object.assign({}, restrictionDefaults, pick(item, expectedKeys)),
      )
    },
  })
}
