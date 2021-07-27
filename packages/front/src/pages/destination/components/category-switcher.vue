<template>
  <div class="block q-gutter-sm q-mb-lg">
    <q-btn
      :icon="bestIcon"
      unelevated
      :color="
        modelValue === RestrictionListType.BEST_OPTION ? 'elevation-1' : ''
      "
      :text-color="
        modelValue === RestrictionListType.BEST_OPTION
          ? 'accent'
          : 'primary-subtle'
      "
      label="Best option"
      no-caps
      size="md"
      @click="$emit('update:modelValue', RestrictionListType.BEST_OPTION)"
    />
    <q-btn
      :disable="availableCount === 0"
      :color="
        modelValue === RestrictionListType.ALL_AVAILABLE ? 'elevation-1' : ''
      "
      unelevated
      label="All available"
      size="md"
      :text-color="
        modelValue === RestrictionListType.ALL_AVAILABLE ? '' : 'primary-subtle'
      "
      no-caps
      @click="$emit('update:modelValue', RestrictionListType.ALL_AVAILABLE)"
    >
      <q-badge
        class="q-ml-sm"
        color="positive"
        :outline="modelValue !== RestrictionListType.ALL_AVAILABLE"
        text-color="primary-inverse"
        >{{ availableCount }}</q-badge
      >
    </q-btn>
    <q-btn
      :disable="unavailableCount === 0"
      :color="
        modelValue === RestrictionListType.ALL_UNAVAILABLE ? 'elevation-1' : ''
      "
      unelevated
      :text-color="
        modelValue === RestrictionListType.ALL_UNAVAILABLE
          ? ''
          : 'primary-subtle'
      "
      size="md"
      label="All unavailable"
      no-caps
      @click="$emit('update:modelValue', RestrictionListType.ALL_UNAVAILABLE)"
    >
      <q-badge
        class="q-ml-sm"
        color="negative"
        :outline="modelValue !== RestrictionListType.ALL_UNAVAILABLE"
        text-color="primary-inverse"
        >{{ unavailableCount }}</q-badge
      >
    </q-btn>
  </div>
</template>

<script lang="ts">
import { matStar as bestIcon } from '@quasar/extras/material-icons'
import { defineComponent, PropType } from 'vue'

import { RestrictionListType } from '@/front/src/pages/destination/components/entry-restrictions.vue'

export default defineComponent({
  components: {},
  props: {
    modelValue: {
      type: String as PropType<RestrictionListType>,
      required: true,
    },
    availableCount: {
      type: Number,
      required: true,
    },
    unavailableCount: {
      type: Number,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup() {
    return { bestIcon, RestrictionListType }
  },
})
</script>
