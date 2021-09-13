<template>
  <inner-page disable-container disable-margins>
    <the-breadcrumbs
      :items="[
        { label: 'News', to: '/' },
        {
          label: title,
        },
      ]"
    />
    <div class="overflow-auto q-pb-lg q-pt-md relative-position bg-elevation-1">
      <div class="container">
        <h1 class="text-h4 q-ma-none">
          {{ title }}
        </h1>
        <h2 class="text-h6 text-primary-subtle" style="font-weight: normal">
          Ready to travel from U.S. after your COVID vaccine?<br />
          Each month we review the safest travel destinations that you can
          visit.
        </h2>
        <div class="text-primary-subtle">
          Last updated: {{ publishedDate.toLocaleDateString(i18n.locale) }}
        </div>
      </div>
    </div>
    <img
      src="https://images.unsplash.com/photo-1525077426767-cf97e02024ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&h=350&q=80"
    />
    <div class="container q-py-lg">
      <div class="row q-col-gutter-xl">
        <div class="col content-page">
          <p class="text-h6">
            {{ t(`page.travelAlerts.intro`) }}
          </p>

          <div class="rounded-borders bg-elevation-1 q-pa-md q-my-xl">
            <h5 class="q-mb-lg text-center">Summary</h5>
            <ul class="q-col-gutter-y-lg">
              <li v-for="(heading, headingId) in headings" :key="headingId">
                <a
                  class="text-h6"
                  :href="getCurrentRelativeURL(heading.slug)"
                  v-html="heading.title"
                />
                <ul class="q-mt-md">
                  <li
                    v-for="(continent, index) in heading.children"
                    :key="`${headingId}${index}`"
                  >
                    <a
                      class="text-subtitle1"
                      :href="getCurrentRelativeURL(continent.slug)"
                      >{{ continent.title }}</a
                    >
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div
            v-for="(continents, typeId) in list"
            :key="typeId"
            class="q-mb-lg"
          >
            <h4
              :id="headings[typeId].slug"
              class="text-center main-heading"
              v-html="headings[typeId].title"
            />
            <div
              v-for="(destinations, continentId) in continents"
              :key="`${typeId}${continentId}`"
              class="q-my-xl"
            >
              <h5
                :id="headings[typeId]['children'][continentId].slug"
                class="
                  text-primary-subtle text-center text-uppercase text-bold
                  q-mb-lg
                "
              >
                {{ getContinentLabel(continentId) }}
              </h5>
              <div
                v-for="destination in destinations"
                :key="destination.destinationISO"
              >
                <h6>
                  <a :href="destination.url">{{
                    destination.destinationLabel
                  }}</a>
                </h6>
                <component :is="destination.renderer" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-4 col-md-5 col-sm-6 q-gutter-lg">
          <div class="q-gutter-y-lg">
            <news-card unsplash-id="1586769852836-bc069f19e1b6">
              <template #title>
                View all destinations from
                <b>Austria</b>
              </template>
            </news-card>
            <news-card unsplash-id="1612277795421-9bc7706a4a34">
              <template #title>
                Which countries are allowing vaccinated visitors from
                <b>Austria</b> in August 2021 without test or quarantine
              </template>
            </news-card>
            <news-card unsplash-id="1600787711501-055418c157c8">
              <template #title>
                Which countries are allowing unvaccinated visitors from
                <b>Austria</b> in August 2021 without test or quarantine
              </template>
            </news-card>
          </div>
        </div>
      </div>
    </div>
  </inner-page>
</template>

<style>
.main-heading span {
  font-weight: bold;
  display: block;
}
</style>

<script lang="ts" setup>
import mapValues from 'lodash/mapValues'
import { useMeta } from 'quasar'
import { computed, onMounted, onServerPrefetch } from 'vue'

import InnerPage from '@/front/src/components/inner-page.vue'
import { useContextParser } from '@/front/src/composables/visitor-context-applier'
import TheBreadcrumbs from '@/front/src/layouts/components/the-header/the-breadcrumbs.vue'
import {
  getCurrentMonthAndYear,
  getFirstDayOfCurrentMonth,
} from '@/front/src/misc/date'
import { tr } from '@/front/src/misc/i18n-utils'
import { slugify } from '@/front/src/misc/misc'
import NewsCard from '@/front/src/pages/news/news-card.vue'
import {
  GroupedDestinations,
  useNewsStore,
} from '@/front/src/pages/news/news-store'
import { getCurrentRelativeURL } from '@/front/src/router/helpers'
import { originTransformer } from '@/front/src/router/transformers/origin'
import { useRootStore, useVueI18n } from '@/shared/src/composables/use-plugins'
import { getContinentLabel } from '@/shared/src/modules/continent-map/continent-map-helpers'
import { getOriginLabelForCountryCode } from '@/shared/src/modules/country-list/country-list-helpers'

useContextParser({
  originSlug: originTransformer,
})
const store = useNewsStore()
const { t, i18n } = useVueI18n()
const publishedDate = getFirstDayOfCurrentMonth()
const countryISO = computed(() => useRootStore().getters.visitorOrigin)
const originCountryLabel = computed(() =>
  getOriginLabelForCountryCode(countryISO.value),
)
const date = getCurrentMonthAndYear(i18n.locale)
const title = computed(
  () =>
    `Which countries are allowing vaccinated visitors from ${originCountryLabel.value} in ${date}?`,
)

const fetcher = async () => {
  await store.fetchData()
}

const list = computed<GroupedDestinations>(() => store.sortedCountryList)
const headings: Record<
  keyof GroupedDestinations,
  {
    title: string
    slug: string
    children: Array<{ title: string; slug: string }>
  }
> = computed(() =>
  mapValues(list.value, (continents, key) => {
    const title = tr(`page.travelAlerts.category.${key}`)
    const slug = slugify(title)
    const children = mapValues(continents, (_value, continentId) => {
      const continentLabel = getContinentLabel(continentId)
      return {
        title: continentLabel,
        slug: slugify(`${title} ${continentLabel}`),
      }
    })
    return {
      title,
      slug,
      children,
    }
  }),
)

onServerPrefetch(fetcher)
onMounted(fetcher)

useMeta(() => ({
  script: {
    ldJson: {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: title.value,
        image: [
          'https://example.com/photos/1x1/photo.jpg',
          'https://example.com/photos/4x3/photo.jpg',
          'https://example.com/photos/16x9/photo.jpg',
        ],
        datePublished: '2020-02-05T04:00:00+01:00',
        dateModified: publishedDate.toISOString(),
      }),
    },
  },
}))
</script>
