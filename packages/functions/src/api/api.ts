import cors from 'cors'
import express from 'express'
import * as functions from 'firebase-functions'
import _ from 'lodash'

import { fetchDestinations } from '@/functions/src/api/helpers/repository'
import { addCacheMiddleware } from '@/functions/src/api/middlewares/cache'
import { OneWayOverview } from '@/shared/src/api/cfapi/overview'
import { MappedPlainDestinationCollection } from '@/shared/src/api/destinations/plain-destination'
import { convertIncompleteTreeFromStorageFormat } from '@/shared/src/restriction-tree/converter'
import {
  createRestrictionGroupCollection,
  RestrictionGroup,
} from '@/shared/src/restriction-tree/restriction-group'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

const app = express()
app.use(cors({ origin: true }))
if (process.env.NODE_ENV === 'production') {
  addCacheMiddleware(app)
}

let destinations: MappedPlainDestinationCollection

const createGroup = (group: RestrictionGroup): OneWayOverview => ({
  quarantine: group.quarantineRequired,
  pcrTest: group.pcrTestRequired,
  rating: group.rating,
  status: group.status,
})

app.get('/restrictions/:origin/overview', async (req, res) => {
  if (!destinations) {
    destinations = await fetchDestinations()
  }

  const origin = destinations[req.params.origin]
  const originRestrictionTree = convertIncompleteTreeFromStorageFormat(
    origin.restrictionTree,
  )

  const outgoingContext = {
    origin: origin.countryCode,
    citizenship: ['md'],
    [RestrictionNodeType.DID_NOT_VISIT_COUNTRIES]: [],
  }

  res.status(200).send(
    _.pickBy(
      _.mapValues(destinations, (destination) => {
        const outgoingTrip =
          createRestrictionGroupCollection(
            convertIncompleteTreeFromStorageFormat(destination.restrictionTree),
            outgoingContext,
          ).getBestGroup() ?? new RestrictionGroup()

        const returnContext = {
          origin: destination.countryCode,
          citizenship: ['md'],
          [RestrictionNodeType.DID_NOT_VISIT_COUNTRIES]: [],
        }

        const returnTrip =
          createRestrictionGroupCollection(
            originRestrictionTree,
            returnContext,
          ).getBestGroup() ?? new RestrictionGroup()

        if (!outgoingTrip) {
          return
        }

        return {
          outgoing: createGroup(outgoingTrip),
          return: createGroup(returnTrip),
        }
      }),
      (v) => v !== undefined,
    ),
  )
})

app.get('/restrictions/:originISO/all', async (req, res) => {
  res.status(200).send('1')
})

app.get('/restrictions/all/:destinationISO', async (req, res) => {
  res.status(200).send('1')
})

export const api = functions.https.onRequest(app)
