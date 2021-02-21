import admin from 'firebase-admin'
import { groupBy } from 'lodash'

const db = admin
  .initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://openfortravel.firebaseio.com',
  })
  .firestore()

async function run() {
  const col = db.collection('restrictions')
  const query = await col.get()
  const data = query.docs.map((item) => item.data())
  const groupedByOrigin = groupBy(data, (item) => item.origin)
  const groupedByDestination = groupBy(data, (item) => item.destination)

  const countries = await db.collection('countries').get()

  const viewByOriginCollection = db.collection('viewByOrigin')
  const viewByDestinationCollection = db.collection('viewByDestination')
  for (const countrySnapshot of countries.docs) {
    const country = countrySnapshot.data()

    if (groupedByDestination[countrySnapshot.id]) {
      try {
        await viewByDestinationCollection.doc(countrySnapshot.id).set({
          ...country,
          origins: groupedByDestination[countrySnapshot.id].reduce(
            (acc, item) => {
              acc[item.origin] = item
              return acc
            },
            {},
          ),
        })
      } catch (error) {
        console.log(error)
      }
    }

    if (groupedByOrigin[countrySnapshot.id]) {
      try {
        await viewByOriginCollection.doc(countrySnapshot.id).set({
          ...country,
          destinations: groupedByOrigin[countrySnapshot.id].reduce(
            (acc, item) => {
              acc[item.destination] = item
              return acc
            },
            {},
          ),
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  // for( const restriction )

  // console.log(groupedByOrigin, groupedByDestination)
  // for (const item of query.docs) {
  //   const data: RestrictionDocument = item.data()
  //   await col.doc(`${data.origin}gb`).set({ ...data, destination: 'gb' })
  //   await item.ref.delete()
  // }
}

run().finally(() => 'Done')
