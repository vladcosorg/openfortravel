<template>
  <q-field outlined autofocus dense :loading="loading">
    <template #control>
      <q-option-group
        :value="value"
        :options="statuses"
        type="radio"
        color="secondary"
        inline
        dense
        v-on="listeners"
      />
    </template>
  </q-field>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { getStatusListPairs } from 'src/api/Destinations'
import { useAsyncListeners } from 'src/composables/use-async-listeners'

export default defineComponent({
  components: {},
  props: {
    value: {
      type: String,
    },
  },
  setup(props) {
    const { loading, listeners } = useAsyncListeners()
    return { statuses: getStatusListPairs(), listeners, loading }
  },
})
</script>
