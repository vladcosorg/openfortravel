import {
  createDestinationDocument,
  createPlainDestination,
  DestinationDocument,
  PlainDestination,
} from '@/shared/src/api/destinations/plain-destination'

import type {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from '@firebase/firestore'

export const dataConverter: FirestoreDataConverter<PlainDestination> = {
  toFirestore(destination: PlainDestination): DestinationDocument {
    return createDestinationDocument(destination)
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot<DestinationDocument>,
    options: SnapshotOptions,
  ): PlainDestination {
    return createPlainDestination(snapshot.id, snapshot.data(options))
  },
}
