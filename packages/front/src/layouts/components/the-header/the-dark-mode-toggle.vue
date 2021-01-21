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
import { computed, defineComponent } from '@vue/composition-api'

export default defineComponent({
  components: {},
  props: {},
  setup(_props, { root }) {
    const cookieValue = root.$q.cookies.get<number | null>('dark')
    if (cookieValue !== null) {
      root.$q.dark.set(cookieValue === 1)
    }

    const darkMode = computed<boolean>({
      get() {
        return root.$q.dark.isActive
      },
      set(newDarkModeStatus) {
        root.$q.dark.set(newDarkModeStatus)
        root.$q.cookies.set('dark', newDarkModeStatus ? '1' : '0', {
          path: '/',
        })
      },
    })

    return { darkMode, lightIcon, darkIcon }
  },
})
</script>
