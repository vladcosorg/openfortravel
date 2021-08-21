import {
  collection,
  initializeFirestore,
  getFirestore,
  Firestore,
} from '@firebase/firestore/lite'
import { initializeApp, getApps, getApp } from 'firebase/app'

import { dataConverter as destinationDataConverter } from '@/shared/src/api/destinations/data-converter'
import { dataConverter as restrictionDataConverter } from '@/shared/src/api/restrictions/common'
import { dataConverter as searchIdDataConverter } from '@/shared/src/api/searchIds/common'

const firebaseApp =
  getApps().length > 0
    ? getApp()
    : initializeApp({
        apiKey: 'AIzaSyBOAqJZv0jnuNfM0w118AmD76MDqCSJj1Q',
        authDomain: 'openfortravel.firebaseapp.com',
        databaseURL: 'https://openfortravel.firebaseio.com',
        projectId: 'openfortravel',
        storageBucket: 'openfortravel.appspot.com',
        messagingSenderId: '678272975127',
        appId: '1:678272975127:web:eef8ccaa39e923964c3752',
        measurementId: 'G-NHT0P83PH5',
      })

let firestore: Firestore

try {
  firestore = initializeFirestore(firebaseApp, {
    ignoreUndefinedProperties: true,
  })
} catch {
  firestore = getFirestore(firebaseApp)
}

const countryCollection = collection(firestore, 'countries').withConverter(
  destinationDataConverter,
)

const searchIdCollection = collection(firestore, 'searchIds').withConverter(
  searchIdDataConverter,
)

const restrictionCollection = collection(
  firestore,
  'restrictions',
).withConverter(restrictionDataConverter)

// eslint-disable-next-line import/no-unused-modules
export {
  firestore,
  firebaseApp,
  countryCollection,
  restrictionCollection,
  searchIdCollection,
}
