<template>
  <q-page>
    <q-table
      :data="destinations.list"
      :columns="columns"
      :row-key="(destination) => destination.countryCode"
      :filter="filter"
      :loading="destinations.loading"
      :class="[$style.table]"
      flat
      separator="cell"
      :pagination="{ rowsPerPage: 15 }"
      :virtual-scroll-slice-size="10"
      :virtual-scroll-item-size="52"
    >
      <template #top>
        <table-header v-model="filter" :origin-code="originCode" />
      </template>
      <template #top-row>
        <q-tr class="top-row">
          <q-td colspan="2"> Mass actions </q-td>
          <q-td>
            <test-required
              @input="
                destinations.persistAllFieldValues('testRequired', $event)
              "
            />
          </q-td>
          <q-td>
            <status-input
              @input="destinations.persistAllFieldValues('status', $event)"
            />
          </q-td>
        </q-tr>
      </template>

      <template #body="props">
        <q-tr :props="props">
          <q-td key="country" :props="props">
            {{ props.row.countryLabel }}
          </q-td>
          <q-td key="code" :props="props">
            {{ props.row.countryCode }}
          </q-td>
          <q-td key="testRequired" :props="props">
            <test-required
              :value="props.row.testRequired"
              @input="
                destinations.persistOneFieldValue(
                  'testRequired',
                  $event,
                  props.row.countryCode,
                )
              "
            />
          </q-td>
          <q-td key="status" :props="props">
            <status-input
              :value="props.row.status"
              @input="
                destinations.persistOneFieldValue(
                  'status',
                  $event,
                  props.row.countryCode,
                )
              "
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<style lang="scss" module>
.table {
  height: 100%;

  thead {
    background-color: $blue-grey-9;

    th {
      font-weight: bold;
      font-size: 0.9rem;
    }
  }

  :global(.top-row) {
    background-color: $blue-grey-9;
  }
}
</style>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import InputDate from 'components/input-date.vue'
import InPlaceField from 'pages/admin/in-place-field.vue'
import StatusInput from 'pages/admin/status-input.vue'
import TableHeader from 'pages/admin/table-header.vue'
import TestRequired from 'pages/admin/test-required.vue'

import { useOriginDestinations } from 'src/composables/use-origin-destinations'

export default defineComponent({
  components: {
    InPlaceField,
    InputDate,
    StatusInput,
    TableHeader,
    TestRequired,
  },
  props: {
    originCode: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const originCode = props.originCode
    const filter = ref('')

    const destinations = useOriginDestinations(originCode)

    return {
      filter,
      destinations,
      columns: [
        {
          name: 'country',
          label: 'Country',
          field: 'countryLabel',
          align: 'left',
          classes: 'bg-grey-9 ellipsis',
          headerStyle: 'width: 109px',
        },
        {
          name: 'code',
          label: 'Country Code',
          field: 'countryCode',
          headerStyle: 'width: 50px',
        },
        {
          name: 'testRequired',
          label: 'Test required',
          field: 'testRequired',
          headerStyle: 'width: 50px',
        },
        {
          name: 'status',
          label: 'Status',
          field: 'status',
          align: 'left',
        },
      ],
    }
  },
})
</script>
