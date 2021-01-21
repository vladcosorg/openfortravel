<template>
  <div>
    <q-btn
      :icon="iconSubscribe"
      class="full-height"
      type="submit"
      unelevated
      color="secondary"
      text-color="dark"
      @click="promptVisible = true"
    >
      {{ $t('components.subscribe.action') }}
    </q-btn>
    <dialog-subscribe-form
      v-if="promptVisible"
      v-model="promptVisible"
      :origin="originCode"
    />
  </div>
</template>

<style lang="scss" module></style>

<script lang="ts">
import { matNotificationsNone as iconSubscribe } from '@quasar/extras/material-icons'
import { defineComponent, ref } from '@vue/composition-api'

import DialogSubscribeForm from '@/front/src/pages/country/components/dialog-subscribe-form.vue'

export default defineComponent({
  components: { DialogSubscribeForm },
  props: {
    originCode: {
      type: String,
      required: true,
    },
  },
  setup() {
    const promptVisible = ref(false)
    return { iconSubscribe, promptVisible }
  },
})
</script>
