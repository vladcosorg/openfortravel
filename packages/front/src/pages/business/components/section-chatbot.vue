<template>
  <landing-section opposite>
    <template #title>
      <span v-html="$t('page.forBusiness.sections.chatbot.title')" />
    </template>
    <template #subtitle>
      <i18n-l keypath="page.forBusiness.sections.chatbot.subtitle">
        <template #verified="{ innerContent }">
          <a>
            {{ innerContent }}
            <q-tooltip>{{ t('page.forBusiness.shared.verified') }}</q-tooltip>
          </a>
        </template>
        <template #min="{ innerContent }">
          <b>
            {{ innerContent }}
          </b>
        </template>
      </i18n-l>
    </template>
    <template #featured-content>
      <chatbot-chat class="flex-dependent-height-sm chat" />
    </template>
    <template #content>
      <div class="q-gutter-y-sm text-h6">
        <section-feature-line v-for="(feature, index) in features" :key="index">
          {{ feature }}
        </section-feature-line>
      </div>
    </template>
  </landing-section>
</template>

<style lang="sass" scoped>
.chat
  @media (max-width: $breakpoint-xs-max)
    height: 400px
</style>

<script lang="ts" setup>
import LandingSection from '@/front/src/components/section-elements/landing-section.vue'
import { useCustomI18n } from '@/front/src/modules/i18n/composables'
import I18nL from '@/front/src/modules/i18n/i18n-l.vue'
import SectionFeatureLine from '@/front/src/pages/business/components/common/section-feature-line.vue'
import ChatbotChat from '@/front/src/pages/business/components/section-chatbot/chatbot-chat.vue'

const { t, tm } = useCustomI18n()
const features = tm('page.forBusiness.sections.chatbot.features')
</script>
