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
import {
  computed,
  ComputedRef,
  defineComponent,
  PropType,
  ref,
} from '@vue/composition-api'
import { unionBy } from 'lodash'

import { Restriction } from '@/shared/src/api/restrictions/models'

export default defineComponent({
  components: {},
  props: {
    value: { type: Array as PropType<Restriction[]>, required: true },
    restrictions: {
      type: Array as PropType<Restriction[]>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const aliases: Record<string, Array<string | RegExp>> = {
      kr: [/(korea\w*?)/i],
      va: [/(vatican\w*?)/i],
      uk: [/(uk|u.k.)/i],
      md: ['Moldova'],
      cz: ['Czechia'],
      tz: ['Tanzania'],
      cd: ['Democratic Republic of the Congo'],
      ae: ['UAE'],
      ru: [/(russia\w*?)/i],
    }
    const labels = computed(() => {
      const map = props.restrictions.reduce<Map<string | RegExp, Restriction>>(
        (acc, restriction: Restriction) => {
          acc.set(restriction.originLabel, restriction)

          if (aliases[restriction.origin]) {
            for (const alias of aliases[restriction.origin]) {
              acc.set(alias, restriction)
            }
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
    const foundItems: ComputedRef<Restriction[]> = ref([])
    const parseValue = computed({
      get() {
        return parseString.value
      },
      set(value: string) {
        foundItems.value.length = 0
        // eslint-disable-next-line unicorn/better-regex
        value = value.replace(/(]|\[)/g, '')

        for (const [label, restriction] of labels.value) {
          value = value.replace(label, (match) => {
            if (
              foundItems.value.some(
                (foundRestriction) =>
                  foundRestriction.origin === restriction.origin,
              )
            ) {
              return match
            }
            foundItems.value.push(restriction)
            return `[${restriction.origin}]`
          })
        }

        parseString.value = value
      },
    })

    const dialog = ref()
    const currentSelectionLabels = computed(() =>
      props.value.map((rest) => rest.originLabel).join(', '),
    )

    const foundItemsLabels = computed(() =>
      foundItems.value.map((rest) => rest.originLabel).join(', '),
    )

    return {
      currentSelectionLabels,
      foundItemsLabels,
      parseValue,
      dialog,
      onOKClick: () => {
        emit('ok', { items: unionBy(props.value, foundItems.value, 'origin') })
        dialog.value.hide()
      },
      onDialogHide: () => emit('hide'),
      show: () => dialog.value.show(),
    }
  },
})
</script>
