import admin from 'firebase-admin'
import * as functions from 'firebase-functions'

import { runScraper } from '@/functions/src/cdc-scraper'

export const safetyLevelCalculatorJob = functions.pubsub
  .schedule('every 48 hours')
  .onRun(async () => {
    await runScraper()
    return
  })

export const lastUpdatedListener = functions.firestore
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
  })
