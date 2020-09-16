import { countryCollection } from 'boot/firebase'
import * as firebase from 'firebase/app'
import QuerySnapshot = firebase.firestore.QuerySnapshot

export interface Country {
  code: string
  document: string
  destinations: Record<string, Destination>
}

export interface Destination {
  destinationCode: string
  notes: string
  status: boolean
  testRequired: boolean
}

function extractDocs(results: QuerySnapshot) {
  const output: Record<string, Destination> = {}
  results.forEach((document) => {
    output[document.id] = document.data() as Destination
  })
  return output
}

export async function findCountryDestinations(
  code: string,
): Promise<Record<string, Destination>> {
  const results = await countryCollection
    .doc(code)
    .collection('destinations')
    .get()
  return extractDocs(results)
}

export async function saveCountryDestination(
  object: Destination,
  hostCountryISO: string,
  destinationCountryISO: string,
): Promise<void> {
  await countryCollection
    .doc(hostCountryISO)
    .collection('destinations')
    .doc(destinationCountryISO)
    .set(object, { merge: true })
}
