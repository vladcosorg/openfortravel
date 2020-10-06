<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        :data="data"
        :columns="columns"
        row-key="code"
        :pagination="{ rowsPerPage: 0 }"
        separator="cell"
        hide-bottom
        @row-click="goTo"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { getCountryMap } from 'src/misc/I18nCountryList'
import { useRouter } from 'src/composables/use-plugins'

interface CountryPair {
  country: string
  code: string
}

export default defineComponent({
  setup() {
    return {
      columns: [
        {
          name: 'country',
          label: 'Country',
          field: 'country',
          align: 'left',
          classes: 'ellipsis',
          headerClasses: 'bg-primary text-white',
        },
        {
          name: 'code',
          label: 'Country code',
          field: 'code',
          align: 'left',
        },
        {
          name: 'edit',
          label: 'Edit',
          field: 'edit',
          align: 'right',
        },
      ],
      data: getCountryData(),
      goTo: async (event: unknown, country: CountryPair) => {
        console.log(country)
        await useRouter().push({
          name: 'admin-country',
          params: {
            originCode: country.code,
          },
        })
      },
    }
  },
})

function getCountryData(): CountryPair[] {
  const output = []

  for (const [code, country] of Object.entries(getCountryMap())) {
    output.push({
      code,
      country,
    })
  }
  return output
}
</script>
