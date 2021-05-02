<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="width: 560px">
      <q-card-section class="text-uppercase bg-teal q-mb-lg"
        ><div class="text-h6">Parse list</div>
      </q-card-section>
      <q-card-section>
        <q-input v-model="parseValue" rows="10" filled type="textarea" />
      </q-card-section>
      <q-card-section>
        <ul>
          <li>Current selection: {{ currentSelectionLabels }}</li>
          <li>Found items labels: {{ foundItemsLabels }}</li>
        </ul>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="primary" flat label="Close" @click="dialog.hide()" />
        <q-btn color="primary" label="Apply" @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import type { ComputedRef, PropType} from '@vue/composition-api';
import { computed, defineComponent, ref } from '@vue/composition-api'
import { union } from 'lodash'

import {
  getOriginLabelForCountryCode,
  getOriginLabels,
} from '@/shared/src/modules/country-list/country-list-helpers'

export default defineComponent({
  components: {},
  props: {
    value: { type: Array as PropType<string[]>, required: true },
  },
  setup(props, { emit }) {
    const aliases: Record<string, Array<string | RegExp>> = {
      kr: [/(korea\w*?)/i],
      va: [/(vatican\w*?)/i],
      gb: [/(uk|u\.k\.)/i, 'UK', 'United Kingdom of Great Britain and Northern Ireland'],
      md: [/moldova/i],
      cz: [/czechia/i],
      ir: ['Iran'],
      tz: ['Tanzania'],
      cd: ['Democratic Republic of the Congo'],
      ae: ['UAE'],
      ru: [/(russia\w*?)/i],
      ch: [/(swiss\w*?)/i],
      it: [/(italia\w*?)/i],
      ie: [/(ireland\w*?)/i],
      fr: [/(french\w*?)/i],
      tr: [/(turk\w*?)/i],
      us: [/(usa\w*?)/i],
      sk: [/(slovak\w*?)/i],
      pt: [/(portug\w*?)/i],
      mx: [/(mexica\w*?)/i],
      mk: [/(macedoni\w*?)/i],
      ci: [/(ivory\w*?)/i, /(ivoire\w*?)/i],
      lb: [/(leban\w*?)/i],
      ar: [/(argent\w*?)/i],
      tl: [/(timor\w*?)/i],
      gr: [/(hellenic\w*?)/i],
    }
    const labels = computed(() => {
      const map = Object.entries(getOriginLabels()).reduce<Map<string | RegExp, string>>(
        (acc, [code, label]) => {
          acc.set(label, code)

          if (aliases[code]) {
            for (const alias of aliases[code]) {
              acc.set(alias, code)
            }
          } else {
            acc.set(new RegExp(label, 'i'), code)
          }
          return acc
        },
        new Map(),
      )

      const sorted = [...map.entries()].sort(([firstLabel], [secondLabel]) => {
        if (typeof firstLabel === 'string' && typeof secondLabel === 'string') {
          return secondLabel.length - firstLabel.length
        }

        if (typeof firstLabel === 'object' && typeof secondLabel === 'string') {
          return -1
        }

        if (typeof secondLabel === 'object' && typeof firstLabel === 'string') {
          return 1
        }

        return 0
      })
      return new Map(sorted)
    })

    const parseString = ref('')
    const foundItems: ComputedRef<string[]> = ref([])
    const parseValue = computed({
      get() {
        return parseString.value
      },
      set(value: string) {
        foundItems.value.length = 0
        // eslint-disable-next-line unicorn/better-regex
        value = value.replace(/(]|\[)/g, '')

        for (const [label, code] of labels.value) {
          value = value.replace(label, (match) => {
            if (foundItems.value.some((foundCode) => foundCode === code)) {
              return match
            }
            foundItems.value.push(code)
            return `[${code}]`
          })
        }

        parseString.value = value
      },
    })

    const dialog = ref()
    const currentSelectionLabels = computed(() =>
      props.value.map((code) => getOriginLabelForCountryCode(code)).join(', '),
    )

    const foundItemsLabels = computed(() =>
      foundItems.value.map((code) => getOriginLabelForCountryCode(code)).join(', '),
    )

    return {
      currentSelectionLabels,
      foundItemsLabels,
      parseValue,
      dialog,
      onOKClick: () => {
        emit('ok', { items: union(props.value, foundItems.value) })
        dialog.value.hide()
      },
      onDialogHide: () => emit('hide'),
      show: () => dialog.value.show(),
    }
  },
})
</script>
