<template>
  <q-page>
    <q-table
      :data="destinations"
      :columns="columns"
      :row-key="(destination) => destination.countryCode"
      :filter="filter"
      :loading="destinationsLoading"
      :class="$style.table"
      flat
      separator="cell"
      :pagination="{ rowsPerPage: 25 }"
      :virtual-scroll="false"
    >
      <template #top>
        <table-header v-model="filter" :origin-code="originCode" />
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
              @input="updateValue('testRequired', $event, props.row)"
            />
          </q-td>
          <q-td key="status" :props="props">
            <status-input
              :value="props.row.status"
              @input="updateValue('status', $event, props.row)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<style lang="scss" module>
.table {
  :global .q-table__top {
    //background-color: #00ffbb;
  }

  thead {
    background-color: $blue-grey-9;

    th {
      font-weight: bold;
      font-size: 0.9rem;
    }
  }
}
</style>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import InputDate from 'components/InputDate.vue'
import InPlaceField from 'pages/admin/InPlaceField.vue'
import StatusInput from 'pages/admin/StatusInput.vue'
import TableHeader from 'pages/admin/TableHeader.vue'
import TestRequired from 'pages/admin/TestRequired.vue'
import { Destination, PlainDestination } from 'src/api/Destinations'
import { useDestinationList } from 'src/composables/use-destination-list'
import { useOrigin } from 'src/composables/use-origin'

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

    const origin = useOrigin(originCode, {
      countryCode: 'Loading',
      reference: 'Loading',
    })

    const {
      state: destinations,
      saveValue,
      ready: destinationsLoading,
    } = useDestinationList(originCode)

    async function updateValue<
      K extends keyof PlainDestination,
      V extends PlainDestination[K]
    >(field: K, value: V, destination: Destination) {
      destination[field] = value
      await saveValue('status', value, destination.countryCode)
    }

    return {
      origin,
      filter,
      destinationsLoading,
      destinations,
      saveValue,
      updateValue,
      columns: [
        {
          name: 'country',
          label: 'Страна',
          field: 'countryLabel',
          align: 'left',
          classes: 'bg-grey-9 ellipsis',
          headerStyle: 'width: 109px',
        },
        {
          name: 'code',
          label: 'Код страны',
          field: 'countryCode',
          headerStyle: 'width: 50px',
        },
        {
          name: 'testRequired',
          label: 'Тест обязателен',
          field: 'testRequired',
          headerStyle: 'width: 50px',
        },
        {
          name: 'status',
          label: 'Статус',
          field: 'status',
        },
      ],
    }
  },
})
</script>
