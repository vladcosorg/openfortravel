<template>
  <div class="bg-elevation-1 overflow-auto q-pb-lg q-pt-md q-mb-lg">
    <div class="container">
      <div :class="[$style.intro, 'text-h5 text-center col-12']">
        {{ $t('components.theCountryList.title') }}
      </div>

      <div class="row q-col-gutter-md q-mt-sm">
        <country-select
          :key="currentOrigin"
          v-model="currentOrigin"
          class="col-sm col-12"
          :loading="loading"
          :label="$t('components.theCountryList.from')"
          :show-prefix-text="!!originCode"
        />
        <citizenship-context class="col-sm col-12" />
        <vaccination-context class="col-sm col-12" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.intro {
  text-shadow: 1px 1px 5px $dark;
  font-weight: bold;
  text-transform: uppercase;
}

.btn {
  height: 70px;
  width: 70px;
  box-shadow: $shadow-8;

  :global {
    .q-icon {
      margin-left: 2px;
      margin-bottom: 2px;
    }
  }
}
</style>
<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

import CitizenshipContext from '@/front/src/components/context-field/citizenship-context.vue'
import VaccinationContext from '@/front/src/components/context-field/vaccination-context.vue'
import CountrySelect from '@/front/src/layouts/components/the-country-list/country-select.vue'
import { getPersistedOriginOrDefault } from '@/front/src/misc/country-decider'
import { useRouter, useI18n } from '@/shared/src/composables/use-plugins'
import { useClosureLoading } from '@/shared/src/composables/use-promise-loading'
import { transformCountryCodeToOriginSlug } from '@/shared/src/modules/country-list/country-list-helpers'

export default defineComponent({
  components: {
    VaccinationContext,
    CitizenshipContext,
    CountrySelect,
  },
  props: {
    originCode: {
      type: String,
      default: undefined,
    },
    destinationCode: {
      type: String,
      required: false,
      default: undefined,
    },
    showDestinationIfEmpty: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { loading: loadingRef, callback: navigateToPage } = useClosureLoading(
      async (originCode: string): Promise<void> => {
        await useRouter().push({
          name: 'origin',
          params: {
            originSlug: transformCountryCodeToOriginSlug(originCode),
            locale: useI18n().locale,
          },
        })
      },
    )

    const originValueRef = computed({
      get() {
        return props.originCode ?? getPersistedOriginOrDefault()
      },
      set(newOriginCode) {
        void navigateToPage(newOriginCode)
      },
    })

    return {
      loading: loadingRef,
      navigateToPage,
      currentOrigin: originValueRef,
    }
  },
})
</script>
