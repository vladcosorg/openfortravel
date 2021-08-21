import { firestore } from 'firebase-admin'
import FirestoreDataConverter = firestore.FirestoreDataConverter
import {
  createDestinationDocument,
  createPlainDestination,
  DestinationDocument,
  PlainDestination,
} from '@/shared/src/api/destinations/plain-destination'
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot

export const destinationDataConverter: FirestoreDataConverter<PlainDestination> =
  {
    toFirestore(destination: PlainDestination): DestinationDocument {
      return createDestinationDocument(destination)
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot<DestinationDocument>,
    ): PlainDestination {
      return createPlainDestination(snapshot.id, snapshot.data())
    },
  }
