<template>
  <div class="row q-gutter-x-sm">
    <component
      :is="field.type"
      v-bind="field.bind"
      v-for="(field, key) in config"
      :key="key"
      v-model="field.model.value"
    />
  </div>
</template>

<script lang="ts">
import type { PropType } from '@vue/composition-api'
import { computed, defineComponent, ref, watch } from '@vue/composition-api'

import { createConfig } from '@/admin/src/pages/edit/composables/field-config/use-field-config'
import { TreeBuilderRestrictionNode } from '@/admin/src/pages/edit/types'

export default defineComponent({
  components: {},
  model: {
    prop: 'node',
  },
  props: {
    node: {
      type: Object as PropType<TreeBuilderRestrictionNode>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const config = ref({})
    const options = computed(() => props.node.options)

    watch(
      () => props.node.type,
      (type) => {
        config.value = createConfig(type, options, emit)
      },
      { immediate: true },
    )
    return { config }
  },
})
</script>
