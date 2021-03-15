<template>
  <div
    :class="[
      'row',
      $style.row,
      'justify-center',
      'q-col-gutter-md',
      'q-col-gutter-sm-lg',
      'q-px-md-xl',
    ]"
  >
    <div v-if="!isIntro" :class="[$style.intro, ' text-h5 text-center col-12']">
      {{ $t('components.theCountryList')[isIntro ? 'titleIntro' : 'title'] }}
    </div>

    <div class="col">
      <div class="relative-position row">
        <country-select
          :key="currentOrigin"
          v-model="currentOrigin"
          class="col-sm col-12"
          :loading="loading"
          :label="$t('components.theCountryList.from')"
          :show-prefix-text="!!originCode"
        >
          <template v-if="!originCode && !destinationCode" #after>
            <q-btn
              :loading="loading"
              unelevated
              color="secondary"
              style="height: 100%"
              @click="navigateToPage(currentOrigin)"
            >
              <img
                aria-hidden="true"
                role="img"
                width="24"
                height="24"
                :src="require('@/front/src/assets/search.svg')"
                class="q-icon notranslate"
              />
              <q-tooltip> {{ $t('components.theCountryList.btn') }}</q-tooltip>
            </q-btn>
          </template>
        </country-select>
        <swapper
          v-if="destinationCode || showDestinationIfEmpty"
          :destination-code="destinationCode"
          @click="navigateToPage(destinationCode, originCode)"
        />
        <country-select
          v-if="destinationCode || showDestinationIfEmpty"
          :key="currentDestination"
          v-model="currentDestination"
          is-destination
          :loading="loading"
          class="col-sm col-12 q-mt-xs"
          :label="$t('components.theCountryList.to')"
        />
      </div>
    </div>

    <slot />
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

import CountrySelect from '@/front/src/layouts/components/the-country-list/country-select.vue'
import Swapper from '@/front/src/layouts/components/the-country-list/swapper.vue'
import { getPersistedOriginOrDefault } from '@/front/src/misc/country-decider'
import { useRouter, useI18n } from '@/shared/src/composables/use-plugins'
import { useClosureLoading } from '@/shared/src/composables/use-promise-loading'
import {
  transformCountryCodeToDestinationSlug,
  transformCountryCodeToOriginSlug,
} from '@/shared/src/modules/country-list/country-list-helpers'

export default defineComponent({
  components: { Swapper, CountrySelect },
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
      async (originCode: string, destinationCode?: string): Promise<void> => {
        if (originCode && destinationCode) {
          await useRouter().push({
            name: 'destination',
            params: {
              originSlug: transformCountryCodeToOriginSlug(originCode),
              destinationSlug: transformCountryCodeToDestinationSlug(destinationCode),
              locale: useI18n().locale,
            },
          })
          return
        }

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
        navigateToPage(newOriginCode, destinationValueRef.value)
      },
    })

    const destinationValueRef = computed({
      get() {
        return props.destinationCode
      },
      set(newDestinationCode) {
        navigateToPage(originValueRef.value, newDestinationCode)
      },
    })

    return {
      loading: loadingRef,
      navigateToPage,
      currentOrigin: originValueRef,
      currentDestination: destinationValueRef,
      isIntro: computed(() => !props.originCode && !props.destinationCode),
    }
  },
})
</script>
