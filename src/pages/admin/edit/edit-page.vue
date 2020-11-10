<template>
  <q-page>
    <q-table
      :data="restrictions.list"
      :columns="columns"
      :row-key="(destination) => destination.countryCode"
      :filter="filter"
      :loading="restrictions.loading"
      :class="[$style.table]"
      flat
      separator="cell"
      :pagination="{ rowsPerPage: 15 }"
      :virtual-scroll-slice-size="10"
      :virtual-scroll-item-size="52"
    >
      <template #top>
        <table-header :destination-code="originCode" />
      </template>
      <template v-if="!filter" #top-row>
        <q-tr class="top-row">
          <q-td colspan="2"> Mass actions </q-td>
          <q-td>
            <test-required
              @input="updateAllRestrictions('testRequired', $event)"
            />
          </q-td>
          <q-td>
            <test-required
              @input="updateAllRestrictions('insuranceRequired', $event)"
            />
          </q-td>
          <q-td>
            <self-isolate
              confirm
              @input="updateAllRestrictions('selfIsolation', $event)"
            />
          </q-td>
          <q-td>
            <test-required
              @input="updateAllRestrictions('isForbidden', $event)"
            />
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
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </q-th>
      </template>

      <template #body="props">
        <q-tr
          :props="props"
          :class="[{ 'is-forbidden': props.row.isForbidden }]"
        >
          <q-td key="country" :props="props">
            {{ props.row.originLabel }}
          </q-td>
          <q-td key="code" :props="props">
            {{ props.row.origin }}
          </q-td>
          <q-td key="testRequired" :props="props">
            <test-required
              :value="props.row.testRequired"
              @input="updateOneRestriction('testRequired', $event, props.row)"
            />
          </q-td>
          <q-td key="insuranceRequired" :props="props">
            <test-required
              :value="props.row.insuranceRequired"
              @input="
                updateOneRestriction('insuranceRequired', $event, props.row)
              "
            />
          </q-td>

          <q-td key="selfIsolation" :props="props">
            <self-isolate
              :value="props.row.selfIsolation"
              @input="updateOneRestriction('selfIsolation', $event, props.row)"
            />
          </q-td>
          <q-td key="isForbidden" :props="props">
            <test-required
              :value="props.row.isForbidden"
              @input="updateOneRestriction('isForbidden', $event, props.row)"
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

  :global(.is-forbidden) {
    background-color: #c1001536;
  }
}
</style>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

import {
  useRestrictionCollectionPersister,
  useRestrictionListFilteredByDestination,
  useRestrictionPersister,
} from 'src/api/restrictions/composables'
import InputDate from 'src/components/input-date.vue'
import InPlaceField from 'src/pages/admin/edit/components/in-place-field.vue'
import SelfIsolate from 'src/pages/admin/edit/components/self-isolate.vue'
import StatusInput from 'src/pages/admin/edit/components/status-input.vue'
import TableHeader from 'src/pages/admin/edit/components/table-header.vue'
import TestRequired from 'src/pages/admin/edit/components/test-required.vue'

export default defineComponent({
  components: {
    SelfIsolate,
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

    const restrictions = useRestrictionListFilteredByDestination(originCode)
    const updateOneRestriction = useRestrictionPersister()
    const updateAllRestrictions = useRestrictionCollectionPersister(
      restrictions.list,
    )

    return {
      filter,
      restrictions,
      updateOneRestriction,
      updateAllRestrictions,
      columns: [
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
        },
      ],
    }
  },
})
</script>
