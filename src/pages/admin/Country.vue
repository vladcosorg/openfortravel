<template>
  <q-page>
    <div class="qq-pa-md">
      <q-table
        :data="destinations"
        :columns="columns"
        :row-key="(destination) => destination.countryCode"
        :filter="filter"
        :loading="isLoading"
        :class="$style.table"
        flat
        separator="cell"
        :pagination="{ rowsPerPage: 25 }"
      >
        <template v-slot:top-right>
          <q-input
            v-model="filter"
            outlined
            dense
            debounce="300"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="country" :props="props">
              {{ props.row.countryLabel }}
            </q-td>
            <q-td key="code" :props="props">
              {{ props.row.countryCode }}
            </q-td>
            <q-td key="notes" :props="props">
              {{ props.row.notes }}
              <q-popup-edit
                v-model="props.row.notes"
                max-width="40px"
                @save="saveValue('notes', $event, props.row.countryCode)"
              >
                <q-input
                  v-model="props.row.notes"
                  dense
                  autofocus
                  type="textarea"
                />
              </q-popup-edit>
            </q-td>
            <q-td key="status" :props="props">
              {{
                {
                  allowed: $t('allowed'),
                  conditional: $t('conditional'),
                  forbidden: $t('forbidden'),
                }[props.row.status]
              }}
              <q-popup-edit
                v-model="props.row.status"
                auto-save
                @save="saveValue('status', $event, props.row.countryCode)"
              >
                <q-radio
                  v-model="props.row.status"
                  val="allowed"
                  :label="$t('allowed')"
                />
                <q-radio
                  v-model="props.row.status"
                  val="conditional"
                  :label="$t('conditional')"
                />
                <q-radio
                  v-model="props.row.status"
                  val="forbidden"
                  :label="$t('forbidden')"
                />
              </q-popup-edit>
            </q-td>
            <q-td key="testRequired" :props="props">
              <q-checkbox
                v-model="props.row.testRequired"
                @input="
                  saveValue('testRequired', $event, props.row.countryCode)
                "
              />
            </q-td>
          </q-tr>
        </template>
        <template v-slot:top-left>
          <div class="text-h6">
            Страны из которых разрешен въезд в {{ hostCountryName }}
          </div>
          <router-link :to="{ name: 'admin-index' }">
            К списку стран
          </router-link>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<style lang="scss" module>
.table {
  :global .q-table__top {
    background-color: #00ffbb;
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
import { defineComponent, onMounted, ref } from '@vue/composition-api'
import { convertToDestonation, Destination } from 'src/api/Destinations'
import { getLabelForCountryCode } from 'src/misc/I18nCountryList'
import { generateDestinationList } from 'src/repositories/CountryDestinations'

export default defineComponent({
  props: {
    originCode: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const hostCountry = props.originCode
    const destinations = ref<Destination[]>([])
    const filter = ref('')
    const isLoading = ref(false)

    onMounted(async () => {
      const plainDestinations = await generateDestinationList(hostCountry)
      const destinations.value = plainDestinations.map(
        (plainDestination) => new Destination(plainDestination),
      )
    })

    async function saveValue() {
      // field: string,
      // value: string,
      // destinationISO: string,
      // isLoading.value = true
      // await saveCountryDestination(
      //   { [field]: value },
      //   useRoute().params.country,
      //   destinationISO,
      // ).then(() => {
      //   isLoading.value = false
      // })
    }

    return {
      filter,
      isLoading,
      hostCountryName: getLabelForCountryCode(hostCountry),
      destinations,
      saveValue,
      columns: [
        {
          name: 'country',
          label: 'Страна',
          field: 'countryLabel',
          align: 'left',
          classes: 'bg-grey-9 ellipsis',
          style: 'max-width: 100px',
        },
        {
          name: 'code',
          label: 'Код страны',
          field: 'countryCode',
          headerStyle: 'width: 50px',
        },
        {
          name: 'notes',
          label: 'Заметки',
          field: 'notes',
        },
        {
          name: 'status',
          label: 'Статус',
          field: 'status',
        },
        {
          name: 'testRequired',
          label: 'Тест обязателен',
          field: 'testRequired',
        },
      ],
    }
  },
})
</script>
