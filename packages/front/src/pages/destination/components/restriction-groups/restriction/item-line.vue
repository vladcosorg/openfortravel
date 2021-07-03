<template>
  <q-item
    class="rounded-borders q-py-sm"
    :clickable="!isExpanded"
    @click="isExpanded = !isExpanded"
  >
    <q-item-section avatar class="justify-center items-center">
      <slot name="prefix">A</slot>
    </q-item-section>

    <q-item-section>
      <q-item-label>
        <slot name="title" />
      </q-item-label>
      <q-item-label
        v-if="$slots.subtitle"
        class="text-caption text-primary-subtle"
      >
        <slot name="subtitle" />
      </q-item-label>

      <q-separator v-if="isExpanded" class="q-my-md" />
      <q-item-label v-if="isExpanded" class="text-primary-subtle text-body2">
        <slot name="description" />
      </q-item-label>
    </q-item-section>

    <q-tooltip v-if="!isExpanded"
      >Click to show full restriction text</q-tooltip
    >
    <q-item-section v-if="!isExpanded" side>
      <q-icon :name="showMoreIcon" />
    </q-item-section>
  </q-item>
</template>

<style lang="scss" module></style>

<script lang="ts">
import { matUnfoldMore as showMoreIcon } from '@quasar/extras/material-icons'
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  components: {},

  setup(props) {
    const isExpanded = ref(false)
    return { showMoreIcon, isExpanded }
  },
})
</script>
