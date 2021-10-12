<template>
  <div class="q-gutter-y-sm">
    <q-item class="q-pa-none">
      <transition-group
        appear
        enter-active-class="animated fadeInRight"
        leave-active-class="animated fadeOut"
      >
        <the-robot-avatar key="ai" />
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
        <the-human-avatar
          v-if="showHuman"
          ref="humanRef"
          key="avatar"
          :male="avatarType"
        />
      </transition-group>
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
    const showHuman = ref(props.status !== 'checking')
    const humanName = computed(() =>
      humanRef.value ? humanRef.value.name : '',
    )

    return {
      avatarType,
      showHuman,
      humanRef,
      humanName,
    }
  },
})
</script>
