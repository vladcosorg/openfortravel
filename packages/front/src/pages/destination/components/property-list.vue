<template>
  <q-list :class="[$style.list, 'text-subtitle1']">
    <widget-header
      :title="$t('page.destination.widgets.summary.title')"
      :subtitle="$t('page.destination.widgets.summary.subtitle')"
    />
    <q-item
      v-for="(item, index) in properties"
      :key="index"
      class="rounded-borders"
      style="border: 1px solid var(--q-color-primary-elevated)"
    >
      <q-item-section avatar>
        <q-avatar
          v-if="item"
          color="elevation-1"
          text-color="info"
          size="xl"
          :icon="item.icon"
        />
        <q-skeleton v-else type="QAvatar" />
      </q-item-section>

      <q-item-section side style="width: 100%">
        <q-item-label v-if="item" style="line-height: 1.4em !important">
          <span :class="[$style.label]">{{ item.label }}</span>
          <span :class="[item.valueClasses, $style.value]">
            {{ item.value }}
          </span>
        </q-item-label>
        <q-skeleton v-else :width="randWidth()" type="rect" />

        <q-item-label
          v-if="item"
          caption
          class="text-primary-subtle q-pt-xs"
          v-html="item.caption"
        />
        <q-skeleton v-else :width="randWidth()" type="text" />

        <q-item-label v-if="item && item.badges">
          <q-badge
            v-for="(badge, key) in item.badges"
            :key="key"
            outline
            :color="badge.color"
            :label="badge.label"
          />
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<style lang="scss" module>
.list {
  :global {
    $margin: map-get($space-md, 'x');
    .q-item {
      padding: $margin 0 $margin $margin;
    }
    .q-item + .q-item {
      margin-top: #{$margin};
    }
  }
}

.label {
  @media (max-width: $breakpoint-xs-max) {
    display: block;
  }
  @media (min-width: $breakpoint-md-min) {
    &:after {
      content: ':';
    }
  }
}

.value {
  font-weight: bold;
}
</style>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api'

import WidgetHeader from '@/front/src/pages/destination/components/widget-header.vue'
import { getSummaryItems } from '@/front/src/pages/destination/destination-summary'
import { Destination } from '@/shared/src/api/destinations/models'
import { Restriction } from '@/shared/src/api/restrictions/models'
import { createGeneratorForRandomIntegerInRange } from '@/shared/src/misc/misc'

export default defineComponent({
  components: { WidgetHeader },
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    destination: {
      type: Object as PropType<Destination>,
    },
    restriction: {
      type: Object as PropType<Restriction>,
    },
  },
  setup(props) {
    const properties = computed(() => {
      if (props.isLoading || !props.destination || !props.restriction) {
        return Array.from({ length: 5 })
      }

      return getSummaryItems(props.restriction, props.destination)
    })

    return {
      properties,
      randWidth: createGeneratorForRandomIntegerInRange(10, 100, '%'),
    }
  },
})
</script>
