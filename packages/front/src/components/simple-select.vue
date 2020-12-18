<template>
  <q-field v-if="$q.platform.is.mobile" v-bind="$attrs" v-on="$listeners">
    <template #control>
      <div :class="['col', 'ellipsis-improved']">
        {{ currentLabelRef }}
      </div>
    </template>
    <template #append>
      <q-icon v-if="dropdownIcon" :name="dropdownIcon" />
      <invisible-native-select v-bind="$props" v-on="$listeners" />
    </template>
  </q-field>
  <q-select
    v-else
    emit-value
    v-bind="{ ...$props, ...$attrs }"
    options-selected-class="text-bold text-white"
    v-on="$listeners"
  />
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api'

import InvisibleNativeSelect from '@/front/src/components/invisible-native-select.vue'

export interface SelectItem {
  value: string
  label: string
}

export type SelectList = SelectItem[]

export default defineComponent({
  components: { InvisibleNativeSelect },
  inheritAttrs: false,
  props: {
    value: {
      required: true,
      type: String,
    },
    options: {
      type: Array as PropType<SelectList>,
      required: true,
    },
    dropdownIcon: {
      type: String,
    },
  },
  setup(props) {
    const currentOptionRef = computed(
      () =>
        (props.options.find(
          (option) => option.value === props.value,
        ) as unknown) as SelectItem,
    )

    const currentLabelRef = computed(() => currentOptionRef.value?.value)

    return {
      currentLabelRef,
    }
  },
})
</script>
