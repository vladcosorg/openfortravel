import firebase, { firestore } from 'firebase-admin'
import mapValues from 'lodash/mapValues'

import {
  createPlainDestination,
  MappedDestinationDocumentCollection,
  MappedPlainDestinationCollection,
} from '@/shared/src/api/destinations/plain-destination'

import DocumentReference = firestore.DocumentReference
import DocumentSnapshot = firestore.DocumentSnapshot

let destinationsMappedPlainDestinationCollection
export async function fetchDestinations(): Promise<MappedPlainDestinationCollection> {
  if (destinationsMappedPlainDestinationCollection) {
    return destinationsMappedPlainDestinationCollection
  }

  const snapshot = await getCollectionDocument().get()
  destinationsMappedPlainDestinationCollection = getSnapshoData(snapshot)
  return destinationsMappedPlainDestinationCollection
}

export function listenToDestinationUpdates() {
  getCollectionDocument().onSnapshot((snapshot) => {
    destinationsMappedPlainDestinationCollection = getSnapshoData(snapshot)
  })
}

function getCollectionDocument(): DocumentReference {
  const firestore = firebase.firestore()
  const collection = firestore.collection('countries')
  return collection.doc('_all')
}

function getSnapshoData(snapshot: DocumentSnapshot) {
  return mapValues(
    snapshot.data() as {
      collection: MappedDestinationDocumentCollection
    },
    (value, countryISO) => createPlainDestination(countryISO, value),
  )
}

listenToDestinationUpdates()
