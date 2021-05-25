<template>
  <img v-if="type === 'blurry'" height="100%" :src="src" />
  <q-img
    v-else
    spinner-size="20px"
    :src="src"
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
    type: {
      type: String,
      default: 'full',
    },
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
    const placeholder = computed<string>(
      () => `flags/blurry/${prop.countryCode}.webp`,
    )

    const src = computed<string>(() => {
      if (prop.type === 'blurry') {
        return `flags/blurry/${prop.countryCode}.webp`
      }

      return `flags/svg/${prop.countryCode}.svg`
    })

    // eslint-disable-next-line vue/return-in-computed-property
    const srcset = computed<string | undefined>(() => {
      if (process.env.DEV) {
        return `flags/svg/${prop.countryCode}.svg`
      }

      if (prop.type === 'responsive') {
        return [
          `flags/1x/${prop.countryCode} 1x`,
          `flags/2x/${prop.countryCode} 2x`,
        ].join(', ')
      }

      return
    })

    return {
      src,
      placeholder,
      srcset,
    }
  },
})
</script>
