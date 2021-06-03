<template>
  <q-input v-model="setter" dense borderless />
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import omit from 'lodash/omit'

export default defineComponent({
  components: {},
  props: {
    scope: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const setter = computed({
      get() {
        return props.scope?.node.options?.comment ?? ''
      },
      set(value: string) {
        const options = props.scope?.node.options
        emit('input', {
          options:
            value.length === 0
              ? omit(options, ['comment'])
              : Object.assign({}, options, {
                  comment: value,
                }),
        })
      },
    })
    return { setter }
  },
})
</script>
