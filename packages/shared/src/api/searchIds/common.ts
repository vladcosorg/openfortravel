import type {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from '@firebase/firestore'

import { SearchIdDocument } from '@/shared/src/api/searchIds/models'

export const dataConverter: FirestoreDataConverter<SearchIdDocument> = {
  toFirestore(destination: SearchIdDocument): SearchIdDocument {
    return destination
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot<SearchIdDocument>,
    options: SnapshotOptions,
  ): SearchIdDocument {
    return Object.assign({}, snapshot.data(options))
  },
}
