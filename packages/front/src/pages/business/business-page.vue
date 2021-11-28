<template>
  <q-page style="z-index: 2" class="section-bg">
    <section-intro />
    <section-benefits />
    <section-guide />
    <section-whyus />
    <section-chatbot />
    <section-case-study />
    <section-customer-service />
    <section-ai-data />
    <section-contact />
  </q-page>
</template>

<style lang="sass" scoped>
// $
.section-bg > section
  @include angle(before, true)
  &:nth-child(even)
    background-color: #262b32
  &:nth-child(odd)
    background-color: #1c273f
</style>

<script lang="ts" setup>
import SectionAiData from '@/front/src/pages/business/components/section-ai-data.vue'
import SectionBenefits from '@/front/src/pages/business/components/section-benefits.vue'
import SectionCaseStudy from '@/front/src/pages/business/components/section-case-study.vue'
import SectionChatbot from '@/front/src/pages/business/components/section-chatbot.vue'
import SectionContact from '@/front/src/pages/business/components/section-contact.vue'
import SectionCustomerService from '@/front/src/pages/business/components/section-customer-service.vue'
import SectionGuide from '@/front/src/pages/business/components/section-guide.vue'
import SectionIntro from '@/front/src/pages/business/components/section-intro.vue'
import SectionWhyus from '@/front/src/pages/business/components/section-whyus.vue'
</script>
