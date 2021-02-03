<template>
  <div class="row">
    <div class="row col-12 q-ma-md">
      <div class="col row q-col-gutter-md">
        <in-place-field
          class="col-6"
          label="Info URL"
          :value="destination.infoLink"
          :loading="loading"
          @input="updateField('infoLink', $event)"
        >
          <template #view="{ value }">
            <a :href="value" target="_blank" class="text-white">
              {{ value }}
            </a>
          </template>
        </in-place-field>

        <in-place-field
          label="Best by date"
          :value="destination.bestByDate"
          :loading="loading"
          class="col-6"
          @input="updateField('bestByDate', $event)"
        >
          <template #edit="{ label, loading, value, updateValue }">
            <input-date
              v-bind="{ label, loading, value }"
              @input="updateValue($event)"
            />
          </template>
        </in-place-field>
        <test-required
          class="col-3"
          label="Is health declaration required?"
          :value="destination.isHealthDeclarationRequired"
          @input="updateField('isHealthDeclarationRequired', $event)"
        />
        <in-place-field
          v-if="destination.isHealthDeclarationRequired"
          class="col-3"
          label="Health Declaration Document"
          :value="destination.healthDeclarationDocURL"
          :loading="loading"
          @input="updateField('healthDeclarationDocURL', $event)"
        >
          <template #view="{ value }">
            <a :href="value" target="_blank" class="text-white ellipsis">
              {{ value }}
            </a>
          </template>
        </in-place-field>
        <q-input
          class="col-3"
          label="Test validity in hours"
          :value="destination.testValidityInHours"
          type="number"
          min="0"
          outlined
          :debounce="1000"
          :loading="loading"
          @input="updateField('testValidityInHours', $event)"
        />
        <q-input
          class="col-3"
          label="Self isolation in days"
          :value="destination.selfIsolationInDays"
          type="number"
          min="0"
          outlined
          :debounce="1000"
          :loading="loading"
          @input="updateField('selfIsolationInDays', $event)"
        />
        <q-input
          class="col-3"
          label="Proof of recovery accepted instead of PCR test"
          :value="destination.proofOfRecoveryInDays"
          type="number"
          min="0"
          outlined
          :debounce="1000"
          :loading="loading"
          @input="updateField('proofOfRecoveryInDays', $event)"
        />
        <q-checkbox
          class="col-3"
          label="Test on arrival available"
          :value="destination.testOnArrival"
          :loading="loading"
          @input="updateField('testOnArrival', $event)"
        />
      </div>
      <div class="col row">
        <in-place-field
          class="col-12"
          label="Internal info"
          :value="destination.internalInfo"
          :loading="loading"
          @input="updateField('internalInfo', $event)"
        >
          <template #edit="{ label, loading, value, updateVmodel }">
            <q-input
              type="textarea"
              filled
              v-bind="{ label, loading, value }"
              @input="updateVmodel($event)"
            />
          </template>
          <template #view="{ value }">
            <pre> {{ value }}</pre>
          </template>
        </in-place-field>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import InPlaceField from '@/admin/src/pages/edit/components/in-place-field.vue'
import InputDate from '@/admin/src/pages/edit/components/input-date.vue'
import TestRequired from '@/admin/src/pages/edit/components/test-required.vue'
import { useDestination } from '@/shared/src/api/destinations/composables'

export default defineComponent({
  components: { InPlaceField, InputDate, TestRequired },
  inheritAttrs: false,
  props: {
    destinationCode: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { destinationRef, loadingRef, updateField } = useDestination(
      props.destinationCode,
    )

    return {
      destination: destinationRef,
      loading: loadingRef,
      updateField,
    }
  },
})
</script>
