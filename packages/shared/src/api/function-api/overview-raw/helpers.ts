import { MappedPlainDestinationCollection } from '@/shared/src/api/destinations/plain-destination'
import { RoundTripEncodedRestriction } from '@/shared/src/api/function-api/overview-raw/model'
import { getCountryISOCodes } from '@/shared/src/misc/country-codes'
import { createProfileContext } from '@/shared/src/models/profile-context/helper'
import { ProfileContext } from '@/shared/src/models/profile-context/profile-context'
import { convertIncompleteTreeFromStorageFormat } from '@/shared/src/restriction-tree/converter'
import {
  createRestrictionGroupCollection,
  RestrictionGroup,
} from '@/shared/src/restriction-tree/restriction-group'

export function createRawOverviewCollection(
  context: Partial<ProfileContext>,
  rawDestinations: MappedPlainDestinationCollection,
): Record<string, RoundTripEncodedRestriction> {
  const outgoingContext = createProfileContext(context)
  const returningDestination = rawDestinations[outgoingContext.origin]
  const returningDestinationRestrictions =
    convertIncompleteTreeFromStorageFormat(
      returningDestination ? returningDestination.restrictionTree ?? [] : [],
    )

  const result: Record<string, RoundTripEncodedRestriction> = {}

  for (const countryISO of getCountryISOCodes()) {
    if (countryISO === context.origin) {
      continue
    }

    const destination = rawDestinations[countryISO]
    const outgoingTrip =
      createRestrictionGroupCollection(
        convertIncompleteTreeFromStorageFormat(
          destination ? destination.restrictionTree : [],
        ),
        outgoingContext,
      ).getBestGroup() ?? new RestrictionGroup()

    const returnTrip =
      createRestrictionGroupCollection(
        returningDestinationRestrictions,
        createProfileContext({
          origin: countryISO,
          ...context,
        }),
      ).getBestGroup() ?? new RestrictionGroup()

    result[countryISO] = {
      outgoing: outgoingTrip.encode(),
      return: returnTrip.encode(),
    }
  }

  return result
}
