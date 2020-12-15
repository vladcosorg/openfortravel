<template>
  <div class="row">
    <div class="col-11">
      <slot
        v-if="isEditing"
        name="edit"
        v-bind="{ label, loading, value: internalValue, updateValue }"
      >
        <q-input
          v-model="internalValue"
          :label="label"
          outlined
          dense
          :loading="loading"
          type="url"
          debounce="300"
          label-color="white"
          @keyup.enter="toggleEditing()"
        />
      </slot>
      <q-field
        v-if="!isEditing"
        outlined
        dense
        :loading="loading"
        :label="label"
        stack-label
        readonly
        label-color="white"
      >
        <template #control>
          <slot name="view" :value="value">
            <div
              class="self-center no-outline ellipsis"
              style="white-space: normal"
              tabindex="0"
            >
              {{ value }}
            </div>
          </slot>
        </template>
      </q-field>
    </div>
    <q-btn
      class="col-1"
      color="secondary"
      :icon="isEditing ? 'done' : 'edit'"
      flat
      @click="toggleEditing"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'

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
      default: false,
    },
  },
  setup(props, { emit }) {
    const buffer = ref<string | undefined>()
    const internalValue = computed<string | undefined>({
      get() {
        if (buffer.value === undefined) {
          return props.value
        }

        return buffer.value
      },
      set(value) {
        buffer.value = value
      },
    })

    const isEditing = ref<boolean>(false)

    const toggleEditing = () => {
      isEditing.value = !isEditing.value

      if (buffer.value != undefined) {
        updateValue(buffer.value)
      }
    }
    const updateValue = (value: string) => {
      buffer.value = undefined
      emit('input', value)

      if (isEditing.value) {
        toggleEditing()
      }
    }

    return {
      isEditing,
      internalValue,
      toggleEditing,
      updateValue,
    }
  },
})
</script>
