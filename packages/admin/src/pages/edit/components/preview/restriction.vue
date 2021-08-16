<template>
  <q-item dense>
    <q-item-section>
      <q-item-label class="text-subtitle1">{{ label }}</q-item-label>
      <q-item-label
        v-for="(optionValue, optionName) in options"
        :key="optionName"
        caption
        class="ellipsis-improved"
      >
        <b v-if="Object.values(options).length > 1">{{ optionName }}:</b>
        <span :title="optionValue"> {{ optionValue }}</span>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'

import { getRestrictionLabel } from '@/admin/src/pages/edit/components/restriction-tree/tree-item/fields/node-type-drowdown.vue'
import { vd } from '@/shared/src/misc/helpers'
import { ExtractArgs } from '@/shared/src/misc/type-helpers'
import { getLabelsForCountryCodes } from '@/shared/src/modules/country-list/country-list-helpers'
import { AbstractRestrictionNode } from '@/shared/src/restriction-tree/abstract-restriction-node'
import { Age } from '@/shared/src/restriction-tree/restriction-node/age'
import { Citizenship } from '@/shared/src/restriction-tree/restriction-node/citizenship'
import { DidNotVisitCountries } from '@/shared/src/restriction-tree/restriction-node/did-not-visit-countries'
import { OnlineApplication } from '@/shared/src/restriction-tree/restriction-node/online-application'
import { Origin } from '@/shared/src/restriction-tree/restriction-node/origin'
import {
  PcrTest,
  testLabels,
} from '@/shared/src/restriction-tree/restriction-node/pcr-test'
import { Quarantine } from '@/shared/src/restriction-tree/restriction-node/quarantine'
import { RecoveryCertificate } from '@/shared/src/restriction-tree/restriction-node/recovery-certificate'
import {
  Vaccinated,
  vaccineLabels,
} from '@/shared/src/restriction-tree/restriction-node/vaccinated'

function isType<
  T extends { new (...args: ExtractArgs<T>): A },
  A extends AbstractRestrictionNode,
>(restriction: A, type: T): restriction is InstanceType<T> {
  return restriction.constructor === type
}

export default defineComponent({
  props: {
    restriction: {
      type: Object as PropType<AbstractRestrictionNode>,
      required: true,
    },
  },
  setup(props) {
    const label = computed(() => getRestrictionLabel(props.restriction.id()))
    const options = computed(() => {
      let output: Record<string, string | undefined | number> = {}
      const restriction = props.restriction

      if (restriction.options.customInstructionTitle) {
        output['Custom title'] = restriction.options.customInstructionTitle
      }

      if (restriction.options.customInstructionTitle) {
        output['Custom content'] = restriction.options.customInstructionSubtitle
      }

      if (isType(restriction, DidNotVisitCountries)) {
        output = {
          Countries:
            restriction.getCountries().length > 0
              ? getLabelsForCountryCodes(restriction.getCountries()).join(', ')
              : 'None',
          'In the last': `${restriction.options.days} days`,
        }
      } else if (isType(restriction, Citizenship)) {
        output = {
          Citizenships:
            restriction.getAllowedCountries().length > 0
              ? getLabelsForCountryCodes(
                  restriction.getAllowedCountries(),
                ).join(', ')
              : 'None',
        }
      } else if (isType(restriction, Origin)) {
        output = {
          Origins:
            restriction.getAllowedCountries().length > 0
              ? getLabelsForCountryCodes(
                  restriction.getAllowedCountries(),
                ).join(', ')
              : 'None',
        }
      } else if (isType(restriction, OnlineApplication)) {
        output = {
          URL: vd(restriction.options.url, 'None'),
        }
      } else if (isType(restriction, Age)) {
        output = {
          Age: `${restriction.options.age} ${
            restriction.options.orMore ? ' or more' : 'or less'
          }`,
        }
      } else if (isType(restriction, Vaccinated)) {
        output = {
          Brand:
            restriction.options.authorizedBrands.length > 0
              ? restriction.options.authorizedBrands
                  ?.map((brand) => vaccineLabels[brand])
                  .join(', ')
              : 'Any',
          'Days at least': restriction.options.daysAgo,
          'Days at most': restriction.options.monthsAtMost,
          'Allow partial': restriction.options.partial ? 'Yes' : 'No',
        }
      } else if (isType(restriction, PcrTest)) {
        output = {
          Types: vd(
            restriction.options.types
              .map((brand) => testLabels[brand])
              .join(', '),
            'Any',
          ),
          When: restriction.options.beforeArrival
            ? `${restriction.options.hoursBeforeArrival}h before arrival`
            : `After arrival ${
                restriction.options.hoursBeforeArrival > 0
                  ? `within ${restriction.options.hoursBeforeArrival}h`
                  : 'at the airport'
              } `,
        }
      } else if (isType(restriction, Quarantine)) {
        output = {
          Days: restriction.options.days,
          'Early Release Days': restriction.options.earlyReleaseDays
            ? restriction.options.earlyReleaseDays
            : 'No',
        }
      } else if (isType(restriction, RecoveryCertificate)) {
        output = {
          'Days at least': restriction.options.daysAtLeast,
          'Days at most': restriction.options.daysAtMost,
        }
      }

      return output
    })
    return { label, options }
  },
})
</script>
