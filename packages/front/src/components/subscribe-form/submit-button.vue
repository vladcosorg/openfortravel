<template>
  <q-btn
    type="submit"
    unelevated
    color="secondary"
    text-color="primary"
    :label="
      isSubscribed
        ? $t('components.subscribe.actionDone')
        : $t('components.subscribe.action')
    "
    :icon-right="isSubscribed ? matDone : undefined"
    :loading="isLoading"
    :disable="isLoading || isSubscribed"
  />
</template>

<script lang="ts">
import { matDone } from '@quasar/extras/material-icons'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  components: {},
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    isSubscribed: { type: Boolean, default: false },
  },
  setup() {
    return { matDone }
  },
})
</script>
