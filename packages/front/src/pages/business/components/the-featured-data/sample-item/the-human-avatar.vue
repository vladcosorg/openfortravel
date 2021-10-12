<template>
  <sample-item-avatar :name="name">
    <img v-if="male" alt="" src="../../../../../assets/man.svg" />
    <img v-else alt="" src="../../../../../assets/girl.svg" />
  </sample-item-avatar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import SampleItemAvatar from '@/front/src/pages/business/components/the-featured-data/sample-item/sample-item-avatar.vue'

const props = defineProps<{ male: boolean }>()
const name = ref(props.male ? 'Peter' : 'Jasmine')

defineExpose({ name })
</script>
