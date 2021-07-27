<template>
  <q-page class="bg-blue-grey-9">
    <portal to="header">
      <q-toolbar>
        <q-btn
          color="blue-grey-5"
          unelevated
          label="Back"
          :to="{ name: 'admin-index' }"
        />
        <q-toolbar-title>
          Destination: <b> {{ getLabelForCountryCode(originCode) }}</b>
        </q-toolbar-title>
        <q-tabs v-model="tab" shrink>
          <q-tab name="tree" label="Tree" />
          <q-tab name="info" label="Info" />
        </q-tabs>
        <q-space />

        <q-btn
          class="bg-elevation-1"
          unelevated
          :label="showPreview ? 'Hide preview' : 'Show preview'"
          @click="showPreview = !showPreview"
        />
        <q-btn
          class="bg-elevation-1 q-mx-sm"
          :disable="!isPending"
          :color="isPending ? 'red' : 'gray'"
          unelevated
          label="Save"
          :loading="isSaving"
          @click="runPendings"
        />
      </q-toolbar>
    </portal>

    <div>
      <keep-alive>
        <restriction-tree
          v-if="tab === 'tree'"
          v-model="destination"
          :loading="loadingRef"
          :show-preview="showPreview"
        />
        <table-header
          v-else-if="tab === 'info'"
          v-model="destination"
          :loading="loadingRef"
        />
      </keep-alive>
    </div>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { pick } from 'lodash'
import { Portal } from 'portal-vue'

import RestrictionTree from '@/admin/src/pages/edit/components/restriction-tree.vue'
import TableHeader from '@/admin/src/pages/edit/components/table-header.vue'
import { useSaveHandler } from '@/admin/src/pages/edit/composables/use-persister'
import { useDestination } from '@/shared/src/api/destinations/composables'
import type { PlainDestination } from '@/shared/src/api/destinations/models'
import { updateOriginDocument } from '@/shared/src/api/destinations/repository'
import { getLabelForCountryCode } from '@/shared/src/modules/country-list/country-list-helpers'

export default defineComponent({
  components: {
    RestrictionTree,
    TableHeader,
    Portal,
  },
  props: {
    originCode: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const tab = ref('tree')
    const { destinationRef, loadingRef } = useDestination(props.originCode)
    const modifiedFields: string[] = []
    let isPendingUpdate = false

    const { addSaveHandlerProp, isSaving, isPending, runPendings } =
      useSaveHandler()
    const destination = computed({
      get() {
        return destinationRef.value
      },
      set(value: Partial<PlainDestination>) {
        destinationRef.value = Object.assign(destinationRef.value, value)
        modifiedFields.push(...Object.keys(value))

        if (!isPendingUpdate) {
          isPendingUpdate = true
          addSaveHandlerProp(saveHandler)
        }
      },
    })

    const saveHandler = async (): Promise<void> => {
      await updateOriginDocument(
        destinationRef.value.countryCode,
        pick(destinationRef.value, modifiedFields),
      )
      isPendingUpdate = false
      modifiedFields.length = 0
    }

    return {
      getLabelForCountryCode,
      tab,
      loadingRef,
      destination,
      isSaving,
      isPending,
      runPendings,
      showPreview: ref(false),
    }
  },
})
</script>
