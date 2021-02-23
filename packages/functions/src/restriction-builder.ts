import admin from 'firebase-admin'
import { firestore } from 'firebase-admin/lib/firestore'
import * as functions from 'firebase-functions'

import DocumentData = firestore.DocumentData

export const restrictionBuilder = functions.firestore
  .document('restrictions/{restrictionId}')
  .onWrite(async (change) => {
    const db = admin.firestore()

    if (!change.after.exists) {
      return
    }

    const data = change.after.data() as DocumentData

    await db.doc(`viewByDestination/${data.destination}`).set(
      {
        [data.origin]: {
          ...data,
        },
      },
      {
        merge: true,
      },
    )

    await db.doc(`viewByOrigin/${data.origin}`).set(
      {
        [data.destination]: {
          ...data,
        },
      },
      {
        merge: true,
      },
    )
  })
