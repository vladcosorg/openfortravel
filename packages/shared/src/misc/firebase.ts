import firebase from 'firebase/app'
import 'firebase/firestore'

import { dataConverter as destinationDataConverter } from '@/shared/src/api/destinations/common'
import { dataConverter as restrictionDataConverter } from '@/shared/src/api/restrictions/common'

const firebaseApp =
  firebase.apps.length > 0
    ? firebase.app()
    : firebase.initializeApp({
        apiKey: 'AIzaSyBOAqJZv0jnuNfM0w118AmD76MDqCSJj1Q',
        authDomain: 'openfortravel.firebaseapp.com',
        databaseURL: 'https://openfortravel.firebaseio.com',
        projectId: 'openfortravel',
        storageBucket: 'openfortravel.appspot.com',
        messagingSenderId: '678272975127',
        appId: '1:678272975127:web:eef8ccaa39e923964c3752',
        measurementId: 'G-NHT0P83PH5',
      })

const firestore = firebaseApp.firestore()

const countryCollection = firestore
  .collection('countries')
  .withConverter(destinationDataConverter)
const restrictionCollection = firestore
  .collection('restrictions')
  .withConverter(restrictionDataConverter)

// eslint-disable-next-line import/no-unused-modules
export {
  firestore,
  firebaseApp,
  countryCollection,
  firebase,
  restrictionCollection,
}
