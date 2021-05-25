<template>
  <div>
    <q-dialog v-model="show" full-height>
      <div class="row bg-dark flex-center q-pt-none relative-position">
        <q-checkbox v-model="toggleNegation" label="Negate" />
        <div
          style="position: sticky; top: 0; z-index: 10"
          class="bg-dark full-width q-pa-lg q-pb-none row flex-center"
        >
          <q-btn-group outline>
            <q-btn outline label="Invert" @click="invertSelection" />
            <q-btn outline label="Deselect All" @click="deselectAll" />
            <q-btn outline label="Select All" @click="selectAll" />
            <q-btn outline label="EU" @click="selectEU" />
            <q-btn outline label="EEA" @click="selectEEA" />
            <q-btn outline label="SH" @click="selectSchengen" />
            <q-btn outline label="Parse" @click="openParseDialog" />
          </q-btn-group>
          <br />
          Selected {{ ticked.length }}
        </div>

        <q-input v-model="filter" class="col-12 q-px-lg" standout="" dense />

        <q-tree
          class="col-12 q-px-lg q-pt-lg"
          tick-strategy="leaf"
          :ticked.sync="ticked"
          :nodes="options"
          node-key="value"
          default-expand-all
          :filter="filter"
          :filter-method="filterMethod"
        />
      </div>
    </q-dialog>
    <q-input
      dense
      standout=""
      readonly
      style="cursor: pointer"
      :value="label"
      @click="show = true"
    >
      <template v-if="not" #append>
        <q-icon :name="inverseIcon" color="negative" />
      </template>
    </q-input>
  </div>
</template>

<script lang="ts">
import { matReplay as inverseIcon } from '@quasar/extras/material-icons'
import type { PropType } from '@vue/composition-api'
import { computed, defineComponent, ref } from '@vue/composition-api'
import difference from 'lodash/difference'

import SelectorInput from '@/admin/src/pages/edit/components/selector-input.vue'
import { getOriginLabels } from '@/shared/src/modules/country-list/country-list-helpers'
import { EEA, EU, SCHENGEN } from '@/shared/src/restriction-tree/misc'

type Node = { label: string; value: string }
export default defineComponent({
  props: {
    value: {
      type: Array as PropType<string[]>,
      required: true,
    },
    not: {
      type: Boolean,
      required: false,
    },
  },
  setup(props, { emit, root }) {
    const show = ref(false)
    const filter = ref('')
    const ticked = computed<string[]>({
      get() {
        return props.value
      },
      set(values) {
        emit('input', values)
      },
    })

    const toggleNegation = computed({
      get() {
        return props.not ?? false
      },
      set(value) {
        emit('update:not', value)
      },
    })

    const originLabels = getOriginLabels()
    const options = Object.entries(getOriginLabels()).reduce<
      Array<{ label: string; value: string }>
    >((acc, [value, label]) => {
      acc.push({ value, label })
      return acc
    }, [])
    const label = computed(() => `${ticked.value.length} selected`)

    const filterMethod = (node: Node, filter: string): boolean =>
      node.label && node.label.toLowerCase().includes(filter.toLowerCase())

    const selectAll = () => {
      ticked.value = Object.keys(originLabels)
    }
    const invertSelection = () => {
      ticked.value = difference(Object.keys(originLabels), ticked.value)
    }
    const deselectAll = () => {
      ticked.value = []
    }

    const selectEU = () => {
      ticked.value.push(...EU)
    }

    const selectEEA = () => {
      ticked.value.push(...EEA)
    }

    const selectSchengen = () => {
      ticked.value.push(...SCHENGEN)
    }

    const openParseDialog = () => {
      root.$q
        .dialog({
          component: SelectorInput,
          value: ticked.value,
        })
        .onOk(({ items }: { items: string[] }) => (ticked.value = items))
    }

    return {
      options,
      show,
      label,
      ticked,
      selectAll,
      deselectAll,
      invertSelection,
      toggleNegation,
      selectEU,
      selectEEA,
      selectSchengen,
      filter,
      filterMethod,
      openParseDialog,
      inverseIcon,
    }
  },
})
</script>
