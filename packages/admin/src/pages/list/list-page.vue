<template>
  <q-page>
    <q-table
      :class="$style.table"
      style="height: 100%"
      :data="destinations.list"
      :loading="!destinations.ready"
      :columns="columns"
      :filter="filter"
      row-key="code"
      :pagination="{ rowsPerPage: 0 }"
      separator="cell"
      hide-bottom
      table-header-class="bg-grey-9"
      virtual-scroll
      :rows-per-page-options="[0]"
      @row-click="goTo"
    >
      <template #header-cell-country="props">
        <q-th :props="props">
          <q-input
            v-model="filter"
            placeholder="Filter by name"
            dense
            filled
            autofocus
          />
        </q-th>
      </template>
      <template #body-cell-bestByDate="props">
        <q-td :props="props">
          <q-badge
            v-if="props.value && props.value.expired"
            color="negative"
            :label="props.value.text"
          />
          <q-badge
            v-if="props.value && !props.value.expired"
            color="positive"
            :label="props.value.text"
          />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<style lang="sass" module>
.table
  height: 100%
  thead tr:first-child th
    background-color: $blue-grey-9

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0
</style>

<script lang="ts">
import { formatDistanceToNow, isPast, parseISO } from 'date-fns'
import { Timestamp } from 'firebase/firestore'
import { defineComponent, ref } from 'vue'

import { useDestinations } from '@/shared/src/api/destinations/composables'
import type { Destination } from '@/shared/src/api/destinations/models'
import { useRouter } from '@/shared/src/composables/use-plugins'
import { getContinentLabel } from '@/shared/src/modules/continent-map/continent-map-helpers'
import { loadContinentMap } from '@/shared/src/modules/continent-map/ssr-loader'

export default defineComponent({
  name: 'List',
  setup() {
    const continents = loadContinentMap()
    const destinations = useDestinations()
    const filter = ref('')
    const selection = ref([])
    return {
      filter,
      destinations,
      selection,
      columns: [
        {
          name: 'continent',
          label: 'Continent',
          field: (row: Destination) => continents[row.countryCode],
          format: (continentID: string) => getContinentLabel(continentID),
          align: 'left',
          classes: 'ellipsis',
          headerClasses: 'bg- text-white',
        },
        {
          name: 'country',
          label: 'Country',
          field: 'name',
          align: 'left',
          classes: 'ellipsis',
          headerClasses: 'bg- text-white',
        },
        {
          name: 'code',
          label: 'Country code',
          field: 'countryCode',
          align: 'left',
        },
        {
          name: 'bestByDate',
          label: 'Expiration date',
          field: 'bestByDate',
          align: 'right',
          format: (date?: string) => {
            if (date) {
              const dateObject = parseISO(date)
              return {
                text: formatDistanceToNow(dateObject, { addSuffix: true }),
                expired: isPast(dateObject),
              }
            }
            return
          },
        },
        {
          name: 'lastUpdated',
          label: 'Last updated',
          field: 'lastUpdated',
          align: 'left',
          format: (date?: Timestamp) => {
            if (date) {
              const dateObject = date.toDate()
              return formatDistanceToNow(dateObject, { addSuffix: true })
            }
            return 'never'
          },
        },
      ],
      goTo: async (_event: unknown, destination: Destination) => {
        await useRouter().push({
          name: 'admin-country',
          params: {
            originCode: destination.countryCode,
          },
        })
      },
    }
  },
})
</script>
