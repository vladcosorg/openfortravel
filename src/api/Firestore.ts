import { firestore, countryCollection } from 'boot/firebase'

export interface Country {
  code: string;
  document: string;
  destinations: Record<string, Destination>
}

export interface Destination {
  destinationCode: string;
  notes: string;
  status: boolean;
  testRequired: boolean;
}

function extractDocs (results) {
  const output = {}
  results.forEach(document => {
    output[document.id] = document.data()
  })
  return output
}

export async function findCountryDestinations (code: string): Promise<Record<string, Destination>> {
  const results = await countryCollection.doc(code).collection('destinations').get()
  return extractDocs(results)
}

export async function saveCountryDestination (object: any, hostCountryISO: string, destinationCountryISO: string) {
  const results = await countryCollection.doc(hostCountryISO)
    .collection('destinations')
    .doc(destinationCountryISO).set(object, { merge: true })
  console.log(results)
}
