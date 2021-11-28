<template>
  <q-stepper
    class="stepper"
    :header-nav="false"
    vertical
    :animated="false"
    color="primary"
    flat
    :keep-alive="false"
    :bordered="false"
    done-color="primary"
    active-color="accent"
    :active-icon="currentStepIcon"
    :done-icon="doneStepIcon"
    :inactive-icon="currentStepIcon"
  >
    <guide-item
      v-slot="{ next }"
      v-bind="$attrs"
      title="Where are you travelling from?"
      :step="1"
    >
      <input-writer model-value="Moldova" @finishedTyping="next" />
    </guide-item>
    <guide-item
      v-slot="{ next }"
      v-bind="$attrs"
      title="When do you plan to travel?"
      :step="2"
    >
      <input-writer :model-value="tomorrowDate" @finishedTyping="next" />
    </guide-item>

    <guide-item
      v-slot="{ next }"
      v-bind="$attrs"
      title="What is your citizenship?"
      :step="3"
    >
      <input-writer model-value="Moldova, Romania" @finishedTyping="next" />
    </guide-item>

    <guide-item
      v-slot="{ next }"
      v-bind="$attrs"
      title="What other countries have you visited recently?"
      :step="4"
    >
      <input-writer model-value="India, Singapore" @finishedTyping="next" />
    </guide-item>

    <guide-item
      v-slot="{ next }"
      v-bind="$attrs"
      title="Are you vaccinated?"
      :step="5"
    >
      <div class="q-gutter-x-xs">
        <clicked-button
          size="sm"
          :activate="500"
          color="primary"
          text-color="primary-inverse"
          unelevated
          label="Fully vaccinated"
          dense
          @click="next('Fully vaccinated')"
        />
        <q-btn
          size="sm"
          color="primary"
          text-color="primary-inverse"
          unelevated
          label="Partially vaccinated"
          dense
        />
        <q-btn
          size="sm"
          color="primary"
          text-color="primary-inverse"
          unelevated
          label="Not vaccinated"
          dense
        />
      </div>
    </guide-item>
    <guide-item
      v-slot="{ next }"
      v-bind="$attrs"
      title="What kind of vaccine?"
      :step="6"
    >
      <input-writer model-value="Pfizer" @finishedTyping="next" />
    </guide-item>
    <guide-item v-bind="$attrs" title="Finish" :step="7" is-last caption="">
      <clicked-button size="md" color="primary" label="Go to results" />
    </guide-item>
  </q-stepper>
</template>

<style scoped lang="scss">
.stepper {
  background-color: transparent;
  border: none;
  padding: 0;

  &::v-deep .q-stepper__title {
    font-size: 18px;
    line-height: 25px;
  }
  &::v-deep .q-stepper__caption {
    font-size: 16px;
    color: var(--q-primary);
  }
  &::v-deep .q-stepper__tab--done .q-stepper__caption {
    color: var(--q-positive);
  }
}
</style>

<script lang="ts" setup>
import {
  matBolt as currentStepIcon,
  matCheck as doneStepIcon,
} from '@quasar/extras/material-icons'

import GuideItem from '@/front/src/pages/business/components/section-guide/_guide-item.vue'
import ClickedButton from '@/front/src/pages/business/components/section-guide/clicked-button.vue'
import InputWriter from '@/front/src/pages/business/components/section-guide/input-writer.vue'

const tomorrowDate = new Date(
  Date.now() + 24 * 60 * 60 * 1000,
).toLocaleDateString()
</script>
