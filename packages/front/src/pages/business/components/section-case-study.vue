<template>
  <landing-section thin-title>
    <template #badge> Case Study </template>
    <template #title
      >GoSee: A new member of the Openfortravel Advisory Platform
      family</template
    >
    <template #content>
      <div class="q-gutter-lg">
        <div class="text-h6 text-normal">
          <div class="bg-elevation-1 rounded-borders q-pa-md">
            <q>
              Before using our Travel Advisory solution for his travel CRM, he
              had to hire and train an employee that would monitor almost 100
              destinations every day. Which is almost impossible to do properly.
              Moreover, his responsability was to contact the customers, notifiy
              them about the changes and explain what they need dto do.
            </q>
          </div>
        </div>
        <div
          class="row items-center justify-center justify-sm-start q-gutter-md"
        >
          <q-avatar size="5rem">
            <q-img
              class="rounded-borders"
              src="./section-case-study/story.jpeg"
            />
          </q-avatar>
          <div>
            <div class="text-h5">Johanis Oladdfsdoonn</div>
            <div class="text-primary-subtle text-normal text-subtitle1">
              Founder Owner of private travel company in Innsbruk
            </div>
          </div>
        </div>
      </div>
      <comparison-table />
    </template>
  </landing-section>
</template>

<script lang="ts" setup>
import LandingSection from '@/front/src/components/section-elements/landing-section.vue'
import ComparisonTable from '@/front/src/pages/business/components/section-case-study/_comparison-table.vue'
</script>
