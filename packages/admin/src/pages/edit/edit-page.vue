<template>
  <q-page>
    <portal to="header">
      <q-toolbar>
        <q-btn
          color="blue-grey-5"
          unelevated
          label="Back"
          :to="{ name: 'admin-index' }"
        />
        <q-toolbar-title>
          Destination: <b> {{ getLabelForCountryCode(originCode) }}</b>
        </q-toolbar-title>
        <q-space />
        <q-btn
          color="blue-grey-8"
          unelevated
          label="Parse list"
          @click="openParseDialog"
        />
      </q-toolbar>
    </portal>

    <div class="column full-height">
      <restriction-table
        class="col"
        :restrictions="restrictions.list"
        :loading="restrictions.loading"
        :selected.sync="selected"
      />
      <table-header
        v-model="selected"
        class="col-auto items-start"
        :restrictions="restrictions.list"
        :destination-code="originCode"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { Portal } from 'portal-vue'

import SelectorInput from '@/admin/src/pages/edit/components/selector-input.vue'
import TableHeader from '@/admin/src/pages/edit/components/table-header.vue'
import RestrictionTable from '@/admin/src/pages/edit/components/table.vue'
import { useRestrictionListFilteredByDestination } from '@/shared/src/api/restrictions/composables'
import { Restriction } from '@/shared/src/api/restrictions/models'
import { getLabelForCountryCode } from '@/shared/src/modules/country-list/country-list-helpers'

export default defineComponent({
  components: {
    TableHeader,
    RestrictionTable,
    Portal,
  },
  props: {
    originCode: {
      type: String,
      required: true,
    },
  },
  setup(props, { root }) {
    const originCode = props.originCode
    const tab = ref('table')
    const selected = ref<Restriction[]>([])

    const restrictions = useRestrictionListFilteredByDestination(originCode)

    const openParseDialog = () => {
      root.$q
        .dialog({
          component: SelectorInput,
          value: selected.value,
          restrictions: restrictions.list.value,
        })
        .onOk(({ items }: { items: Restriction[] }) => (selected.value = items))
    }

    return {
      openParseDialog,
      getLabelForCountryCode,
      tab,
      selected,
      restrictions,
    }
  },
})
</script>
