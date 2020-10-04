<template>
  <q-page>
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

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  onServerPrefetch,
  provide,
  ref,
  watch,
} from '@vue/composition-api'
import DestinationGroup from 'pages/country/components/DestinationGroup.vue'
import { useStore } from 'src/composables/use-plugins'

import { isEmpty } from 'lodash'
import {
  ionCheckmarkCircle as allowedIcon,
  ionAlertCircle as conditionalIcon,
  ionRemoveCircle as forbiddenIcon,
} from '@quasar/extras/ionicons-v5'
import { Origin } from 'src/models/Origin'
import {
  generateGroupedDestinationList,
  GroupedDestinations,
} from 'src/repositories/CountryDestinations'

export default defineComponent({
  components: { DestinationGroup },
  props: {
    originCode: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const loading = ref(false)

    async function loadOrigin() {
      await useStore().dispatch('loadOrigin', props.originCode)
    }
    onServerPrefetch(loadOrigin)
    onMounted(loadOrigin)
    const origin = computed(() => {
      return new Origin(useStore().getters.currentOrigin)
    })
    provide('origin', origin)

    const destinations = computed<GroupedDestinations>(
      () => useStore().state.countryDestinations,
    )
    onServerPrefetch(loadDestinationList)

    async function loadDestinationList() {
      loading.value = true
      useStore().commit(
        'setCountryDestinations',
        await generateGroupedDestinationList(props.originCode),
      )
      loading.value = false
    }

    watch(() => props.originCode, loadDestinationList)

    onMounted(async () => {
      if (!isEmpty(useStore().state.countryDestinations)) {
        return
      }

      await nextTick()
      await loadDestinationList()
    })

    return {
      destinations,
      allowedIcon,
      conditionalIcon,
      forbiddenIcon,
      loading,
    }
  },
})
</script>
