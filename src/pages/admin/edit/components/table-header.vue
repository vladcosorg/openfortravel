<template>
  <div class="row full-width">
    <div class="column items-center col-12">
      <div class="text-h6">Страны из которых разрешен въезд в {{ hostCountryName }}</div>
      <router-link class="text-h6" :to="{ name: 'admin-index' }"> К списку стран </router-link>
    </div>
    <div class="col-12 row q-gutter-md">
      <in-place-field
        class="col-6"
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
        class="col-6"
        @input="origin.updateField('bestByDate', $event)"
      >
        <template #edit="{ label, loading, value, updateValue }">
          <input-date v-bind="{ label, loading, value }" @input="updateValue($event)" />
        </template>
      </in-place-field>
      <test-required
        class="col-6"
        label="Is health declaration required?"
        :value="origin.state.isHealthDeclarationRequired"
        stack-label
        @input="origin.updateField('isHealthDeclarationRequired', $event)"
      />
      <in-place-field
        v-if="origin.state.isHealthDeclarationRequired"
        class="col-3"
        label="Health Declaration Document"
        :value="origin.state.healthDeclarationDocURL"
        :loading="origin.loading"
        @input="origin.updateField('healthDeclarationDocURL', $event)"
      >
        <template #view="{ value }">
          <a :href="value" target="_blank" class="text-white">
            {{ value }}
          </a>
        </template>
      </in-place-field>
    </div>
  </div>
</template>

<style lang="scss" module></style>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { useDestination } from 'src/api/destinations/composables'
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
    const origin = useDestination(originCode, {
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
