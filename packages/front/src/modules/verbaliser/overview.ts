import { h, VNode } from 'vue'

import { useCustomI18n } from '@/front/src/modules/i18n/composables'
import { RoundTripRestrictionGroup } from '@/shared/src/api/function-api/overview/model'
import { ProfileContext } from '@/shared/src/models/profile-context/profile-context'
import { RestrictionGroup } from '@/shared/src/restriction-tree/restriction-group'

const { tr } = useCustomI18n()

type FragmentContext = {
  profile: ProfileContext
  destinationISO: string
  url: string
  roundtrip: RoundTripRestrictionGroup
}

export function verbaliseOverview(
  profile: ProfileContext,
  destinationISO: string,
  url: string,
  roundtrip: RoundTripRestrictionGroup,
) {
  const group = roundtrip.outgoing
  return () => {
    const context = {
      profile,
      destinationISO,
      url,
      roundtrip,
    }

    let selectedBlock: VNode | string = 'No info'
    const conditionalBlocks = [
      isForbiddenFragment,
      hasNoRestrictions,
      onlyVaccine,
      onlyVaccineAndBeforeTest,
      onlyVaccineAndAfterTestWithQuarantine,
      onlyVaccineAndBeforeAfterTestWithQuarantine,
      onlyVaccineAndQuarantine,
      onlyBeforeTest,
      onlyBeforeTestWithQuarantine,
      onlyAfterTestWithQuarantine,
      onlyBeforeAndAfterTestWithQuarantine,
      onlyQuarantine,
    ]

    for (const potentialBlock of conditionalBlocks) {
      const selectionResult = potentialBlock(context)

      if (selectionResult !== undefined) {
        selectedBlock = h('span', { innerHTML: selectionResult })
        break
      }
    }

    const blocks: Array<VNode | string | string[] | undefined> = [
      selectedBlock,
      [' '],
      includeOnlineApplication(context),
      [' '],
      includeInsurance(group, !!profile.vaccinated),
      includeMoreInfo(profile.origin, destinationISO, url),
    ]
    return h(
      'div',
      blocks.filter((block) => block),
    )
  }
}

function isForbiddenFragment(
  context: FragmentContext,
): string | VNode | undefined {
  if (!context.roundtrip.outgoing.isForbidden) {
    return
  }

  return tr('rs.forbidden')
}

function hasNoRestrictions(
  context: FragmentContext,
): string | VNode | undefined {
  if (!context.roundtrip.outgoing.hasNoRestrictions) {
    return
  }

  return tr('rs.noRestrictions', {
    destination: context.destinationISO,
    origin: context.profile.origin,
  })
}

function onlyVaccine(context: FragmentContext): string | VNode | undefined {
  if (!context.roundtrip.outgoing.canEnterVaccinated) {
    return
  }

  return tr('rs.onlyVaccinated', {
    destination: context.destinationISO,
    origin: context.profile.origin,
  })
}

function onlyVaccineAndBeforeTest(
  context: FragmentContext,
): string | VNode | undefined {
  if (!context.roundtrip.outgoing.canEnterVaccinatedAndTestedBeforeArrival) {
    return
  }

  return tr('rs.onlyVaccinatedAndTestedBeforeFlight', {
    destination: context.destinationISO,
    origin: context.profile.origin,
  })
}

function onlyVaccineAndAfterTestWithQuarantine(
  context: FragmentContext,
): string | VNode | undefined {
  if (
    !context.roundtrip.outgoing
      .canEnterVaccinatedAndTestedAfterArrivalWithQuarantine
  ) {
    return
  }

  return tr('rs.onlyVaccinatedAndTestedAfterFlightWithQuarantine', {
    destination: context.destinationISO,
    origin: context.profile.origin,
  })
}

function onlyVaccineAndBeforeAfterTestWithQuarantine(
  context: FragmentContext,
): string | VNode | undefined {
  if (
    !context.roundtrip.outgoing
      .canEnterVaccinatedBeforeAndAfterTestWithQuarantine
  ) {
    return
  }

  return tr('rs.onlyVaccinatedAndTestedBeforeAfterFlightWithQuarantine', {
    destination: context.destinationISO,
    origin: context.profile.origin,
  })
}

function onlyVaccineAndQuarantine(
  context: FragmentContext,
): string | VNode | undefined {
  if (!context.roundtrip.outgoing.canEnterVaccinatedWithQuarantine) {
    return
  }

  return tr('rs.onlyVaccinatedAndQuarantine', {
    destination: context.destinationISO,
    origin: context.profile.origin,
  })
}

function onlyBeforeTest(context: FragmentContext): string | VNode | undefined {
  if (!context.roundtrip.outgoing.canEnterWithBeforeTest) {
    return
  }

  return tr('rs.onlyTestedBeforeFlight', {
    destination: context.destinationISO,
    origin: context.profile.origin,
  })
}

function onlyBeforeTestWithQuarantine(
  context: FragmentContext,
): string | VNode | undefined {
  if (
    !context.roundtrip.outgoing
      .canEnterWithoutVaccinationButTestedBeforeArrivalWithQuarantine
  ) {
    return
  }

  return tr('rs.onlyTestedBeforeFlightWithQuarantine', {
    destination: context.destinationISO,
    origin: context.profile.origin,
  })
}

function onlyAfterTestWithQuarantine(
  context: FragmentContext,
): string | VNode | undefined {
  if (!context.roundtrip.outgoing.canEnterWithAfterTest) {
    return
  }

  return tr('rs.onlyTestedAfterFlightWithQuarantine', {
    destination: context.destinationISO,
    origin: context.profile.origin,
  })
}

function onlyBeforeAndAfterTestWithQuarantine(
  context: FragmentContext,
): string | VNode | undefined {
  if (
    !context.roundtrip.outgoing.canEnterWithBeforeAndAfterTestWithQuarantine
  ) {
    return
  }

  return tr('rs.onlyTestedBeforeAndAfterFlightWithQuarantine', {
    destination: context.destinationISO,
    origin: context.profile.origin,
  })
}

function onlyQuarantine(context: FragmentContext): string | VNode | undefined {
  if (!context.roundtrip.outgoing.canEnterWithQuarantine) {
    return
  }

  return tr('rs.quarantine.true', {
    destination: context.destinationISO,
    origin: context.profile.origin,
  })
}

function includeOnlineApplication(context: FragmentContext): VNode | undefined {
  if (!context.roundtrip.outgoing.onlineApplicationRequired) {
    return
  }
  return h('span', {
    innerHTML: tr('rs.onlineApplication'),
  })
}

function includeInsurance(
  group: RestrictionGroup,
  isVaccinated: boolean,
): VNode | undefined {
  if (group.insuranceRequired) {
    return isVaccinated
      ? h('span', {
          innerHTML: tr('rs.insurance.vaccinated'),
        })
      : h('span', {
          innerHTML: tr('rs.insurance.unvaccinated'),
        })
  }

  return undefined
}

function includeMoreInfo(
  originISO: string,
  destinationISO: string,
  url: string,
): VNode {
  return h('p', {
    innerHTML: tr('rs.readmore', {
      destination: destinationISO,
      origin: originISO,
      link: url,
    }),
  })
}
