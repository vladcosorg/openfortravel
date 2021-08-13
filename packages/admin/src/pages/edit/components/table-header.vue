<template>
  <div class="row q-col-gutter-lg q-ma-md wrap">
    <in-place-field
      label="Best by date"
      :value="destination.bestByDate"
      :loading="loading"
      class="col-12"
      @input="updateField('bestByDate', $event)"
    >
      <template #edit="{ label, loading, value, updateValue }">
        <input-date
          v-bind="{ label, loading, value }"
          @input="updateValue($event)"
        />
      </template>
    </in-place-field>

    <q-input
      :value="destination.infoLink"
      type="textarea"
      class="col-12"
      label="Info URL"
      :loading="loading"
      outlined
      debounce="2000"
      @input="updateField('infoLink', $event)"
    />

    <q-input
      :value="destination.internalInfo"
      type="textarea"
      class="col-12"
      label="Internal info"
      :loading="loading"
      debounce="2000"
      outlined
      @input="updateField('internalInfo', $event)"
    />

    <test-required
      class="col-3"
      label="Mask restrictions"
      :value="destination.maskRestrictions"
      :options="[
        { label: 'In public places', value: 'public' },
        { label: 'Enclosed', value: 'public-enclosed' },
        { label: 'Not required', value: undefined },
      ]"
      @input="updateField('maskRestrictions', $event)"
    />
    <test-required
      class="col-3"
      label="Restauran restrictions"
      :value="destination.restaurantRestrictions"
      :options="[
        { label: 'Closed', value: 'closed' },
        { label: 'Open with restrictions', value: 'open-with-restrictions' },
        { label: 'None', value: undefined },
      ]"
      @input="updateField('restaurantRestrictions', $event)"
    />
    <test-required
      class="col-3"
      label="Restauran restrictions"
      :value="destination.barRestrictions"
      :options="[
        { label: 'Closed', value: 'closed' },
        { label: 'Open with restrictions', value: 'open-with-restrictions' },
        { label: 'None', value: undefined },
      ]"
      @input="updateField('barRestrictions', $event)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import InPlaceField from '@/admin/src/pages/edit/components/in-place-field.vue'
import InputDate from '@/admin/src/pages/edit/components/input-date.vue'
import TestRequired from '@/admin/src/pages/edit/components/test-required.vue'
import type { Destination } from '@/shared/src/api/destinations/models'

import type { PropType } from 'vue'

export default defineComponent({
  components: { InPlaceField, InputDate, TestRequired },
  inheritAttrs: false,
  model: {
    prop: 'destination',
  },
  props: {
    destination: {
      type: Object as PropType<Destination>,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  setup(_props, { emit }) {
    const updateField = (fieldName: string, fieldValue: unknown) => {
      emit('input', {
        [fieldName]: fieldValue,
      })
    }

    return {
      updateField,
    }
  },
})
</script>
