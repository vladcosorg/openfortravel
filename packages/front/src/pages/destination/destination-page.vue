<template>
  <inner-page disable-container disable-margins>
    <portal to="under-header">
      <the-breadcrumbs :items="breadcrumbs" />
    </portal>
    <the-search-header :origin-code="originCode" :destination-code="destinationCode" />
    <div class="container">
      <heading :restriction="restriction" :destination="destination" />
      <div class="row q-col-gutter-xl">
        <div class="col-md-7 col-12">
          <property-list
            class="q-mx-xs-sm q-mx-none"
            :destination="destination"
            :restriction="restriction"
            :is-loading="isLoading"
          />
        </div>
        <div class="col-md-5 col-12">
          <question-index
            class="q-mb-xl"
            :is-loading="isLoading"
            :destination="destination"
            :restriction="restriction"
          />
          <links class="q-mb-xl" :destination="destination" :is-loading="isLoading" />
          <section class="q-pb-xl">
            <inline-subscribe-form no-autofocus :restriction="restriction" />
          </section>
        </div>
      </div>
      <questions
        class="q-my-xl"
        :is-loading="isLoading"
        :destination="destination"
        :restriction="restriction"
      />

      <section>
        <widget-header :title="$t('components.sharing.title')" />
        <sharing :restriction="restriction" />
      </section>
    </div>
  </inner-page>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onServerPrefetch,
  provide,
  watch,
} from '@vue/composition-api'
import { Portal } from 'portal-vue'

import InnerPage from '@/front/src/components/inner-page.vue'
import TheBreadcrumbs from '@/front/src/layouts/components/the-header/the-breadcrumbs.vue'
import TheSearchHeader from '@/front/src/layouts/components/the-search-header.vue'
import Heading from '@/front/src/pages/destination/components/heading.vue'
import InlineSubscribeForm from '@/front/src/pages/destination/components/inline-subscribe-form.vue'
import Links from '@/front/src/pages/destination/components/links.vue'
import PropertyList from '@/front/src/pages/destination/components/property-list.vue'
import QuestionIndex from '@/front/src/pages/destination/components/question-index.vue'
import Questions from '@/front/src/pages/destination/components/questions.vue'
import Sharing from '@/front/src/pages/destination/components/sharing.vue'
import WidgetHeader from '@/front/src/pages/destination/components/widget-header.vue'
import { useBreadcrumbs } from '@/front/src/pages/destination/destination-composable'
import { meta } from '@/front/src/pages/destination/destination-meta'
import { registerStoreModule } from '@/front/src/pages/destination/destination-store'
import { StoreKey } from '@/front/src/pages/destination/destination-types'
import { useAugmentedStore, useStore } from '@/shared/src/composables/use-plugins'
import { useLoading } from '@/shared/src/composables/use-promise-loading'

export default defineComponent({
  meta,
  components: {
    QuestionIndex,
    Heading,
    WidgetHeader,
    Sharing,
    Links,
    Questions,
    TheSearchHeader,
    TheBreadcrumbs,
    PropertyList,
    InnerPage,
    InlineSubscribeForm,
    Portal,
  },
  props: {
    originCode: {
      type: String,
      required: true,
    },
    destinationCode: {
      type: String,
      required: true,
    },
    isFallback: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const store = registerStoreModule(useStore())
    const rootStore = useAugmentedStore()
    console.log(rootStore.state.detectedCountry)
    const { loading } = useLoading()

    const init = async () => {
      loading.value = true

      await store.actions.fetch({
        originCode: props.originCode,
        destinationCode: props.destinationCode,
      })
      loading.value = false
    }

    provide(StoreKey, store)
    onMounted(init)
    onServerPrefetch(init)
    watch(props, init)

    return {
      restriction: computed(() => store.getters.currentRestriction),
      destination: computed(() => store.getters.currentDestination),
      isLoading: loading,
      breadcrumbs: useBreadcrumbs(computed(() => store.getters.currentRestriction)),
    }
  },
})
</script>
