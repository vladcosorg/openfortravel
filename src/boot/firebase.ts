import * as firebase from 'firebase/app'
import 'firebase/firestore'
import { boot } from 'quasar/wrappers'

let firebaseApp
if (!firebase.apps.length) {
  firebaseApp = firebase.initializeApp({
    apiKey: 'AIzaSyBOAqJZv0jnuNfM0w118AmD76MDqCSJj1Q',
    authDomain: 'openfortravel.firebaseapp.com',
    databaseURL: 'https://openfortravel.firebaseio.com',
    projectId: 'openfortravel',
    storageBucket: 'openfortravel.appspot.com',
    messagingSenderId: '678272975127',
    appId: '1:678272975127:web:eef8ccaa39e923964c3752',
    measurementId: 'G-NHT0P83PH5',
  })
} else {
  firebaseApp = firebase.app()
}

const firestore = firebaseApp.firestore()

const countryCollection = firestore.collection('countries')

export { firestore, firebaseApp, countryCollection }

export default boot(() => {
  //
})
