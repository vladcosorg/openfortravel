import admin from 'firebase-admin'
import * as functions from 'firebase-functions'

import { runScraper } from '@/functions/src/cdc-scraper'

import { translate } from './translator/translator'

const safetyLevelCalculatorJob = functions.pubsub
  .schedule('every 48 hours')
  .onRun(async () => {
    await runScraper()
    return
  })

const lastUpdatedListener = functions.firestore
  .document('restrictions/{restrictionId}')
  .onUpdate(async (change) => {
    const db = admin.firestore()
    const data = change.after.data()

    await db.doc(`countries/${data.destination}`).set(
      {
        lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
      },
      {
        merge: true,
      },
    )

    await db.doc(`viewByDestination/${data.destination}`).set(
      {
        [`origins.${data.origin}`]: data,
      },
      {
        merge: true,
      },
    )

    await db.doc(`viewByOrigin/${data.origin}`).set(
      {
        [`destinations.${data.destination}`]: data,
      },
      {
        merge: true,
      },
    )
  })

const countryListener = functions.firestore
  .document('countries/{countryID}')
  .onUpdate(async (change, context) => {
    const db = admin.firestore()
    const data = change.after.data()
    const countryID = context.params.countryID

    await db.doc(`viewByDestination/${countryID}`).set(data, {
      merge: true,
    })

    await db.doc(`viewByOrigin/${countryID}`).set(data, {
      merge: true,
    })
  })

export {
  translate,
  lastUpdatedListener,
  safetyLevelCalculatorJob,
  countryListener,
}
