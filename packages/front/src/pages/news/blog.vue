<template>
  <inner-page disable-container disable-margins>
    <the-breadcrumbs
      :items="[
        { label: t('page.travelAlertsVaccinated.breadcrumbCategory'), to: '/' },
        {
          label: title,
        },
      ]"
    />
    <div class="overflow-auto q-pb-lg q-pt-md relative-position bg-elevation-1">
      <div class="container">
        <h1 class="text-h4 q-ma-none text-capitalize">
          {{ title }}
        </h1>
        <h2
          class="text-h6 text-primary-subtle"
          style="font-weight: normal"
          v-html="
            tl('page.travelAlertsVaccinated.subtitle', {
              origin: originISO,
            })
          "
        />

        <div class="text-primary-subtle">
          {{ t('page.travelAlertsVaccinated.lastUpdated') }}:
          {{ publishedDate.toLocaleDateString(locale) }}
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
            {{ t(`page.travelAlertsVaccinated.intro`) }}
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
import { computed, onMounted, onServerPrefetch } from 'vue'

import InnerPage from '@/front/src/components/inner-page.vue'
import { useContextParser } from '@/front/src/composables/visitor-context-applier'
import TheBreadcrumbs from '@/front/src/layouts/components/the-header/the-breadcrumbs.vue'
import { getFirstDayOfCurrentMonth } from '@/front/src/misc/date'
import { useMetaJsonLd } from '@/front/src/misc/meta'
import { slugify } from '@/front/src/misc/misc'
import { useCustomI18n } from '@/front/src/modules/i18n/composables'
import { useBlogTitle } from '@/front/src/pages/news/composables'
import NewsCard from '@/front/src/pages/news/news-card.vue'
import {
  GroupedDestinations,
  useNewsStore,
} from '@/front/src/pages/news/news-store'
import { parameterTransformers } from '@/front/src/pages/news/router'
import { getCurrentRelativeURL } from '@/front/src/router/helpers'
import { useRootStore } from '@/shared/src/composables/use-plugins'
import { getContinentLabel } from '@/shared/src/modules/continent-map/continent-map-helpers'

const { tr, locale, t, tl } = useCustomI18n()
useContextParser(parameterTransformers)
const store = useNewsStore()
const publishedDate = new Date()
const originISO = computed(() => useRootStore().getters.visitorOrigin)
const title = useBlogTitle(originISO)
const image =
  'https://images.unsplash.com/photo-1525077426767-cf97e02024ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&h=350&q=80'

const fetcher = async () => {
  await store.fetchData()
}

const list = computed<GroupedDestinations>(() => store.sortedCountryList)
const headings = computed<
  Record<
    keyof GroupedDestinations,
    {
      title: string
      slug: string
      children: Array<{ title: string; slug: string }>
    }
  >
>(() =>
  mapValues(list.value, (continents, key) => {
    const title = tr(`page.travelAlertsVaccinated.category.${key}`)
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

useMetaJsonLd({
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: title.value,
  image: [image],
  datePublished: getFirstDayOfCurrentMonth().toISOString(),
  dateModified: publishedDate.toISOString(),
})
</script>
