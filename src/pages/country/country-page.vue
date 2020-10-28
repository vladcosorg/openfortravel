<template>
  <q-page>
    <portal to="top">
      <the-flag-background :first-country-code="originCode" />
    </portal>

    <div class="column justify-center q-pa-lg q-gutter-xl">
      <div class="text-h6 text-center">
        Am gasit urmatoarele directii disponibile
      </div>

      <destination-group
        v-if="!loading"
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
      <q-list v-if="loading" separator>
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
import { defineComponent, provide, toRefs, watch } from '@vue/composition-api'
import TheFlagBackground from 'layouts/components/the-flag-background.vue'
import DestinationGroup from 'pages/country/components/destination-group.vue'
import { Portal } from 'portal-vue'

import { useCurrentOrigin } from 'src/composables/use-current-origin'
import { useOriginGroupedDestinations } from 'src/composables/use-origin-destinations'
import { useStore } from 'src/composables/use-plugins'
import { useAggregatedLoader } from 'src/composables/use-promise-loading'

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

    const { origin, loading: originLoading } = useCurrentOrigin(originCode)
    const {
      destinations,
      loading: destinationLoading,
    } = useOriginGroupedDestinations(originCode.value)

    provide('origin', origin)

    const loading = useAggregatedLoader(originLoading, destinationLoading)

    watch(loading, (newValue) => {
      useStore().commit('setCountrySelectorLoading', newValue)
    })

    return {
      origin,
      destinations,
      loading,
      allowedIcon,
      conditionalIcon,
      forbiddenIcon,
    }
  },
})
</script>
