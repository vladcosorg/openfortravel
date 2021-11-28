<template>
  <div class="q-gutter-y-sm">
    <q-item class="q-pa-none">
      <the-status-line
        key="content"
        :human-name="humanName"
        :visible="visible"
        :time="time"
        :status="status"
        :country="country"
        v-bind="$attrs"
        @humanInput="showHuman = true"
      />
      <q-item-section avatar class="q-gutter-y-md">
        <the-robot-avatar key="ai" />
        <the-human-avatar
          ref="humanRef"
          key="avatar"
          :class="[
            initialHumanVisibility
              ? ''
              : showHuman
              ? 'animated fadeInLeft'
              : 'invisible',
          ]"
          :male="avatarType"
        />
      </q-item-section>
    </q-item>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'

import { ItemStatus } from '@/front/src/pages/business/components/section-featured-data.vue'
import TheHumanAvatar from '@/front/src/pages/business/components/the-featured-data/sample-item/the-human-avatar.vue'
import TheRobotAvatar from '@/front/src/pages/business/components/the-featured-data/sample-item/the-robot-avatar.vue'
import TheStatusLine from '@/front/src/pages/business/components/the-featured-data/sample-item/the-status-line.vue'

let man = true
export default defineComponent({
  components: { TheStatusLine, TheRobotAvatar, TheHumanAvatar },
  inheritAttrs: false,
  props: {
    country: {
      type: String,
      required: true,
    },
    time: {
      type: Date,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
    status: {
      type: String as PropType<ItemStatus>,
    },
  },
  setup(props) {
    man = !man

    const humanRef = ref()
    const avatarType = ref(man)
    const initialHumanVisibility = ref(props.status !== 'checking')
    const showHuman = ref(initialHumanVisibility.value)
    const humanName = computed(() =>
      humanRef.value ? humanRef.value.name : '',
    )

    return {
      avatarType,
      showHuman,
      humanRef,
      humanName,
      initialHumanVisibility,
    }
  },
})
</script>
