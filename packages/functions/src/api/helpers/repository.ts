import firebase, { firestore } from 'firebase-admin'
import { log } from 'firebase-functions/lib/logger'
import mapValues from 'lodash/mapValues'

import {
  createPlainDestination,
  MappedDestinationDocumentCollection,
  MappedPlainDestinationCollection,
} from '@/shared/src/api/destinations/plain-destination'

import DocumentReference = firestore.DocumentReference
import DocumentSnapshot = firestore.DocumentSnapshot

let destinationCache
let snapshotListener
export async function fetchDestinations(): Promise<MappedPlainDestinationCollection> {
  if (destinationCache) {
    log('Getting collection data from cache')
    return destinationCache
  }

  log('Collection data is empty. Fetching...')
  const snapshot = await getCollectionDocument().get()
  destinationCache = getSnapshoData(snapshot)
  log('Saved data to cache')
  if (snapshotListener === undefined) {
    snapshotListener = listenToDestinationUpdates()
  }

  return destinationCache
}

export function listenToDestinationUpdates(): () => void {
  return getCollectionDocument().onSnapshot((snapshot) => {
    destinationCache = getSnapshoData(snapshot)
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
