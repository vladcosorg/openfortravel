<template>
  <router-link v-if="url" class="text-primary-subtle" :title="title" :to="url">
    {{ label }}
  </router-link>
  <q-skeleton v-else type="text" />
</template>

<style lang="scss" module></style>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  components: {},
  props: {
    title: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    // urlGenerator: {
    //   type: Promise as PropType<Promise<string>>,
    //   required: true,
    // },
  },
  setup(props) {
    const url = ref<string | undefined>()
    // onServerPrefetch(async () => {
    //   url.value = await props.urlGenerator
    // })
    //
    // onMounted(async () => {
    //   url.value = await props.urlGenerator
    // })

    return {
      // url,
    }
  },
})
</script>
