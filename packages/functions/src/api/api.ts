import cors from 'cors'
import express from 'express'
import * as functions from 'firebase-functions'
import queryTypes from 'query-types'

import {
  fetchDestinations,
  listenToDestinationUpdates,
} from '@/functions/src/api/helpers/repository'
import { addCacheMiddleware } from '@/functions/src/api/middlewares/cache'
import { createOverviewCollection } from '@/shared/src/api/function-api/overview/helpers'
import {
  createRawCountryFactsheetMap,
  createRawFactsheet,
} from '@/shared/src/models/country-factsheet/raw-factory'

const app = express()
app.use(express.json())
app.use(queryTypes.middleware())
if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: true }))
} else {
  addCacheMiddleware(app)
  app.use(
    cors({
      origin: [
        'https://openfortravel.org',
        'https://us-central1-openfortravel.cloudfunctions.net',
      ],
    }),
  )
}

listenToDestinationUpdates()

app.get('/restrictions/:origin/overview', async (req, res) => {
  const destinations = await fetchDestinations()

  const collection = createOverviewCollection(
    {
      origin: req.params.origin,
      ...req.query,
    },
    destinations,
  )

  res.status(200).send(collection)
})

app.get('/restrictions/:origin/details', async (req, res) => {
  const destinations = await fetchDestinations()

  const origin = destinations[req.params.origin]
  res.status(200).send(origin ? origin.restrictionTree : [])
})

app.get('/country-factsheets', async (req, res) => {
  const destinations = await fetchDestinations()

  res.status(200).send(createRawCountryFactsheetMap(destinations))
})

app.get('/country-factsheets/:iso', async (req, res) => {
  const destinations = await fetchDestinations()
  const origin = destinations[req.params.iso]
  res.status(200).send(createRawFactsheet(origin.countryCode, origin))
})

export const api = functions.https.onRequest(app)
