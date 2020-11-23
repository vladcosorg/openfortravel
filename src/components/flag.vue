<template>
  <img v-if="lowQuality" height="100%" :src="url" />
  <q-img
    v-else
    spinner-size="20px"
    :src="url"
    :srcset="srcset"
    height="100%"
    :placeholder-src="placeholder"
  />
</template>

<script lang="ts">
/* eslint-disable no-undef,import/extensions */
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
      return require(`src/assets/sqip-flags/${prop.countryCode}.webp`)
    })
    const url = computed<string>(() => {
      if (prop.lowQuality) {
        return placeholder.value
      }

      return prop.png
        ? require(`svg-country-flags/png100px/${prop.countryCode}.png`)
        : require(`svg-country-flags/svg/${prop.countryCode}.svg`)
    })

    const srcset = computed(() => {
      if (prop.lowQuality) {
        return placeholder.value
      }

      return [
        require(`svg-country-flags/png100px/${prop.countryCode}.png`) + ' 1x',
        require(`svg-country-flags/png250px/${prop.countryCode}.png`) + ' 2x',
        require(`svg-country-flags/svg/${prop.countryCode}.svg`) + ' 3x',
      ].join(', ')
    })

    return {
      url,
      placeholder,
      srcset,
    }
  },
})
</script>
