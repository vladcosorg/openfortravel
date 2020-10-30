<template>
  <img loading="lazy" :src="url" />
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

export default defineComponent({
  components: {},
  props: {
    png: {
      type: Boolean,
      default: false,
    },
    countryCode: {
      type: String,
      required: true,
    },
  },
  setup(prop) {
    const url = computed<string>(() => {
      return prop.png
        ? // eslint-disable-next-line no-undef,import/extensions
          require(`svg-country-flags/png100px/${prop.countryCode}.png`)
        : // eslint-disable-next-line no-undef,import/extensions
          require(`svg-country-flags/svg/${prop.countryCode}.svg`)
    })
    return {
      url,
    }
  },
})
</script>
