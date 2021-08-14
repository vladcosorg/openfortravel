import omit from 'lodash/omit'

import type {
  DestinationDocument,
  PlainDestination,
} from '@/shared/src/api/destinations/models'
import { Destination } from '@/shared/src/api/destinations/models'

import type {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from '@firebase/firestore'

export const dataConverter: FirestoreDataConverter<PlainDestination> = {
  toFirestore(destination: PlainDestination): DestinationDocument {
    if (destination instanceof Destination) {
      destination = destination.toPlainObject()
    }

    return toDocument(destination)
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot<DestinationDocument>,
    options: SnapshotOptions,
  ): PlainDestination {
    return Object.assign(
      {},
      { countryCode: snapshot.id },
      snapshot.data(options),
    )
  },
}

function toDocument(destination: PlainDestination): DestinationDocument {
  return omit(destination, 'countryCode')
}
