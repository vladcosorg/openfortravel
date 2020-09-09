<template>
  <q-page>
    <div class=" column justify-center  q-pa-lg  q-gutter-xl" >
      <div class="text-h6 text-center">Am gasit urmatoarele directii disponibile</div>
      <destination-group :group-name="$t('allowed')" :group-icon="allowedIcon" group-color="positive"
                         :destinations="destinations.allowed"/>
      <destination-group :group-name="$t('conditional')" :group-icon="conditionalIcon" group-color="warning"
                         :destinations="destinations.conditional"/>
      <destination-group :group-name="$t('forbidden')" :group-icon="forbiddenIcon" group-color="negative"
                         :destinations="destinations.forbidden"/>
    </div>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, onServerPrefetch, watch } from '@vue/composition-api'
import DestinationGroup from 'pages/country/components/DestinationGroup.vue'
import { DestinationCountry, FormattedDestinationCountry } from 'components/models'
import { useRoute, useStore } from 'src/composables/use-plugins'
import { getCountryMap, getFlagForCountryCode, getLabelForCountryCode } from 'src/misc/I18nCountryList'
import { groupBy } from 'lodash'
import {
  ionCheckmarkCircle as allowedIcon,
  ionAlertCircle as conditionalIcon,
  ionRemoveCircle as forbiddenIcon
} from '@quasar/extras/ionicons-v5'
import { findCountryDestinations } from 'src/api/Firestore'

export default defineComponent({
  components: { DestinationGroup },
  setup () {
    const destinations = computed(() => useStore().state.countryDestinations)
    watch(computed(() => {
      return useStore().state.countryList
    }), loadDestinationList)

    onServerPrefetch(loadDestinationList)

    return { destinations, allowedIcon, conditionalIcon, forbiddenIcon }
  }
})

function groupByStatus (destinations: FormattedDestinationCountry[]) {
  return groupBy(
    destinations,
    (destination: FormattedDestinationCountry) => destination.status
  )
}

export function format (destinations: Record<string, FormattedDestinationCountry>): Record<string, FormattedDestinationCountry> {
  const output = {}
  for (const [countryCode, destination] of Object.entries(destinations)) {
    output[countryCode] = {
      ...destination,
      country: {
        label: getLabelForCountryCode(countryCode),
        flag: getFlagForCountryCode(countryCode),
        code: countryCode
      }
    }
  }
  return output
}

export function generateSecondaryDestinations (destinations: DestinationCountry[]): DestinationCountry[] {
  const countries = getCountryMap()
  const excludedCountries = Object.keys(destinations)
  for (const countryCode of Object.keys(countries)) {
    if (excludedCountries.includes(countryCode)) {
      continue
    }

    destinations[countryCode] = {
      notes: '',
      status: 'allowed',
      testRequired: false,
      country: {
        label: getLabelForCountryCode(countryCode),
        flag: getFlagForCountryCode(countryCode),
        code: countryCode
      }
    }
  }

  return destinations
}

async function loadDestinationList () {
  const hostCountry = await findCountryDestinations(useRoute().params.country)
  useStore().commit('setCountryDestinations', groupByStatus(generateSecondaryDestinations(format(hostCountry))))
}

</script>
