<template>
  <q-list :class="[$style.list, 'text-subtitle1']">
    <template v-if="loading" #default>
      <property-list-placeholders />
    </template>
    <template v-else #default>
      <q-item
        v-for="(item, index) in properties"
        :key="index"
        class="rounded-borders"
        style="border: 1px solid var(--q-color-primary-elevated)"
      >
        <q-item-section avatar>
          <q-avatar
            color="elevation-1"
            text-color="info"
            size="xl"
            :icon="item.icon"
          />
        </q-item-section>

        <q-item-section side>
          <q-item-label style="line-height: 1.4em !important">
            <span :class="[$style.label]">{{ item.label }}</span>
            <span :class="[item.valueClasses, $style.value]">
              {{ item.value }}
            </span>
          </q-item-label>
          <q-item-label caption class="text-primary-subtle q-pt-xs">{{
            item.caption
          }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
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

import PropertyListPlaceholders from '@/front/src/pages/destination/components/property-list-placeholders.vue'
import { getSummaryItems } from '@/front/src/pages/destination/destination-summary'
import { Destination } from '@/shared/src/api/destinations/models'
import { Restriction } from '@/shared/src/api/restrictions/models'

export default defineComponent({
  components: { PropertyListPlaceholders },
  props: {
    destination: {
      type: Object as PropType<Destination>,
      required: true,
    },
    restriction: {
      type: Object as PropType<Restriction>,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const properties = computed(() =>
      getSummaryItems(props.restriction, props.destination),
    )

    return {
      properties,
    }
  },
})
</script>
