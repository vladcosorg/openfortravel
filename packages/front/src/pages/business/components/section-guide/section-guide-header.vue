<template>
  <q-item>
    <q-item-section>
      <transition appear mode="out-in">
        <q-item-label :key="headerTitle" overline class="text-uppercase">{{
          headerTitle
        }}</q-item-label>
      </transition>
      <q-item-label caption>
        <q-skeleton height="10px" width="150px" animation="none" />
      </q-item-label>
    </q-item-section>
    <q-item-section avatar>
      <q-icon
        color="grey"
        text-color="white"
        :name="menuIcon"
        size="2rem"
        square
      />
    </q-item-section>
  </q-item>
</template>

<script lang="ts" setup>
import { matMenu as menuIcon } from '@quasar/extras/material-icons'
import { computed, onMounted, ref } from 'vue'

const availableTitles = [
  'Your insurance company',
  'Your travel company',
  'Your rental company',
  'Your booking company',
  'Your airline company',
]
const currentTitleIndex = ref(0)
onMounted(() => {
  const titleCount = availableTitles.length
  setInterval(
    () =>
      currentTitleIndex.value + 1 < titleCount
        ? currentTitleIndex.value++
        : (currentTitleIndex.value = 0),
    1500,
  )
})
const headerTitle = computed(() => availableTitles[currentTitleIndex.value])
</script>
