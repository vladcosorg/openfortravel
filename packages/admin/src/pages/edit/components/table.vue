<template>
  <q-table
    :data="sortedData"
    :columns="columns"
    row-key="origin"
    :filter="filter"
    selection="multiple"
    :loading="loading"
    :class="$style.table"
    flat
    separator="cell"
    virtual-scroll
    :rows-per-page-options="[0]"
    :selected="selected"
    v-on="$listeners"
  >
    <template #top>
      <stats :restrictions="restrictions" />
    </template>
    <template v-if="selected.length" #bottom>
      <div class="q-gutter-xs" style="max-height: 200px; overflow: scroll">
        {{ selected.length }} items:
        <q-badge
          v-for="restriction in selected"
          :key="restriction.origin"
          text-color="black"
          :label="restriction.originLabel"
        />
      </div>
    </template>
    <template v-if="!filter" #top-row>
      <q-tr class="top-row">
        <q-td colspan="4"> Mass actions </q-td>
        <q-td>
          <test-required @input="persistSelectedOrAll('testRequired', $event)" />
        </q-td>
        <q-td>
          <test-required @input="persistSelectedOrAll('insuranceRequired', $event)" />
        </q-td>
        <q-td>
          <test-required confirm @input="persistSelectedOrAll('selfIsolation', $event)" />
        </q-td>
        <q-td>
          <test-required @input="persistSelectedOrAll('isForbidden', $event)" />
        </q-td>
      </q-tr>
    </template>

    <template #header-cell-country="props">
      <q-th :props="props">
        <q-input
          v-model="filter"
          outlined
          dense
          debounce="300"
          placeholder="Search country"
          @focus="filter = ''"
        >
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-th>
    </template>
    <template #body-cell-testRequired="props">
      <q-td key="testRequired" :props="props" :class="{ 'bg-red-9': props.value }">
        <test-required
          :value="props.value"
          @input="persistOne('testRequired', $event, props.row)"
        />
      </q-td>
    </template>

    <template #body-cell-insuranceRequired="props">
      <q-td key="insuranceRequired" :props="props" :class="{ 'bg-red-9': props.value }">
        <test-required
          :value="props.value"
          @input="persistOne('insuranceRequired', $event, props.row)"
        />
      </q-td>
    </template>

    <template #body-cell-selfIsolation="props">
      <q-td key="selfIsolation" :props="props" :class="{ 'bg-red-9': props.value > 0 }">
        <test-required
          :value="props.value"
          @input="persistOne('selfIsolation', $event, props.row)"
        />
      </q-td>
    </template>

    <template #body-cell-isForbidden="props">
      <q-td key="isForbidden" :props="props" :class="{ 'bg-red-9': props.value }">
        <test-required
          :value="props.value"
          @input="persistOne('isForbidden', $event, props.row)"
        />
      </q-td>
    </template>
  </q-table>
</template>

<style lang="sass" module>
.table
  thead tr:first-child th
    background-color: $blue-grey-9

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
  thead
    background-color: $blue-grey-9

    th
      font-weight: bold
      font-size: 0.9rem


  :global(.top-row)
    background-color: $blue-grey-9

  :global(.q-table__top)
    padding: 0


  :global(.is-forbidden)
    background-color: #c1001536
</style>

<script lang="ts">
import { computed, defineComponent, PropType, ref, toRefs } from '@vue/composition-api'

import Stats from '@/admin/src/pages/edit/components/stats.vue'
import TestRequired from '@/admin/src/pages/edit/components/test-required.vue'
import { useRestrictionPersister } from '@/admin/src/pages/edit/composables/use-persister'
import { AddSaveHandler } from '@/admin/src/pages/edit/edit-page.vue'
import { Restriction } from '@/shared/src/api/restrictions/models'
import {
  getContinentLabel,
  getOrderedListOfContinentIDs,
} from '@/shared/src/modules/continent-map/continent-map-helpers'
import { loadContinentMap } from '@/shared/src/modules/continent-map/ssr-loader'
import { getLabelForCountryCode } from '@/shared/src/modules/country-list/country-list-helpers'

export default defineComponent({
  components: {
    Stats,
    TestRequired,
  },
  props: {
    restrictions: {
      type: Array as PropType<Restriction[]>,
      required: true,
    },
    selected: {
      type: Array as PropType<Restriction[]>,
      required: true,
    },
    loading: {
      type: Boolean,
    },
    addSaveHandler: {
      type: Function as PropType<AddSaveHandler>,
      required: true,
    },
  },
  setup(props) {
    const continents = loadContinentMap()
    const filter = ref('')
    const tab = ref('table')
    const { restrictions, selected } = toRefs(props)

    const sortedData = computed(() => {
      const continentMap = loadContinentMap()
      const continentIDs = getOrderedListOfContinentIDs()

      return [...props.restrictions].sort(
        (a, b) =>
          continentIDs.indexOf(continentMap[b.origin]) -
          continentIDs.indexOf(continentMap[a.origin]),
      )
    })

    const persister = useRestrictionPersister(restrictions, props.addSaveHandler, selected)

    return {
      persister,
      sortedData,
      getLabelForCountryCode,
      tab,
      filter,

      columns: [
        {
          name: 'continent',
          label: 'Continent',
          field: (row: Restriction) => continents[row.origin],
          format: (continentID: string) => getContinentLabel(continentID),
          align: 'left',
          classes: 'ellipsis',
          style: 'width: 150px',
        },
        {
          name: 'country',
          label: 'Country',
          field: 'originLabel',
          align: 'left',
          classes: 'bg-grey-9 ellipsis',
          headerStyle: 'width: 200px',
        },
        {
          name: 'code',
          label: 'Country Code',
          field: 'origin',
          headerStyle: 'width: 50px',
          sortable: true,
        },
        {
          name: 'testRequired',
          label: 'Test required',
          field: 'testRequired',
          headerStyle: 'width: 50px',
        },
        {
          name: 'insuranceRequired',
          label: 'Insurance required',
          field: 'insuranceRequired',
          headerStyle: 'width: 50px',
        },

        {
          name: 'selfIsolation',
          label: 'Self-isolation',
          field: 'selfIsolation',
          align: 'left',
          headerStyle: 'width: 250px',
        },
        {
          name: 'isForbidden',
          label: 'Is Forbidden',
          field: 'isForbidden',
          align: 'left',
          sortable: true,
        },
      ],
      ...persister,
    }
  },
})
</script>
