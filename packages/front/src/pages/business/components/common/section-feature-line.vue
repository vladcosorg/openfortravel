<template>
  <div class="row items-center q-gutter-x-md no-wrap">
    <q-icon class="col-auto" size="30px" :color="color" :name="icon" />
    <span v-if="!content"><slot /></span>
    <span v-else-if="content && !Array.isArray(content)">{{ content }}</span>
    <div v-else>
      <div>{{ content[0] }}</div>
      <div class="text-subtitle1 text-primary-subtle">{{ content[1] }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  matDone as positiveIcon,
  matThumbDownAlt as negativeIcon,
} from '@quasar/extras/material-icons'
import { computed } from 'vue'

const props =
  defineProps<{ negative?: boolean; content?: [string, string] | string }>()
const icon = computed(() => (props.negative ? negativeIcon : positiveIcon))
const color = computed(() => (props.negative ? 'negative' : 'positive'))
</script>
