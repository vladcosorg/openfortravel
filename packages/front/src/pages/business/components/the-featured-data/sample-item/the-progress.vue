<template>
  <q-item-label v-if="status === 'checking' && visible">
    <div v-if="stage === 0">
      <q-spinner color="primary-inverse" class="q-mr-sm" />
      <b>Robby AI</b> checking for updated travel restrictions
    </div>
    <div v-else-if="stage === 1">
      <q-spinner color="primary-inverse" class="q-mr-sm" />
      <b>Robby AI</b> found some new travel restrictions. Notifying humans...
    </div>
    <div v-else-if="stage === 2">
      <q-spinner color="primary-inverse" class="q-mr-sm" />
      <b>{{ humanName }}</b> is verifying the updates.
    </div>
    <div v-else-if="stage === 3">
      <q-spinner color="primary-inverse" class="q-mr-sm" />
      <b>{{ humanName }}</b> approves the changes.
    </div>

    <div v-else-if="stage === 4">
      <q-spinner color="primary-inverse" class="q-mr-sm" />
      <b>Robby AI</b> distributed to all our subscribers...
    </div>
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
    <q-item-label class="text-right text-caption text-primary-inverse"
      >Last checked:
      <b>{{ status === 'checking' ? 'in progress' : date }}</b></q-item-label
    >
    <q-item-label class="text-right text-caption text-primary-inverse"
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
