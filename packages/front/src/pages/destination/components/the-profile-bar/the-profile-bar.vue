<template>
  <div class="bg-elevation-11 q-py-md" style="margin-top: 1px">
    <div class="container">
      <div v-if="isEditing" class="q-mb-xl">
        <the-country-list
          :origin-code="originCode"
          :destination-code="destinationCode"
          show-destination-if-empty
        />
        <q-btn
          class="q-mt-lg"
          color="positive"
          text-color="primary-inverse"
          label="Update and hide"
          @click="toggleEditor"
        />
      </div>

      <div v-if="!isEditing" class="text-subtitle1">
        <span class="text-subtitle1 block q-mb-sm"
          >The restrictions below are based on the following criteria</span
        >
        <the-origin-facet />
        <the-destination-facet />
        <the-citizenship-facet />
        <the-vaccination-facet />

        <the-recovery-certificate-facet />
        <the-recently-visited-facet />
        <the-edit-facet />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from '@vue/composition-api'

import TheCountryList from '@/front/src/layouts/components/the-country-list/the-country-list.vue'
import TheAgeFacet from '@/front/src/pages/destination/components/the-profile-bar/facets/the-age-facet.vue'
import TheCitizenshipFacet from '@/front/src/pages/destination/components/the-profile-bar/facets/the-citizenship-facet.vue'
import TheDestinationFacet from '@/front/src/pages/destination/components/the-profile-bar/facets/the-destination-facet.vue'
import TheEditFacet from '@/front/src/pages/destination/components/the-profile-bar/facets/the-edit-facet.vue'
import TheOriginFacet from '@/front/src/pages/destination/components/the-profile-bar/facets/the-origin-facet.vue'
import TheRecentlyVisitedFacet from '@/front/src/pages/destination/components/the-profile-bar/facets/the-recently-visited-facet.vue'
import TheRecoveryCertificateFacet from '@/front/src/pages/destination/components/the-profile-bar/facets/the-recovery-certificate-facet.vue'
import TheVaccinationFacet from '@/front/src/pages/destination/components/the-profile-bar/facets/the-vaccination-facet.vue'
import { StoreModule } from '@/front/src/pages/destination/destination-store'
import { StoreKey } from '@/front/src/pages/destination/destination-types'
import { useRootStore } from '@/shared/src/composables/use-plugins'

export default defineComponent({
  components: {
    TheEditFacet,
    TheCountryList,
    TheRecoveryCertificateFacet,
    TheAgeFacet,
    TheRecentlyVisitedFacet,
    TheVaccinationFacet,
    TheCitizenshipFacet,
    TheDestinationFacet,
    TheOriginFacet,
  },
  setup() {
    const rootStore = useRootStore()
    const localStore = inject(StoreKey) as StoreModule

    const isEditing = computed(() => localStore.state.isEditingProfile)
    const toggleEditor = () => localStore.mutations.toggleProfileEditor()

    const originCode = computed(
      () => rootStore.getters.visitorContextWithDefaults.origin,
    )
    const destinationCode = computed(
      () => localStore.state.currentDestinationCode,
    )

    return { isEditing, originCode, destinationCode, toggleEditor }
  },
})
</script>
