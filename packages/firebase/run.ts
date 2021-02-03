import admin from 'firebase-admin'

import { RestrictionDocument } from '@/shared/src/api/restrictions/models'

const db = admin
  .initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://openfortravel.firebaseio.com',
  })
  .firestore()

async function run() {
  const col = db.collection('restrictions')
  const query = await col.where('destination', '==', 'uk').get()
  for (const item of query.docs) {
    const data: RestrictionDocument = item.data()
    await col.doc(`${data.origin}gb`).set({ ...data, destination: 'gb' })
    await item.ref.delete()
  }
}

run().finally(() => 'Done')
