import * as firebase from 'firebase'

import { Destination, DestinationDocument, PlainDestination } from 'src/api/destinations/models'

export const dataConverter: firebase.firestore.FirestoreDataConverter<PlainDestination> = {
  toFirestore(destination: PlainDestination): DestinationDocument {
    if (destination instanceof Destination) {
      destination = destination.toPlainObject()
    }

    return destination
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot<DestinationDocument>,
    options: firebase.firestore.SnapshotOptions,
  ): PlainDestination {
    return Object.assign({}, { countryCode: snapshot.id }, snapshot.data(options))
  },
}
