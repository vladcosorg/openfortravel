<template>
  <div class="row full-width">
    <div class="column items-center col-12">
      <div class="text-h6">
        Страны из которых разрешен въезд в {{ destination.name }}
      </div>
      <router-link class="text-h6" :to="{ name: 'admin-index' }">
        К списку стран
      </router-link>
    </div>
    <div class="col-12 row q-gutter-md">
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
        class="col-6"
        label="Is health declaration required?"
        :value="destination.isHealthDeclarationRequired"
        stack-label
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
          <a :href="value" target="_blank" class="text-white">
            {{ value }}
          </a>
        </template>
      </in-place-field>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import InputDate from '@/front/src/components/input-date.vue'
import InPlaceField from '@/front/src/pages/admin/edit/components/in-place-field.vue'
import TestRequired from '@/front/src/pages/admin/edit/components/test-required.vue'
import { useDestination } from '@/shared/src/api/destinations/composables'

export default defineComponent({
  components: { InPlaceField, InputDate, TestRequired },
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
