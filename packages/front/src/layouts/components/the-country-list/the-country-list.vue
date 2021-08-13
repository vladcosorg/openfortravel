<template>
  <div
    :class="[
      'row',
      $style.row,
      'justify-center',
      'q-col-gutter-md',
      'q-col-gutter-sm-lg',
    ]"
  >
    <div v-if="!isIntro" :class="[$style.intro, ' text-h5 text-center col-12']">
      {{ $t('components.theCountryList')[isIntro ? 'titleIntro' : 'title'] }}
    </div>

    <div class="col-12">
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
    <div class="col-12">
      <div class="row q-col-gutter-x-md">
        <citizenship-context class="col-sm-3 col-12" />
        <did-not-visit-countries-context class="col-sm-3 col-12" />
        <vaccination-context class="col-sm-3 col-12" />
        <recovery-context class="col-sm-3 col-12" />
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
import {
  useRouter,
  useI18n,
  useRootStore,
} from '@/shared/src/composables/use-plugins'
import { useClosureLoading } from '@/shared/src/composables/use-promise-loading'
import {
  transformCountryCodeToDestinationSlug,
  transformCountryCodeToOriginSlug,
} from '@/shared/src/modules/country-list/country-list-helpers'
import { computed, defineComponent } from 'vue'

import CitizenshipContext from '@/front/src/components/context-field/citizenship/citizenship-context.vue'
import GenericSelect from '@/front/src/components/context-field/helpers/generic-select.vue'
import RecoveryContext from '@/front/src/components/context-field/recovery/recovery-context.vue'
import VaccinationContext from '@/front/src/components/context-field/vaccination/vaccination-context.vue'
import DidNotVisitCountriesContext from '@/front/src/components/context-field/visited/did-not-visit-countries-context.vue'
import CountrySelect from '@/front/src/layouts/components/the-country-list/country-select.vue'
import Swapper from '@/front/src/layouts/components/the-country-list/swapper.vue'
import { getPersistedOriginOrDefault } from '@/front/src/misc/country-decider'

export default defineComponent({
  components: {
    GenericSelect,
    RecoveryContext,
    DidNotVisitCountriesContext,
    VaccinationContext,
    CitizenshipContext,
    Swapper,
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
      async (originCode: string, destinationCode?: string): Promise<void> => {
        if (originCode && destinationCode) {
          await useRouter().push({
            name: 'destination',
            params: {
              originSlug: transformCountryCodeToOriginSlug(originCode),
              destinationSlug:
                transformCountryCodeToDestinationSlug(destinationCode),
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
            searchId: useRootStore().state.searchId,
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
