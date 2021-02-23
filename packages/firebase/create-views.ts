import admin from 'firebase-admin'
import { groupBy } from 'lodash'

import { DestinationDocument } from '@/shared/src/api/destinations/models'

const db = admin
  .initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://openfortravel.firebaseio.com',
  })
  .firestore()

async function run() {
  const countries = (await db.collection('countries').get()).docs.reduce<
    Record<string, DestinationDocument>
  >((acc, country) => {
    acc[country.id] = country.data() as DestinationDocument
    return acc
  }, {})
  const col = db.collection('restrictions')
  const query = await col.get()
  const data = query.docs.map((item) => item.data())
  const groupedByOrigin = groupBy(data, (item) => item.origin)
  const groupedByDestination = groupBy(data, (item) => item.destination)

  const viewByOriginCollection = db.collection('viewByOrigin')
  const viewByDestinationCollection = db.collection('viewByDestination')
  for (const [countryID, _countryData] of Object.entries(countries)) {
    if (groupedByDestination[countryID]) {
      try {
        await viewByDestinationCollection.doc(countryID).set(
          groupedByDestination[countryID].reduce((acc, restriction) => {
            acc[restriction.origin] = restriction
            return acc
          }, {}),
        )
      } catch (error) {
        console.log(error)
      }
    }

    if (groupedByOrigin[countryID]) {
      try {
        await viewByOriginCollection.doc(countryID).set(
          groupedByOrigin[countryID].reduce((acc, restriction) => {
            acc[restriction.destination] = restriction
            return acc
          }, {}),
        )
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
