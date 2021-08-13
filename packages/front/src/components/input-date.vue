<template>
  <q-input :model-value="currentValue" outlined autofocus dense mask="date">
    <template #append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy ref="popup" :model-value="true">
          <q-date
            mask="YYYY-MM-DD"
            :value="value"
            minimal
            @input="currentValue = $event"
          />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script lang="ts">
import type { QPopupProxy } from 'quasar'
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    value: {
      type: String,
    },
    label: {
      type: String,
    },
    loading: {
      type: Boolean,
    },
  },
  setup(props, { emit }) {
    const popup = ref<QPopupProxy>()
    const currentValue = computed({
      get() {
        return props.value
      },
      set(value) {
        emit('update:modelValue', value)
        if (popup.value) {
          popup.value.hide()
        }
      },
    })

    return {
      currentValue,
      popup,
    }
  },
})
</script>
