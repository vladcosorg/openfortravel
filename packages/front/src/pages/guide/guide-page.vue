<template>
  <q-page :class="['column']">
    <section class="container q-my-lg">
      <h3 class="text-bold text-center">COVID-19 Travel Wizard</h3>
      <div class="row justify-center">
        <q-stepper
          v-model="step"
          :class="[$style.stepper, 'col-12 col-md-6']"
          vertical
          flat
          active-color="accent"
          done-color="secondary"
          :done-icon="doneIcon"
          :inactive-icon="editIcon"
          :active-icon="editIcon"
          header-nav
        >
          <template #default>
            <step-welcome :step.sync="step" />
            <step-origin v-model="profile" :step.sync="step" />
            <step-citizenship v-model="profile" :step.sync="step" />
            <step-vaccination v-model="profile" :step.sync="step" />
            <step-recovery
              v-if="showRecoveryStep"
              v-model="profile"
              :step.sync="step"
            />
            <step-visited v-model="profile" :step.sync="step" />
            <step-final v-model="profile" :step.sync="step" />
          </template>
        </q-stepper>
      </div>
    </section>
  </q-page>
</template>

<style lang="scss" module>
.stepper {
  :global {
    .q-stepper__tab {
      padding: 12px 0;
    }
    .q-stepper__step-inner {
      padding-left: 35px;
    }
    .q-stepper__dot {
      font-size: 1.5rem;
      line-height: 0;
      min-width: 40px;
      width: 40px;
      height: 40px;
    }
    .q-stepper__title {
      font-size: 1.2rem;
      line-height: 1.3em;
    }
  }
}
</style>

<script lang="ts">
import {
  matDone as doneIcon,
  matEdit as editIcon,
} from '@quasar/extras/material-icons'
import { computed, defineComponent, ref } from '@vue/composition-api'

import StepCitizenship from '@/front/src/pages/guide/steps/step-citizenship.vue'
import StepFinal from '@/front/src/pages/guide/steps/step-final.vue'
import StepOrigin from '@/front/src/pages/guide/steps/step-origin.vue'
import StepRecovery from '@/front/src/pages/guide/steps/step-recovery.vue'
import StepVaccination from '@/front/src/pages/guide/steps/step-vaccination.vue'
import StepVisited from '@/front/src/pages/guide/steps/step-visited.vue'
import StepWelcome from '@/front/src/pages/guide/steps/step-welcome.vue'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'
import { VisitorContextType } from '@/shared/src/restriction-tree/visitor-context'
import { useAugmentedStore } from '@/shared/src/composables/use-plugins'

export default defineComponent({
  components: {
    StepFinal,
    StepVisited,
    StepRecovery,
    StepVaccination,
    StepCitizenship,
    StepWelcome,
    StepOrigin,
  },
  props: {},
  setup() {
    const step = ref(1)
    const store = useAugmentedStore()


    const profile = ref<VisitorContextType>({
      [RestrictionNodeType.RECOVERY]: undefined,
      [RestrictionNodeType.VACCINATED]: undefined,
      [RestrictionNodeType.CITIZENSHIP]: [],
      [RestrictionNodeType.DID_NOT_VISIT_COUNTRIES]: [],
    })

    const showRecoveryStep = computed(
      () => !profile.value[RestrictionNodeType.VACCINATED],
    )

    return {
      profile,
      step,
      showRecoveryStep,
      doneIcon,
      editIcon,
    }
  },
})
</script>
