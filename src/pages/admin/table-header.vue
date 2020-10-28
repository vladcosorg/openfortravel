<template>
  <div class="row full-width">
    <div class="column items-center col-12">
      <div class="text-h6">
        Страны из которых разрешен въезд в {{ hostCountryName }}
      </div>
      <router-link class="text-h6" :to="{ name: 'admin-index' }">
        К списку стран
      </router-link>
    </div>
    <div class="col-6 column q-gutter-md">
      <in-place-field
        label="Info URL"
        :value="origin.state.infoLink"
        :loading="origin.loading"
        @input="origin.updateField('infoLink', $event)"
      >
        <template #view="{ value }">
          <a :href="value" target="_blank" class="text-white">
            {{ value }}
          </a>
        </template>
      </in-place-field>

      <in-place-field
        label="Best by date"
        :value="origin.state.bestByDate"
        :loading="origin.loading"
        @input="origin.updateField('bestByDate', $event)"
      >
        <template #edit="{ label, loading, value, updateValue }">
          <input-date
            v-bind="{ label, loading, value }"
            @input="updateValue($event)"
          />
        </template>
      </in-place-field>
    </div>
    <div class="col-6 column justify-end items-end justify-end">
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
    </div>
  </div>
</template>

<style lang="scss" module></style>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import InputDate from 'components/input-date.vue'
import InPlaceField from 'pages/admin/in-place-field.vue'
import TestRequired from 'pages/admin/test-required.vue'

import { useComputedVmodel } from 'src/composables/use-computed-vmodel'
import { useOrigin } from 'src/composables/use-origin'
import { getLabelForCountryCode } from 'src/misc/country-list'

export default defineComponent({
  components: { InPlaceField, InputDate, TestRequired },
  props: {
    value: {
      type: String,
      required: true,
    },
    originCode: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const originCode: string = props.originCode
    const origin = useOrigin(originCode, {
      countryCode: 'Loading',
      reference: 'Loading',
    })
    const filter = useComputedVmodel(props.value)
    return {
      origin,
      hostCountryName: getLabelForCountryCode(originCode),
      filter,
    }
  },
})
</script>
