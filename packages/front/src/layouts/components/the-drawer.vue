<template>
  <q-drawer v-bind="$attrs" v-on="$listeners">
    <q-scroll-area class="fit">
      <q-list padding>
        <q-item v-ripple clickable>
          <q-item-section>
            <q-item-label>TExt</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-my-md" />

        <q-item v-ripple clickable>
          <q-item-section>
            <q-item-label>TExt</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<style lang="scss" module></style>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  components: {},
  props: {},
  setup(props) {
    return {}
  },
})
</script>
