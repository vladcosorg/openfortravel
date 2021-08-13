import { SearchIdDocument } from '@/shared/src/api/searchIds/models'

import type {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from '@firebase/firestore'

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
