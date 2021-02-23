<template>
  <div class="row q-col-gutter-lg q-ma-md">
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
    <test-required
      class="col-6"
      label="Is health declaration required?"
      :value="destination.isHealthDeclarationRequired"
      @input="updateField('isHealthDeclarationRequired', $event)"
    />

    <q-input
      v-if="destination.isHealthDeclarationRequired"
      filled
      class="col-6"
      label="Health Declaration Document"
      :value="destination.healthDeclarationDocURL"
      :loading="loading"
      debounce="2000"
      @input="updateField('healthDeclarationDocURL', $event)"
    />

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
      label="Visited restricted countries days ago"
      :value="destination.visitedRestrictedCountriesDaysAgo"
      type="number"
      min="0"
      outlined
      :debounce="1000"
      :loading="loading"
      @input="updateField('visitedRestrictedCountriesDaysAgo', $event)"
    />
    <q-input
      class="col-3"
      label="Proof of recovery accepted instead of PCR test"
      :value="destination.proofOfRecoveryInDays"
      type="number"
      min="0"
      outlined
      debounce="2000"
      :loading="loading"
      @input="updateField('proofOfRecoveryInDays', $event)"
    />

    <test-required
      class="col-3"
      label="Test on arrival available"
      :value="destination.testOnArrival"
      @input="updateField('testOnArrival', $event)"
    />

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
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import pick from 'lodash/pick'

import InPlaceField from '@/admin/src/pages/edit/components/in-place-field.vue'
import InputDate from '@/admin/src/pages/edit/components/input-date.vue'
import TestRequired from '@/admin/src/pages/edit/components/test-required.vue'
import { AddSaveHandler } from '@/admin/src/pages/edit/edit-page.vue'
import { useDestination } from '@/shared/src/api/destinations/composables'
import { updateOriginDocument } from '@/shared/src/api/destinations/repository'

export default defineComponent({
  components: { InPlaceField, InputDate, TestRequired },
  inheritAttrs: false,
  props: {
    addSaveHandler: {
      type: Function as PropType<AddSaveHandler>,
      required: true,
    },
    destinationCode: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { destinationRef, loadingRef } = useDestination(props.destinationCode)
    let isPendingUpdate = false
    const modifiedFields: string[] = []

    const saveHandler = async (): Promise<void> => {
      await updateOriginDocument(
        props.destinationCode,
        pick(destinationRef.value, modifiedFields),
      )
      isPendingUpdate = false
      modifiedFields.length = 0
    }

    const updateField = (fieldName: string, fieldValue: unknown) => {
      destinationRef.value = destinationRef.value.cloneWithFields({
        [fieldName]: fieldValue,
      })
      modifiedFields.push(fieldName)

      if (!isPendingUpdate) {
        isPendingUpdate = true
        props.addSaveHandler(saveHandler)
      }
    }

    return {
      destination: destinationRef,
      loading: loadingRef,
      updateField,
    }
  },
})
</script>
