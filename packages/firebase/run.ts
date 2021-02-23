import admin from 'firebase-admin'

const db = admin
  .initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://openfortravel.firebaseio.com',
  })
  .firestore()

async function run() {
  const ids = (
    await db
      .collection('viewByOrigin')
      .orderBy('destinations.md')
      .limit(10)
      .get()
  ).docs.map((item) => item.id)
  console.log(ids)
}

run().finally(() => 'Done')
