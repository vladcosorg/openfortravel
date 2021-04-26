<template>
  <component :is="node.type" v-if="componentExists" v-model="internalOptions" />
</template>

<style lang="scss" module></style>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api'
import camelCase from 'lodash/camelCase'

import { QuasarRestrictionTreeNode } from '@/admin/src/pages/edit/components/restriction-tree.vue'
import Age from '@/admin/src/pages/edit/components/restriction-tree/fields/age.vue'
import Citizenship from '@/admin/src/pages/edit/components/restriction-tree/fields/citizenship.vue'
import DidNotVisitCountries from '@/admin/src/pages/edit/components/restriction-tree/fields/did-not-visit-countries.vue'
import OnlineApplication from '@/admin/src/pages/edit/components/restriction-tree/fields/online-application.vue'
import Origin from '@/admin/src/pages/edit/components/restriction-tree/fields/origin.vue'
import PcrTest from '@/admin/src/pages/edit/components/restriction-tree/fields/pcr-test.vue'
import Quarantine from '@/admin/src/pages/edit/components/restriction-tree/fields/quarantine.vue'
import Recovery from '@/admin/src/pages/edit/components/restriction-tree/fields/recovery-certificate.vue'
import Vaccinated from '@/admin/src/pages/edit/components/restriction-tree/fields/vaccinated.vue'

const capitalize = (string: string): string =>
  string[0].toUpperCase() + string.slice(1)
const components = {
  PcrTest,
  Vaccinated,
  Origin,
  OnlineApplication,
  Quarantine,
  Citizenship,
  Recovery,
  Age,
  DidNotVisitCountries,
}

export default defineComponent({
  components,
  model: {
    prop: 'node',
  },
  props: {
    node: {
      type: Object as PropType<QuasarRestrictionTreeNode>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const componentExists = computed(
      () => capitalize(camelCase(props.node.type)) in components,
    )
    const internalOptions = computed({
      get() {
        return props.node.options ?? {}
      },
      set(value) {
        emit('input', Object.assign({}, props.node, { options: value }))
      },
    })
    return { internalOptions, componentExists }
  },
})
</script>
