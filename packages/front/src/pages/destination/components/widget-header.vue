<template>
  <div class="q-mb-lg">
    <h6 :class="$style.sectionHeader">{{ title }}</h6>
    <div v-if="subtitle" class="text-body2 text-grey-5">{{ subtitle }}</div>
  </div>
</template>

<style lang="scss" module>
.sectionHeader {
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
  font-weight: bold;
  text-transform: uppercase;
}
</style>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  components: {},
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: false,
    },
  },
})
</script>
