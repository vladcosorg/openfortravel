<template>
  <div class="row q-gutter-x-sm">
    <component
      :is="field.type"
      v-bind="field.bind"
      v-for="(field, key) in config"
      :key="key"
      v-model="field.model.value"
      v-on="field.on"
    />
  </div>
</template>

<script lang="ts">
import type { PropType } from '@vue/composition-api'
import { computed, defineComponent, toRef } from '@vue/composition-api'

import { createConfig } from '@/admin/src/pages/edit/composables/field-config/use-field-config'
import { RestrictionNode } from '@/shared/src/restriction-tree/restriction-node'
import type { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export default defineComponent({
  model: {
    prop: 'options',
  },
  props: {
    type: {
      type: String as PropType<RestrictionNodeType>,
      required: true,
    },
    // eslint-disable-next-line vue/no-unused-properties
    options: {
      type: Object as PropType<typeof RestrictionNode.defaultOptions>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const options = toRef(props, 'options')
    const config = computed(() => createConfig(props.type, options, emit))

    return { config }
  },
})
</script>
