import {
  getFirestore,
  initializeFirestore,
  doc,
  onSnapshot,
  collection,
} from 'firebase/firestore'

import { MappedPlainDestinationCollection } from '@/shared/src/api/destinations/plain-destination'
import { firebaseApp } from '@/shared/src/misc/firebase'

export function listenToMappedOrigins(
  callback: (collection: MappedPlainDestinationCollection) => void,
): Promise<void> {
  let firestore

  try {
    firestore = initializeFirestore(firebaseApp, {
      ignoreUndefinedProperties: true,
    })
  } catch {
    firestore = getFirestore(firebaseApp)
  }
  const countryCollection = collection(firestore, 'countries')

  return new Promise((resolve) => {
    onSnapshot(doc(countryCollection, '_all'), (doc) => {
      callback(doc.data().collection)
      resolve()
    })
  })
}
