<template>
  <q-page>
    <div>
      <q-table
        :data="origins.list"
        :loading="!origins.ready"
        :columns="columns"
        :filter="filter"
        row-key="code"
        :pagination="{ rowsPerPage: 0 }"
        separator="cell"
        hide-bottom
        @row-click="goTo"
      >
        <template #header-cell-country="props">
          <q-th :props="props">
            <q-input
              v-model="filter"
              label="Filter by name"
              label-color="grey-6"
              dense
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
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { formatDistanceToNow, isPast, parseISO } from 'date-fns'

import { useOrigins } from 'src/api/origins/use-origin'
import { useRouter } from 'src/composables/use-plugins'
import { Origin } from 'src/models/origin'

export default defineComponent({
  setup() {
    const origins = useOrigins()
    const filter = ref('')
    const selection = ref([])
    return {
      filter,
      origins,
      selection,
      columns: [
        {
          name: 'country',
          label: 'Country',
          field: 'countryLabel',
          align: 'left',
          classes: 'ellipsis',
          headerClasses: 'bg-primary text-white',
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
      ],
      goTo: async (event: unknown, origin: Origin) => {
        await useRouter().push({
          name: 'admin-country',
          params: {
            originCode: origin.countryCode,
          },
        })
      },
    }
  },
})
</script>
