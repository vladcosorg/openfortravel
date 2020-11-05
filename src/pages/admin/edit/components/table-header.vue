<template>
  <div class="row full-width">
    <div class="column items-center col-12">
      <div class="text-h6">Страны из которых разрешен въезд в {{ hostCountryName }}</div>
      <router-link class="text-h6" :to="{ name: 'admin-index' }">
        К списку стран
      </router-link>
    </div>
    <div class="col-12 row q-gutter-md">
      <in-place-field
        class="col-3"
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
        class="col-3"
        @input="origin.updateField('bestByDate', $event)"
      >
        <template #edit="{ label, loading, value, updateValue }">
          <input-date v-bind="{ label, loading, value }" @input="updateValue($event)" />
        </template>
      </in-place-field>
    </div>
  </div>
</template>

<style lang="scss" module></style>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { useOrigin } from 'src/api/origins/use-origin'
import InputDate from 'src/components/input-date.vue'
import { getLabelForCountryCode } from 'src/misc/country-list'
import InPlaceField from 'src/pages/admin/edit/components/in-place-field.vue'
import TestRequired from 'src/pages/admin/edit/components/test-required.vue'


export default defineComponent({
  components: { InPlaceField, InputDate, TestRequired },
  props: {
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
    return {
      origin,
      hostCountryName: getLabelForCountryCode(originCode),
    }
  },
})
</script>
