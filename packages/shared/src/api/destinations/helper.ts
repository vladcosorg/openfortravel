import {
  MappedDestinationCollection,
  Destination,
} from '@/shared/src/api/destinations/models'
import {
  createPlainDestination,
  DestinationDocument,
  MappedPlainDestinationCollection,
  PlainDestination,
} from '@/shared/src/api/destinations/plain-destination'

export function getFullDestinationList(
  partialDestinationList: MappedPlainDestinationCollection,
  countryCodesList: string[],
): MappedDestinationCollection {
  const fullList: MappedDestinationCollection = {}
  for (const countryCode of countryCodesList) {
    if (!partialDestinationList[countryCode]) {
      fullList[countryCode] = createDummyDestination(countryCode)
    } else {
      fullList[countryCode] = wrapWithRichDestinationObject(
        createPlainDestination(
          countryCode,
          partialDestinationList[countryCode],
        ),
      )
    }
  }

  return fullList
}

export function createDummyPlainDestination(
  countryISO: string,
  mergeFields: DestinationDocument = {},
): PlainDestination {
  return createPlainDestination(countryISO, mergeFields)
}

export function createDummyDestination(
  countryISO: string,
  mergeFields: DestinationDocument = {},
): Destination {
  return new Destination(createDummyPlainDestination(countryISO, mergeFields))
}

export function wrapWithRichDestinationObject(
  plainRestriction: PlainDestination,
): Destination {
  return new Destination(plainRestriction)
}

export function wrapCollectionWithRichObject(
  plainRestrictions: PlainDestination[],
): Destination[] {
  return plainRestrictions.map((element) =>
    wrapWithRichDestinationObject(element),
  )
}
