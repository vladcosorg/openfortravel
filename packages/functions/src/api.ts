import cors from 'cors'
import express from 'express'
import firebase from 'firebase-admin'
import * as functions from 'firebase-functions'

import { createCollection } from '@/front/src/composables/trip-cards'
import { getFullDestinationList } from '@/shared/src/api/destinations/helper'
import { extractCountryCodes } from '@/shared/src/modules/country-list/country-list-node-preload'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

const app = express()
app.use(cors({ origin: true }))
app.get('/', async (_req, res) => {
  const firestore = firebase.firestore()
  const collection = firestore.collection('countries')
  const raw = await collection.doc('_all').get()
  const destinations = getFullDestinationList(
    raw.data().collection as any,
    extractCountryCodes(),
  )

  const results = Object.values(destinations).map((destinationCountry) => {
    createCollection(destinationCountry, {
      origin: 'md',
      citizenship: ['md'],
      [RestrictionNodeType.DID_NOT_VISIT_COUNTRIES]: [],
    }).getBestGroup()
  })

  console.log(results)
  // console.log(raw, DestinationDefaults)
  res.status(200).send('1')
})
export const api = functions.https.onRequest(app)
