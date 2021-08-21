import firebase from 'firebase-admin'
import mapValues from 'lodash/mapValues'

import {
  createPlainDestination,
  MappedDestinationDocumentCollection,
  MappedPlainDestinationCollection,
} from '@/shared/src/api/destinations/plain-destination'

export async function fetchDestinations(): Promise<MappedPlainDestinationCollection> {
  const firestore = firebase.firestore()
  const collection = firestore.collection('countries')

  const snapshot = await collection.doc('_all').get()
  const data = snapshot.data() as {
    collection: MappedDestinationDocumentCollection
  }

  return mapValues(data.collection, (value, countryISO) =>
    createPlainDestination(countryISO, value),
  )
}
