<template>
  <q-page>
    <div class="column justify-center q-pa-lg q-gutter-xl">
      <div class="text-h6 text-center">
        Am gasit urmatoarele directii disponibile
      </div>
      <destination-group
        :group-name="$t('status.allowed')"
        :group-icon="allowedIcon"
        group-color="positive"
        :destinations="destinations.allowed"
      />
      <destination-group
        :group-name="$t('status.conditional')"
        :group-icon="conditionalIcon"
        group-color="warning"
        :destinations="destinations.conditional"
      />
      <destination-group
        :group-name="$t('status.forbidden')"
        :group-icon="forbiddenIcon"
        group-color="negative"
        :destinations="destinations.forbidden"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  onServerPrefetch,
  watch,
} from '@vue/composition-api'
import DestinationGroup from 'pages/country/components/DestinationGroup.vue'
import {
  DestinationCountry,
  FormattedDestinationCountry,
} from 'components/models'
import { useRoute, useStore } from 'src/composables/use-plugins'
import {
  getCountryMap,
  getFlagForCountryCode,
  getLabelForCountryCode,
} from 'src/misc/I18nCountryList'
import { groupBy, isEmpty } from 'lodash'
import { LoadingBar } from 'quasar'
import {
  ionCheckmarkCircle as allowedIcon,
  ionAlertCircle as conditionalIcon,
  ionRemoveCircle as forbiddenIcon,
} from '@quasar/extras/ionicons-v5'
import { findCountryDestinations } from 'src/api/Firestore'

export default defineComponent({
  components: { DestinationGroup },
  props: {
    country: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const destinations = computed(() => useStore().state.countryDestinations)
    watch(() => props.country, loadDestinationList)

    onServerPrefetch(loadDestinationList)
    onMounted(async () => {
      if (!isEmpty(useStore().state.countryDestinations)) {
        return
      }

      await nextTick()
      await loadDestinationList()
    })

    return {
      destinations,
      allowedIcon,
      conditionalIcon,
      forbiddenIcon,
    }
  },
})

function groupByStatus(destinations: FormattedDestinationCountry[]) {
  return groupBy(
    destinations,
    (destination: FormattedDestinationCountry) => destination.status,
  )
}

export function format(
  destinations: Record<string, FormattedDestinationCountry>,
): Record<string, FormattedDestinationCountry> {
  const output: Record<string, FormattedDestinationCountry> = {}
  for (const [countryCode, destination] of Object.entries(destinations)) {
    output[countryCode] = {
      ...destination,
      country: {
        label: getLabelForCountryCode(countryCode),
        flag: getFlagForCountryCode(countryCode),
        code: countryCode,
      },
    }
  }
  return output
}

export function generateSecondaryDestinations(
  destinations: DestinationCountry[],
): DestinationCountry[] {
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
        code: countryCode,
      },
    }
  }

  return destinations
}

async function loadDestinationList() {
  LoadingBar.start(50)
  const hostCountry = await findCountryDestinations(useRoute().params.country)
  LoadingBar.stop()
  useStore().commit(
    'setCountryDestinations',
    groupByStatus(generateSecondaryDestinations(format(hostCountry))),
  )
}
</script>
