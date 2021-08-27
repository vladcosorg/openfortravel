import firebase, { firestore } from 'firebase-admin'
import mapValues from 'lodash/mapValues'

import {
  createPlainDestination,
  MappedDestinationDocumentCollection,
  MappedPlainDestinationCollection,
} from '@/shared/src/api/destinations/plain-destination'

import DocumentReference = firestore.DocumentReference
import DocumentSnapshot = firestore.DocumentSnapshot

import { log } from 'firebase-functions/lib/logger'

let destinationsMappedPlainDestinationCollection
export async function fetchDestinations(): Promise<MappedPlainDestinationCollection> {
  if (destinationsMappedPlainDestinationCollection) {
    log('Getting collection data from cache')
    return destinationsMappedPlainDestinationCollection
  }

  log('Collection data is empty. Fetching...')
  const snapshot = await getCollectionDocument().get()
  destinationsMappedPlainDestinationCollection = getSnapshoData(snapshot)
  return destinationsMappedPlainDestinationCollection
}

export function listenToDestinationUpdates(): void {
  getCollectionDocument().onSnapshot((snapshot) => {
    destinationsMappedPlainDestinationCollection = getSnapshoData(snapshot)
    log('Refreshed data from snapshot')
  })
}

function getCollectionDocument(): DocumentReference {
  const firestore = firebase.firestore()
  const collection = firestore.collection('countries')
  return collection.doc('_all')
}

function getSnapshoData(snapshot: DocumentSnapshot) {
  const data = snapshot.data() as {
    collection: MappedDestinationDocumentCollection
  }
  return mapValues(data.collection, (value, countryISO) =>
    createPlainDestination(countryISO, value),
  )
}

listenToDestinationUpdates()
