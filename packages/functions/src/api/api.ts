import cors from 'cors'
import express from 'express'
import * as functions from 'firebase-functions'
import _ from 'lodash'

import { fetchDestinations } from '@/functions/src/api/helpers/repository'
import { addCacheMiddleware } from '@/functions/src/api/middlewares/cache'
import {
  getLiteDestinationDocumentFIelds,
  MappedPlainDestinationCollection,
} from '@/shared/src/api/destinations/plain-destination'
import { createOverviewCollection } from '@/shared/src/api/function-api/overview/helpers'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

const app = express()
app.use(cors({ origin: true }))
if (process.env.NODE_ENV === 'production') {
  addCacheMiddleware(app)
}

let destinations: MappedPlainDestinationCollection

app.get('/restrictions/:origin/overview', async (req, res) => {
  if (!destinations) {
    destinations = await fetchDestinations()
  }

  const collection = createOverviewCollection(
    {
      origin: req.params.origin,
      citizenship: ['md'],
      [RestrictionNodeType.DID_NOT_VISIT_COUNTRIES]: [],
    },
    destinations,
  )

  res.status(200).send(collection)
})

app.get('/restrictions/:origin/details', async (req, res) => {
  if (!destinations) {
    destinations = await fetchDestinations()
  }

  const origin = destinations[req.params.origin]
  res.status(200).send(origin ? origin.restrictionTree : [])
})

app.get('/country/:iso', async (req, res) => {
  if (!destinations) {
    destinations = await fetchDestinations()
  }

  const origin = destinations[req.params.iso]
  res
    .status(200)
    .send(origin ? _.pick(origin, getLiteDestinationDocumentFIelds()) : [])
})

export const api = functions.https.onRequest(app)
