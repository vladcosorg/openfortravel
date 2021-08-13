<template>
  <p v-if="languages && languages.length">
    A valid document must be presented in
    <seq v-slot="{ item }" :items="languages" conjunction="or"
      ><language :code="item" /></seq
    >.
  </p>
  <p v-else>
    Currently there is no info if the document has to be presented in original
    or has to be translated to the local language. Please check with the
    embassy.
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Language from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/language.vue'
import Seq from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/seq.vue'

import type { PropType } from 'vue'

export default defineComponent({
  components: { Seq, Language },
  props: {
    languages: {
      type: Array as PropType<string[]>,
      required: false,
    },
  },
})
</script>
