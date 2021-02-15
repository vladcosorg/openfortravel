import type firebase from 'firebase/app'
import { pick } from 'lodash'

import {
  PlainRestriction,
  Restriction,
  restrictionDefaults,
  RestrictionDocument,
} from '@/shared/src/api/restrictions/models'

export function generateIDFromEntity(restriction: PlainRestriction): string {
  return generateID(restriction.origin, restriction.destination)
}

export function generateID(
  originCode: string,
  destinationCode: string,
): string {
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
