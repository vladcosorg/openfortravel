<template>
  <section class="q-pt-xl section">
    <div class="container q-my-sm-xl">
      <div class="q-mb-sm-xl q-pb-xl text-center">
        <h3 class="text-bold">Get personalized advice</h3>
        <h5 class="text-subtitle1">
          Please fill out the fields below to get information about travel
          restrictions that apply specifically to you
        </h5>
      </div>

      <div class="row justify-center">
        <div class="gt-sm col-md-6 assistant" />
        <div class="col-md col-sm-10 col-12 q-pa-md-lg rounded-borders">
          <guide />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
.assistant
  background-image: url('../../../assets/trainer.svg')
  background-repeat: no-repeat
  background-position: 0% bottom
  background-size: auto

.section
  background-color: #272f56
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
