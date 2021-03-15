import type firebase from 'firebase/app'
import { omit } from 'lodash'

import {
  Destination,
  DestinationDocument,
  PlainDestination,
} from '@/shared/src/api/destinations/models'

export const dataConverter: firebase.firestore.FirestoreDataConverter<PlainDestination> = {
  toFirestore(destination: PlainDestination): DestinationDocument {
    if (destination instanceof Destination) {
      destination = destination.toPlainObject()
    }

    return toDocument(destination)
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot<DestinationDocument>,
    options: firebase.firestore.SnapshotOptions,
  ): PlainDestination {
    return Object.assign({}, { countryCode: snapshot.id }, snapshot.data(options))
  },
}

function toDocument(destination: PlainDestination): DestinationDocument {
  return omit(destination, 'countryCode')
}
