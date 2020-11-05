<template>
  <q-page>
    <portal to="top">
      <!--      <the-flag-background :first-country-code="originCode" />-->
    </portal>

    <div class="column justify-center q-pa-lg q-gutter-xl">
      <q-input
        v-model="destinationFilter"
        placeholder="Quick country search"
        :loading="filterLoading"
        :disable="loading"
        dense
        outlined
        stack-label
        dark
      />
      <q-list v-if="loading || filterLoading" separator>
        <q-item v-for="n in Array(4)" :key="n">
          <q-item-section avatar>
            <q-skeleton type="QAvatar" />
          </q-item-section>

          <q-item-section>
            <q-item-label>
              <q-skeleton type="text" />
            </q-item-label>
            <q-item-label caption>
              <q-skeleton type="text" width="65%" />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <div v-else>
        <destination-group
          v-if="!loading && destinations.allowed"
          :group-name="$t('status.allowed')"
          :group-icon="allowedIcon"
          group-color="positive"
          :destinations="destinations.allowed"
        />
        <destination-group
          v-if="!loading"
          :group-name="$t('status.conditional')"
          :group-icon="conditionalIcon"
          group-color="warning"
          :destinations="destinations.conditional"
        />
        <destination-group
          v-if="!loading"
          :group-name="$t('status.forbidden')"
          :group-icon="forbiddenIcon"
          group-color="negative"
          :destinations="destinations.forbidden"
        />
      </div>
    </div>
  </q-page>
</template>
<style module>
.flagBg {
  position: absolute;
  left: 0;
  top: 0;
  margin: 0;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0));
}
</style>
<script lang="ts">
import {
  ionCheckmarkCircle as allowedIcon,
  ionAlertCircle as conditionalIcon,
  ionRemoveCircle as forbiddenIcon,
} from '@quasar/extras/ionicons-v5'
import { defineComponent, toRefs, watch } from '@vue/composition-api'
import { Portal } from 'portal-vue'

import { useStore } from 'src/composables/use-plugins'
import TheFlagBackground from 'src/layouts/components/the-flag-background.vue'
import DestinationGroup from 'src/pages/country/components/destination-group.vue'
import { useGroupedDestinations } from 'src/pages/country/composable'

export default defineComponent({
  meta: {
    // sets document title
    title: 'is page',
  },
  components: { DestinationGroup, Portal, TheFlagBackground },
  props: {
    originCode: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { originCode } = toRefs(props)

    const {
      destinations,
      filter: destinationFilter,
      loading,
      filterLoading,
    } = useGroupedDestinations(originCode)

    watch(loading, (newValue) => {
      useStore().commit('setCountrySelectorLoading', newValue)
    })

    return {
      destinationFilter,
      destinations,
      loading,
      allowedIcon,
      conditionalIcon,
      forbiddenIcon,
      filterLoading,
    }
  },
})
</script>
