<template>
  <simple-select
    v-model="currentLanguage"
    :options="languageList"
    bg-color="accent"
    :loading="loading"
    borderless
    emit-value
    options-dense
    class="language-switcher"
    :dropdown-icon="icon"
    @update:modelValue="handleClick"
  />
</template>

<style lang="scss">
.language-switcher {
  .q-field__control {
    border-radius: 14px;
    padding: 0 8px;
    font-size: 0.75rem;
  }
  .q-field__control,
  .q-field__native {
    // 'Important' needed to increase specificity against native quasar styles
    min-height: auto !important;
  }
  .q-field__native,
  .q-field__append {
    color: $dark !important;
    font-weight: bold;
    text-transform: uppercase;
    min-height: auto;
    height: auto;
  }

  .q-field__append {
    padding-left: 0;
  }
}
</style>

<script lang="ts">
import { roundExpandMore as icon } from '@quasar/extras/material-icons-round'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

import SimpleSelect from '@/front/src/components/simple-select.vue'
import type { StateInterface } from '@/front/src/store/state'
import { getI18nInstance } from '@/shared/src/composables/use-plugins'
import { useLoading } from '@/shared/src/composables/use-promise-loading'
import { useStateProperty } from '@/shared/src/composables/use-vuex'

export default defineComponent({
  components: { SimpleSelect },
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
