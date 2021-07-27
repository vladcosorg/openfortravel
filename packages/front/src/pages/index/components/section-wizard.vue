<template>
  <section class="q-py-xl section">
    <div class="container">
      <div class="text-center">
        <h3 class="text-bold">Get personalized restrictions</h3>
        <h5 class="text-subtitle1">
          Countries include sovereign states, overseas terriotories
        </h5>
      </div>
      <guide />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.section {
  background-image: url('../../../assets/trainer.svg');
  background-repeat: no-repeat;
  background-position: 90% bottom;
  background-color: #272f56;
  background-size: auto 90%;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'

import Guide from '@/front/src/pages/guide/components/guide.vue'
import GuidePage from '@/front/src/pages/guide/guide-page.vue'

export default defineComponent({
  components: { Guide, GuidePage },
  props: {},
  setup(props) {
    return {}
  },
})
</script>
