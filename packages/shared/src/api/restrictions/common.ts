import {
  collection,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  CollectionReference,
} from 'firebase/firestore/lite'
import mapValues from 'lodash/mapValues'
import pick from 'lodash/pick'

import { Restriction } from '@/front/src/models/restriction'
import type {
  PlainRestriction,
  MappedPlainRestrictionCollection,
  MappedRestrictionDocumentCollection,
  RestrictionDocument,
} from '@/shared/src/api/restrictions/models'
import { restrictionDefaults } from '@/shared/src/api/restrictions/models'
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
  ): PlainRestriction {
    return Object.assign(
      {},
      restrictionDefaults,
      pick(snapshot.data(), Object.keys(restrictionDefaults)),
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
    ): MappedPlainRestrictionCollection {
      const expectedKeys = Object.keys(restrictionDefaults)
      return mapValues(snapshot.data(), (item) =>
        Object.assign({}, restrictionDefaults, pick(item, expectedKeys)),
      )
    },
  })
}
