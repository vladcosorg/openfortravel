import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'

import { dataConverter as destinationDataConverter } from '@/shared/src/api/destinations/common'
import { dataConverter as restrictionDataConverter } from '@/shared/src/api/restrictions/common'

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

const firestore = getFirestore(firebaseApp)
const countryCollection = collection(firestore, 'countries').withConverter(
  destinationDataConverter,
)
const restrictionCollection = collection(
  firestore,
  'restrictions',
).withConverter(restrictionDataConverter)

// eslint-disable-next-line import/no-unused-modules
export { firestore, firebaseApp, countryCollection, restrictionCollection }
