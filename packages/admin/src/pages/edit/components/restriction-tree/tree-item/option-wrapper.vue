<script lang="ts">
import { computed, defineComponent, ref, watch, createElement } from 'vue'

import { createConfig } from '@/admin/src/pages/edit/composables/field-config/use-field-config'
import { TreeBuilderRestrictionNode } from '@/admin/src/pages/edit/types'

import type { PropType } from 'vue'

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
    const config = ref<ReturnType<typeof createConfig>>([])
    const options = computed(() => props.node.options)
    watch(
      () => props.node.type,
      (type) => {
        config.value = createConfig(type, options, emit)
      },
      { immediate: true },
    )

    return () =>
      createElement(
        'div',
        { class: 'row q-gutter-sm' },
        Object.entries(config.value)?.map(([key, field]) =>
          createElement(field.type, {
            class: field.bind.class,
            props: Object.assign({}, field.bind),
            on: Object.assign({}, field.on),
            attrs: Object.assign({}, field.attrs),
            key,
          }),
        ),
      )
  },
})
</script>
