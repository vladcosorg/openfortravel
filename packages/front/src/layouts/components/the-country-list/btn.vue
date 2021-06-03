<template>
  <q-btn
    size="14px"
    color="secondary"
    :icon="`img:${require('@/front/src/assets/search.svg')}`"
    text-color="primary"
    :percentage="20"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <q-tooltip> {{ $t('components.theCountryList.btn') }}</q-tooltip>
  </q-btn>
</template>

<style lang="scss" module>
.btn {
  height: 70px;
  width: 70px;
  box-shadow: $shadow-8;

  :global {
    .q-icon {
      margin-left: 2px;
      margin-bottom: 2px;
    }
  }
}
</style>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  components: {},

  setup() {
    return {}
  },
})
</script>
