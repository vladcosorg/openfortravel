<script lang="ts">
import { computed, defineComponent, h, PropType } from 'vue'

import { useRootStore } from '@/shared/src/composables/use-plugins'
import { CountryFactsheet } from '@/shared/src/models/country-factsheet/country-factsheet'
import {
  getLabelForCountryCode,
  getLabelsForCountryCodes,
} from '@/shared/src/modules/country-list/country-list-helpers'
import { getVaccineLabel } from '@/shared/src/restriction-tree/restriction-node/vaccinated'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export default defineComponent({
  props: {
    originFactsheet: {
      type: Object as PropType<CountryFactsheet>,
      required: true,
    },
  },
  setup(props) {
    const rootStore = useRootStore()
    const vaccinated = computed(() => {
      const rawValue =
        rootStore.getters.visitorContextWithDefaults[
          RestrictionNodeType.VACCINATED
        ]

      const prefix = rawValue ? 'vaccinated with' : ''

      return `${prefix} ${getVaccineLabel(
        rawValue ? rawValue.brand : undefined,
      )}`
    })

    const recoveryCertificate = computed(() => {
      const rawValue =
        rootStore.getters.visitorContextWithDefaults[
          RestrictionNodeType.RECOVERY
        ]

      return h(
        'b',
        rawValue
          ? `with a recovery certificate issued ${rawValue} days ago`
          : 'without a recovery certificate',
      )
    })

    const citizenship = computed(() => [
      'citizens of ',
      h(
        'b',
        getLabelsForCountryCodes(
          useRootStore().getters.visitorContextWithDefaults[
            RestrictionNodeType.CITIZENSHIP
          ],
        ).join(' and '),
      ),
    ])

    const origin = computed(() => [
      'arriving from ',
      h('b', getLabelForCountryCode(props.originFactsheet.countryCode)),
    ])

    const visited = computed(() => {
      const visitedCountries =
        rootStore.state.visitorContext[
          RestrictionNodeType.DID_NOT_VISIT_COUNTRIES
        ]
      return [
        'in the last ',
        h('b', '14 days '),
        'they ',
        visitedCountries
          ? h('b', [
              'visited ',
              getLabelsForCountryCodes(visitedCountries).join(' and '),
            ])
          : h('b', 'did not visit any other countries'),
      ]
    })

    return () => [
      'This information only applies to ',
      citizenship.value,
      ' ',
      origin.value,
      ' that are ',
      h('b', vaccinated.value),
      ', ',
      recoveryCertificate.value,
      ' and ',
      visited.value,
      '.',
      h('br'),
      'If these criteria are invalid, please correct them above.',
    ]
  },
})
</script>
