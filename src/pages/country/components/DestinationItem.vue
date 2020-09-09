<template>
  <q-expansion-item
    :label="destination.country.label"
    :icon="destination.country.flag"
  >
    <q-card>
      <q-card-section>
        Lodrem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
        commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
        eveniet doloribus ullam aliquid.
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<style lang="scss">
</style>
<script lang="ts">
import {
  defineComponent, PropType
} from '@vue/composition-api'
import { FormattedDestinationCountry } from 'components/models'
import { getFlagForCountryCode } from 'src/misc/I18nCountryList'

export default defineComponent({
  props: {
    destination: {
      required: true,
      type: Object as PropType<FormattedDestinationCountry>
    }
  },
  setup (props, { root }) {
    return { getFlagForCountryCode }
  }
})
</script>
