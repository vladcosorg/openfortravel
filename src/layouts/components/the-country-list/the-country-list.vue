<template>
  <transition
    enter-active-class="animated bounceInUp"
    leave-active-class="animated bounceInUp"
  >
    <div :class="['row', $style.row, 'justify-center', 'q-gutter-y-md']">
      <div :class="[$style.intro, 'montserrat text-h5', 'text-center']">
        {{ $t('components.theCountryList')[isIntro ? 'titleIntro' : 'title'] }}
      </div>

      <country-select
        :key="currentOrigin"
        v-model="currentOrigin"
        :loading="loading"
        :show-prefix-text="!!originCode"
      >
        <template #default>
          {{ $t('components.theCountryList.from') }}
        </template>
        <template v-if="!originCode && !destinationCode" #after>
          <transition
            :duration="30000"
            appear
            enter-active-class="animated bounce slower"
          >
            <q-btn
              :loading="loading"
              unelevated
              color="secondary"
              :icon="`img:${require('src/assets/search.svg')}`"
              style="height: 100%"
              @click="navigateToPage(currentOrigin)"
            >
              <q-tooltip> {{ $t('components.theCountryList.btn') }}</q-tooltip>
            </q-btn>
          </transition>
        </template>
      </country-select>

      <country-select
        v-if="currentDestination"
        :key="currentDestination"
        v-model="currentDestination"
        :loading="loading"
      >
        <template #default>
          {{ $t('components.theCountryList.to') }}
        </template>
      </country-select>

      <slot />
    </div>
  </transition>
</template>

<style lang="scss" module>
.intro {
  text-shadow: 1px 1px 5px $primary;
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

import { useI18n, useRouter } from 'src/composables/use-plugins'
import { useClosureLoading } from 'src/composables/use-promise-loading'
import Btn from 'src/layouts/components/the-country-list/btn.vue'
import CountrySelect from 'src/layouts/components/the-country-list/country-select.vue'
import { getCurrentCountry } from 'src/misc/country-decider'
import { transformCodeToSlug } from 'src/modules/country-list/country-list-helpers'

export default defineComponent({
  components: { Btn, CountrySelect },
  props: {
    originCode: {
      type: String,
      required: false,
    },
    destinationCode: {
      type: String,
      required: false,
    },
  },
  setup(props) {
    const { loading: loadingRef, callback: navigateToPage } = useClosureLoading(
      async (originCode: string, destinationCode?: string): Promise<void> => {
        if (originCode && destinationCode) {
          await useRouter().push({
            name: 'destination',
            params: {
              originSlug: transformCodeToSlug(originCode),
              destinationSlug: transformCodeToSlug(destinationCode),
              locale: useI18n().locale,
            },
          })
          return
        }

        await useRouter().push({
          name: 'origin',
          params: {
            originSlug: transformCodeToSlug(originCode),
            locale: useI18n().locale,
          },
        })
      },
    )

    const originValueRef = computed({
      get() {
        return props.originCode ?? getCurrentCountry()
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
