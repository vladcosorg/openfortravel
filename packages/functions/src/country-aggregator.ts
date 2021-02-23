import admin from 'firebase-admin'
import * as functions from 'firebase-functions'

import { RestrictionDocument } from '@/shared/src/api/restrictions/models'

export const countryAggregator = functions.firestore
  .document('countries/{countryID}')
  .onWrite(async (change, context) => {
    const db = admin.firestore()
    const countryID = context.params.countryID

    if (countryID === '_all' || !change.after.exists) {
      return
    }

    try {
      await db.doc('countries/_all').update({
        [`collection.${countryID}`]: {
          ...change.after.data(),
          countryCode: countryID,
        },
      })
    } catch {
      await db.doc('countries/_all').set({
        collection: (
          await db
            .collection('countries')
            .where(admin.firestore.FieldPath.documentId(), '!=', '_all')
            .get()
        ).docs.reduce<Record<string, unknown>>((acc, item) => {
          acc[item.id] = { ...item.data(), countryCode: item.id }
          return acc
        }, {}),
      })
    }
  })

export const countryLastUpdated = functions.firestore
  .document('restrictions/{restrictionId}')
  .onWrite(async (change) => {
    const db = admin.firestore()

    if (!change.after.exists) {
      return
    }

    const data = change.after.data() as RestrictionDocument

    await db.doc(`countries/${data.destination}`).set(
      {
        lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
      },
      {
        merge: true,
      },
    )
  })
