import {
  MappedDestinationCollection,
  MappedPlainDestinationCollection,
  PlainDestination,
  Destination,
  DestinationDefaults,
} from '@/shared/src/api/destinations/models'

export function getFullDestinationList(
  partialDestinationList: MappedPlainDestinationCollection,
  countryCodesList: string[],
): MappedDestinationCollection {
  const fullList: MappedDestinationCollection = {}
  for (const countryCode of countryCodesList) {
    if (!partialDestinationList[countryCode]) {
      fullList[countryCode] = createDummyDestination({ countryCode })
    } else {
      fullList[countryCode] = wrapWithRichDestinationObject(
        partialDestinationList[countryCode],
      )
    }
  }

  return fullList
}

export function createDummyPlainDestination(
  mergeFields: Partial<PlainDestination> = {},
): PlainDestination {
  return Object.assign(
    {},
    new DestinationDefaults().toPlainObject(),
    mergeFields,
  )
}

export function createDummyDestination(
  mergeFields: Partial<PlainDestination> = {},
): Destination {
  return new Destination(createDummyPlainDestination(mergeFields))
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
