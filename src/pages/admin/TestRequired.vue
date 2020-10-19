<template>
  <q-field :value="value" outlined autofocus dense :loading="loading">
    <template #control="{ value }">
      <q-checkbox :value="value" dense v-on="listeners"> Yes </q-checkbox>
    </template>
  </q-field>
</template>

<style lang="scss" module></style>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useAsyncListeners } from 'src/composables/use-async-listeners'

export default defineComponent({
  components: {},
  props: {
    value: {
      type: Boolean,
    },
  },
  setup(props) {
    const { loading, listeners } = useAsyncListeners()
    return { listeners, loading }
  },
})
</script>
