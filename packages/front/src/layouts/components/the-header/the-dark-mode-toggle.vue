}
<template>
  <q-item tag="label">
    <q-item-section>
      <q-item-label>{{ $t('components.drawer.darkMode') }}</q-item-label>
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
import { useQuasar } from 'quasar'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  components: {},
  props: {},
  setup() {
    const cookieValue = useQuasar().cookies.get<number | null>('dark')
    if (cookieValue !== null) {
      useQuasar().dark.set(cookieValue === 1)
    }

    const darkMode = computed<boolean>({
      get() {
        return useQuasar().dark.isActive
      },
      set(newDarkModeStatus) {
        useQuasar().dark.set(newDarkModeStatus)
        useQuasar().cookies.set('dark', newDarkModeStatus ? '1' : '0', {
          path: '/',
        })
      },
    })

    return { darkMode, lightIcon, darkIcon }
  },
})
</script>
