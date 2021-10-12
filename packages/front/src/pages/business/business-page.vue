<template>
  <q-page style="z-index: 2">
    <section-intro />
    <section-real-benefits />
    <!--    <section-contact />-->
    <section-featured-data />
    <!--    <section-whyus />-->
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import SectionBenefits from '@/front/src/pages/business/components/section-benefits.vue'
import SectionContact from '@/front/src/pages/business/components/section-contact.vue'
import SectionFeaturedData from '@/front/src/pages/business/components/section-featured-data.vue'
import SectionIntro from '@/front/src/pages/business/components/section-intro.vue'
import SectionRealBenefits from '@/front/src/pages/business/components/section-real-benefits.vue'
import SectionWhyus from '@/front/src/pages/business/components/section-whyus.vue'

export default defineComponent({
  components: {
    SectionFeaturedData,
    SectionRealBenefits,
    SectionBenefits,
    SectionContact,
    SectionWhyus,
    SectionIntro,
  },

  setup(props) {},
})
</script>
