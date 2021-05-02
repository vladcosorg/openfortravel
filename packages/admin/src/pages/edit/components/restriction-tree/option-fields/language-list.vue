<template>
  <q-select
    :value="value"
    dense
    outlined
    multiple
    emit-value
    map-options
    :options="options"
    use-chips
    use-input
    label="Languages"
    stack-label
    clearable
    :class="$style.select"
    style="width: 200px; white-space: nowrap"
    @filter="filterFn"
    v-on="$listeners"
  >
    <template #selected
      ><div class="ellipsis label">
        {{ value ? value.join(', ') : '-' }}
      </div>
    </template>
  </q-select>
</template>

<style lang="scss" module>
.select :global(.q-field__input) {
  width: 20px;
  display: none;
}

.select:global(.q-field--focused .label) {
  display: none;
}

.select:global(.q-field--focused .q-field__input) {
  display: block;
}
</style>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import languageList from 'iso-language-list/dist/generated/top10-speakers-then-az-value-label.json'

export default defineComponent({
  components: {},
  props: {
    value: {
      type: [Array],
    },
  },
  setup() {
    const options = ref(languageList)
    const filterFn = (
      query: string,
      update: { (callback: { (): void }): void },
    ) => {
      if (query === '') {
        update(() => {
          options.value = languageList
        })
        return
      }

      update(() => {
        const regex = new RegExp(`.*${query}.*`)
        options.value = languageList.filter(
          (lang) => regex.test(lang.value) || regex.test(lang.label),
        )
      })
    }

    return { options, filterFn }
  },
})
</script>
