<template>
  <q-step title="Welcome" :name="currentStep" :done="step > currentStep">
    <div class="text-subtitle1">
      Attenion! All the data below is store in your browser only and is not
      accessible to us or anyone else. Additionally, you are free to skip any
      step that you would not like share. The search will still work, though it
      will be less accurate.
    </div>
    <q-stepper-navigation>
      <q-btn
        color="secondary"
        text-color="primary-inverse"
        size="lg"
        label="Start"
        @click="$emit('update:step', currentStep + 1)"
      />
    </q-stepper-navigation>
  </q-step>
</template>

<style lang="scss" module></style>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import mixin from '@/front/src/pages/guide/steps/mixin.vue'

export default defineComponent({
  mixins: [mixin],
  setup() {
    const currentStep = 1
    return { currentStep }
  },
})
</script>
