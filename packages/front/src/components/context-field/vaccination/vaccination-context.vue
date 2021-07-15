<template>
  <vaccine-dropdown v-model="value" label="Vaccination status">
    <template #hint>
      <hint>
        The fact whether you're vaccinated or not dramatically changes the
        restrictions applied to you. <br />
        Moreover, certain vaccines are not approved in some countries, thus if
        you're vaccinated with an <b>unapproved</b> vaccine, you may not benefit
        from priviledges offered to vaccinated travellers.
      </hint>
    </template>
  </vaccine-dropdown>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import Hint from '@/front/src/components/context-field/helpers/hint.vue'
import VaccineDropdown from '@/front/src/components/context-field/helpers/vaccine-dropdown.vue'
import { useModel } from '@/front/src/components/context-field/vaccination/composables'

export default defineComponent({
  components: { Hint, VaccineDropdown },
  inheritAttrs: false,
  setup() {
    const value = useModel()
    return {
      value,
    }
  },
})
</script>
