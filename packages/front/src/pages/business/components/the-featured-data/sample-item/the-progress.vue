<template>
  <q-item-label v-if="status === 'checking' && visible">
    <progress-item v-if="stage === 0">
      <b>Robby AI</b> checking for updated travel restrictions
    </progress-item>
    <progress-item v-else-if="stage === 1">
      <b>Robby AI</b> found some new travel restrictions. Notifying humans...
    </progress-item>
    <progress-item v-else-if="stage === 2">
      <b>{{ humanName }}</b> is verifying the updates.
    </progress-item>
    <progress-item v-else-if="stage === 3">
      <b>{{ humanName }}</b> approves the changes.
    </progress-item>

    <progress-item v-else-if="stage === 4">
      <b>Robby AI</b> distributed to all our subscribers...
    </progress-item>
  </q-item-label>
  <q-item-label v-else-if="status === 'nochange'">
    No changes found since last check</q-item-label
  >
  <q-item-label v-else>
    <div>
      Travel restrictions changes detected. All customers have been notified.
    </div>
  </q-item-label>
  <div class="row justify-between q-mt-md items-center">
    <q-item-label class="text-caption text-primary-inverse col-12"
      >Customers notified by email or SMS:
      <span v-if="stage > 3"> <q-icon :name="icon" /> <b>Yes</b></span>
      <span v-else>Pending</span>
    </q-item-label>

    <!--    <q-item-label class="text-caption text-primary-inverse col-12 col-md-6"-->
    <!--      >Last checked:-->
    <!--      <b>{{ status === 'checking' ? 'in progress' : date }}</b></q-item-label-->
    <!--    >-->
    <q-item-label class="text-caption text-primary-inverse col-12"
      >Verified by a human:
      <span v-if="stage > 2"> <q-icon :name="icon" /> <b>Yes</b></span>
      <span v-else>Pending</span>
    </q-item-label>
  </div>
</template>

<script lang="ts">
export let found = true
</script>

<script lang="ts" setup>
import { matCheck as icon } from '@quasar/extras/material-icons'
import { useTimeoutFn } from '@vueuse/core'
import { computed, ref, watch } from 'vue'

import { ItemStatus } from '@/front/src/pages/business/components/section-featured-data.vue'
import ProgressItem from '@/front/src/pages/business/components/the-featured-data/sample-item/progress-item.vue'
import { getRelativeTimeFromDate } from '@/shared/src/misc/date'

const props = defineProps<{
  humanName: string
  status: ItemStatus
  time: Date
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'human-input'): void
  (e: 'done', resolution: ItemStatus): void
}>()

const stage = ref(0)
const { start, stop } = useTimeoutFn(() => {
  stage.value += 1
}, 2000)
const date = computed(() => getRelativeTimeFromDate(props.time))

if (props.status === 'checking') {
  const unwatch = watch(
    () => props.visible,
    (visible) => {
      if (visible) {
        start()
      } else {
        stop()
      }
      if (props.status !== 'checking') {
        unwatch()
      }
    },
  )

  const unsub = watch(
    stage,
    (newStage) => {
      switch (newStage) {
        case 2:
          emit('human-input')
          break

        case 4:
          emit('done', found ? 'nochange' : 'haschange')
          found = !found
          unsub()
          unwatch()
          break
      }

      start()
    },
    { immediate: true },
  )
}
</script>
