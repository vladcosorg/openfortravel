import {
  Destination,
  DestinationDefaults,
  PlainDestination,
} from '@/front/src/api/destinations/models'

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
