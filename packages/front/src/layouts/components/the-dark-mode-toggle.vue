}
<template>
  <q-item v-ripple tag="label">
    <q-item-section>
      <q-item-label>Dark mode</q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-toggle
        v-model="darkMode"
        keep-color
        color="dark-blue"
        icon-color="yellow-12"
        :checked-icon="darkIcon"
        :unchecked-icon="lightIcon"
      />
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import {
  matWbSunny as lightIcon,
  matBrightness3 as darkIcon,
} from '@quasar/extras/material-icons'
import { computed, defineComponent } from '@vue/composition-api'

export default defineComponent({
  components: {},
  props: {},
  setup(_props, { root }) {
    const darkMode = computed<boolean>({
      get() {
        return root.$q.dark.isActive
      },
      set(newDarkModeStatus) {
        root.$q.dark.set(newDarkModeStatus)
        root.$q.cookies.set('dark', newDarkModeStatus, {
          path: '/',
        })
      },
    })

    darkMode.value = root.$q.cookies.get('dark') ?? true

    return { darkMode, lightIcon, darkIcon }
  },
})
</script>
