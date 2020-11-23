<template>
  <img v-if="lowQuality" height="100%" :src="url" />
  <q-img
    v-else
    spinner-size="20px"
    :src="url"
    height="100%"
    :placeholder-src="placeholder"
  />
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
    lowQuality: {
      type: Boolean,
      default: false,
    },
    countryCode: {
      type: String,
      required: true,
    },
  },
  setup(prop) {
    const placeholder = computed<string>(() => {
      // eslint-disable-next-line no-undef,import/extensions
      return require(`src/assets/sqip-flags/${prop.countryCode}.webp`)
    })
    const url = computed<string>(() => {
      if (prop.lowQuality) {
        return placeholder.value
      }

      return prop.png
        ? // eslint-disable-next-line no-undef,import/extensions
          require(`svg-country-flags/png100px/${prop.countryCode}.png`)
        : // eslint-disable-next-line no-undef,import/extensions
          require(`svg-country-flags/svg/${prop.countryCode}.svg`)
    })

    return {
      url,
      placeholder,
    }
  },
})
</script>
