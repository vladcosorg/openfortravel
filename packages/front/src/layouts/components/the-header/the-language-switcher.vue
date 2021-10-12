<template>
  <generic-select
    v-model="currentLanguage"
    :options="languageList"
    :loading="loading"
    dense
    fill-input
    hide-bottom-space
    hide-selected
    flat
    :hide-dropdown-icon="$q.screen.lt.md"
    class="language-switcher"
    @update:modelValue="handleClick"
  >
    <template #prepend>
      <q-icon :name="icon" size="xs" />
    </template>
  </generic-select>
</template>

<style lang="sass">
.language-switcher
  min-width: auto !important
  .q-field__input
    display: block !important

  .q-field__control-container
    @media (max-width: $breakpoint-xs-max)
      display: none
</style>

<script lang="ts">
import { matTranslate as icon } from '@quasar/extras/material-icons'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

import GenericSelect from '@/front/src/components/context-field/helpers/generic-select.vue'
import type { StateInterface } from '@/front/src/store/state'
import { getI18nInstance } from '@/shared/src/composables/use-plugins'
import { useLoading } from '@/shared/src/composables/use-promise-loading'
import { useStateProperty } from '@/shared/src/composables/use-vuex'

export default defineComponent({
  components: { GenericSelect },
  setup() {
    const { loading } = useLoading(false)
    const currentLanguage = ref(getI18nInstance().locale.value)
    const languageList = useStateProperty<StateInterface>('labeledLocales')
    const router = useRouter()
    const handleClick = (tolocale: string) => {
      loading.value = true
      location.href = router.resolve({ query: { tolocale } }).href
    }

    return {
      currentLanguage,
      languageList,
      icon,
      loading,
      handleClick,
    }
  },
})
</script>
