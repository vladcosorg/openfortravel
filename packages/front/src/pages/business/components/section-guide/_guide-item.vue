<template>
  <q-step
    :name="step"
    :prefix="step"
    :title="title"
    :done="done"
    :caption="caption"
  >
    <div class="q-gutter-y-xs">
      <slot :next="next" :prev="prev" />
      <q-skeleton height="10px" animation="none" />
      <q-skeleton height="10px" width="50%" animation="none" />
      <clicked-button
        v-if="!isLast"
        :activate="activateBackBtn"
        label="Back"
        text-color="primary"
        color="elevation-1"
        class="q-mr-sm"
        @click="moveToPrev"
      />
      <clicked-button
        v-if="!isLast"
        text-color="primary"
        :activate="activateNextBtn"
        label="Next"
        @click="moveToNext"
      />
    </div>
  </q-step>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

import ClickedButton from '@/front/src/pages/business/components/section-guide/clicked-button.vue'

const props = defineProps<{
  isLast?: boolean
  step: number
  title: string
  modelValue: number
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()
const answer = ref()
const activateBackBtn = ref(false)
const activateNextBtn = ref(false)

const prev = (eventAnswer: string) => {
  answer.value = eventAnswer
  activateBackBtn.value = true
}
const next = (eventAnswer: string) => {
  answer.value = eventAnswer
  activateNextBtn.value = true
}

const done = computed(() => props.modelValue > props.step)
const caption = computed(() => (done.value ? answer.value : 'N/A'))

const moveToPrev = () => {
  emit('update:modelValue', props.modelValue - 1)
}
const moveToNext = () => {
  emit('update:modelValue', props.modelValue + 1)
}
</script>
