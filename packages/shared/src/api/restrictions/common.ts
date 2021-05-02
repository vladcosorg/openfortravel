import type firebase from 'firebase/app'
import { pick } from 'lodash'
import mapValues from 'lodash/mapValues'

import type {
  PlainRestriction,
  MappedPlainRestrictionCollection,
  MappedRestrictionDocumentCollection,
  RestrictionDocument} from '@/shared/src/api/restrictions/models';
import {
  Restriction,
  restrictionDefaults
} from '@/shared/src/api/restrictions/models'
import { importFirebase } from '@/shared/src/misc/misc'

export type RestrictionDirection = 'origin' | 'destination'
export function generateIDFromEntity(restriction: PlainRestriction): string {
  return generateID(restriction.origin, restriction.destination)
}

export function generateID(originCode: string, destinationCode: string): string {
  return `${originCode}${destinationCode}`
}

export const dataConverter: firebase.firestore.FirestoreDataConverter<PlainRestriction> = {
  toFirestore(restriction: PlainRestriction): RestrictionDocument {
    if (restriction instanceof Restriction) {
      restriction = restriction.toPlainRestriction()
    }
    return restriction
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot<RestrictionDocument>,
    options: firebase.firestore.SnapshotOptions,
  ): PlainRestriction {
    return Object.assign(
      {},
      restrictionDefaults,
      pick(snapshot.data(options), Object.keys(restrictionDefaults)),
    )
  },
}

export async function getViewCollection(
  type: RestrictionDirection,
): Promise<firebase.firestore.CollectionReference<MappedPlainRestrictionCollection>> {
  const { firestore } = await importFirebase()
  return firestore
    .collection(type === 'origin' ? 'viewByOrigin' : 'viewByDestination')
    .withConverter<MappedPlainRestrictionCollection>({
      toFirestore() {
        throw new Error('Persistance is not supported')
      },
      fromFirestore(
        snapshot: firebase.firestore.QueryDocumentSnapshot<MappedRestrictionDocumentCollection>,
        options: firebase.firestore.SnapshotOptions,
      ): MappedPlainRestrictionCollection {
        const expectedKeys = Object.keys(restrictionDefaults)
        return mapValues(snapshot.data(options), (item) =>
          Object.assign({}, restrictionDefaults, pick(item, expectedKeys)),
        )
      },
    })
}
