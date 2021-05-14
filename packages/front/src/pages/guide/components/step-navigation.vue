<template>
  <q-stepper-navigation class="q-gutter-x-sm">
    <q-btn
      v-if="step > 2"
      color="grey-5"
      outline
      label="Back"
      @click="$emit('update:step', step - 1)"
    />
    <q-btn
      color="accent"
      text-color="primary-inverse"
      label="Next"
      @click="$emit('update:step', nextStep ? nextStep : step + 1)"
    />
  </q-stepper-navigation>
</template>

<style lang="scss" module></style>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  components: {},
  props: {
    step: {
      type: Number,
      required: true,
    },
    nextStep: {
      type: Number,
      required: false,
    },
  },
})
</script>
