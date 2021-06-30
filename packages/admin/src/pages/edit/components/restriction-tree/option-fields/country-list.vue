<template>
  <div>
    <q-dialog
      v-model="show"
      full-height
      full-width
      class=""
      transition-show=""
      transition-hide=""
    >
      <div class="bg-dark column">
        <q-bar>
          <q-space />
          <q-btn v-close-popup dense flat icon="close" />
        </q-bar>
        <div class="q-pt-lg q-pl-lg q-pb-none q-gutter-md">
          <q-btn-group>
            <q-btn
              color="grey-8"
              unelevated
              label="Invert"
              @click="invertSelection"
            />
            <q-btn
              color="grey-8"
              unelevated
              label="Deselect All"
              @click="deselectAll"
            />
            <q-btn
              color="grey-8"
              unelevated
              label="Select All"
              @click="selectAll"
            />
          </q-btn-group>
          <q-btn-group>
            <q-btn color="grey-8" unelevated label="EU" @click="selectEU" />
            <q-btn color="grey-8" unelevated label="EEA" @click="selectEEA" />
            <q-btn
              color="grey-8"
              unelevated
              label="EEA + Sw"
              @click="selectEEAS"
            />
            <q-btn
              color="grey-8"
              unelevated
              label="EEA without Schengen"
              @click="selectEEAWithoutSchengen"
            />
            <q-btn
              color="grey-8"
              unelevated
              label="SH"
              @click="selectSchengen"
            />
          </q-btn-group>
          <q-btn-group>
            <q-btn
              color="grey-8"
              unelevated
              label="Parse"
              @click="openParseDialog"
            />
          </q-btn-group>
          <div class="row col-6">
            <q-input
              v-model="filter"
              placeholder="Filter"
              class="col-6"
              standout=""
              dense
            />
            <q-checkbox v-model="toggleNegation" class="col" label="Negate" />
          </div>
        </div>

        <div class="col overflow-auto q-pa-md">
          <q-tree
            :class="$style.columnList"
            tick-strategy="leaf"
            :ticked.sync="ticked"
            :nodes="options"
            node-key="value"
            default-expand-all
            :filter="filter"
            :filter-method="filterMethod"
          />
        </div>

        <div class="bg-blue-grey-9 col-1 overflow-auto q-pa-md">
          Selected
          <b>{{ ticked.length }}</b
          >:
          {{ selectedLabels }}
        </div>
      </div>
    </q-dialog>
    <q-input
      dense
      standout=""
      readonly
      stack-label
      :label="hint"
      style="cursor: pointer"
      :value="compoundLabel"
      @click="show = true"
    >
      <template #after>
        <q-btn icon="edit" flat="" @click="show = true"
          ><q-tooltip>Edit</q-tooltip></q-btn
        >
      </template>
    </q-input>
  </div>
</template>

<style module>
.columnList {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: 1fr;
  grid-gap: 5px;
}

.columnList :global(.q-tree__node-header) {
  padding: 0 !important;
}

.columnList > div {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

<script lang="ts">
import type { PropType } from '@vue/composition-api'
import { computed, defineComponent, ref } from '@vue/composition-api'
import difference from 'lodash/difference'
import union from 'lodash/union'

import SelectorInput from '@/admin/src/pages/edit/components/selector-input.vue'
import {
  getLabelsForCountryCodes,
  getOriginLabels,
} from '@/shared/src/modules/country-list/country-list-helpers'
import { EEA, EU, SCHENGEN } from '@/shared/src/restriction-tree/misc'

type Node = { label: string; value: string }
export default defineComponent({
  inheritAttrs: false,
  props: {
    value: {
      type: Array as PropType<string[]>,
      required: true,
    },
    not: {
      type: Boolean,
      required: false,
    },
    label: {
      type: String,
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
    const hint = computed(() => {
      if (props.not) {
        return ` ${options.length - ticked.value.length} countries selected`
      }

      return ` ${ticked.value.length} countries selected`
    })

    const compoundLabel = computed(() => {
      if (ticked.value.length === 0) {
        return `${props.label}: No countries selected, click to select`
      }

      const labels = getLabelsForCountryCodes(ticked.value).join(', ')
      if (props.not) {
        return `${props.label}:  All countries except ${labels}`
      }
      return `${props.label}: ${labels}`
    })

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
      ticked.value = union(ticked.value, EU)
    }

    const selectEEA = () => {
      ticked.value = union(ticked.value, EEA)
    }
    const selectEEAS = () => {
      ticked.value = union(ticked.value, EEA, ['ch'])
    }
    const selectEEAWithoutSchengen = () => {
      ticked.value = union(ticked.value, difference(EEA, SCHENGEN))
    }

    const selectSchengen = () => {
      ticked.value = union(ticked.value, SCHENGEN)
    }

    const openParseDialog = () => {
      root.$q
        .dialog({
          component: SelectorInput,
          value: ticked.value,
        })
        .onOk(({ items }: { items: string[] }) => (ticked.value = items))
    }

    const selectedLabels = computed(() =>
      getLabelsForCountryCodes(ticked.value)
        .sort((a, b) => a.localeCompare(b))
        .join(', '),
    )

    return {
      selectedLabels,
      options,
      show,
      compoundLabel,
      hint,
      ticked,
      selectAll,
      deselectAll,
      invertSelection,
      toggleNegation,
      selectEU,
      selectEEA,
      selectEEAS,
      selectEEAWithoutSchengen,
      selectSchengen,
      filter,
      filterMethod,
      openParseDialog,
    }
  },
})
</script>
