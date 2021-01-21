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
import {
  outlinedLocalPolice as borderIcon,
  outlinedCoronavirus as testIcon,
  outlinedMedicalServices as insuranceIcon,
  outlinedHttps as houseIcon,
  outlinedBallot as declarationIcon,
} from '@quasar/extras/material-icons-outlined'
import { computed, defineComponent, PropType } from '@vue/composition-api'

import PropertyListPlaceholders from '@/front/src/pages/destination/components/property-list-placeholders.vue'
import { Destination } from '@/shared/src/api/destinations/models'
import {
  Restriction,
  RestrictionStatus,
} from '@/shared/src/api/restrictions/models'
import { useVueI18n } from '@/shared/src/composables/use-plugins'

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
    const { t } = useVueI18n()
    const statusMap = {
      [RestrictionStatus.ALLOWED]: '',
      [RestrictionStatus.CONDITIONAL]: 'text-warning',
      [RestrictionStatus.FORBIDDEN]: 'text-negative',
      [RestrictionStatus.ALLOWED_SOON]: 'text-info',
    }

    const properties = computed(() => [
      {
        label: t('restriction.travel.label'),
        value: t(`restriction.travel.value.${props.restriction.status}`),
        caption: 'No additional requirements at the border',
        icon: borderIcon,
        valueClasses: statusMap[props.restriction.status],
      },
      {
        label: t('restriction.testing.label'),
        value: t(`restriction.testing.value.${props.restriction.testRequired}`),
        caption: 'No additional requirements at the border',
        valueClasses: props.restriction.testRequired ? 'text-negative' : '',
        icon: testIcon,
      },
      {
        label: t('restriction.insurance.label'),
        value: t(
          `restriction.insurance.value.${props.restriction.insuranceRequired}`,
        ),
        caption: 'No additional requirements at the border',
        icon: insuranceIcon,
        valueClasses: props.restriction.insuranceRequired
          ? 'text-negative'
          : '',
      },
      {
        label: t('restriction.healthDeclaration.label'),
        value: t(
          `restriction.healthDeclaration.value.${
            props.destination.isHealthDeclarationRequired ? 'true' : 'false'
          }`,
        ),
        caption: 'No additional requirements at the border',
        icon: declarationIcon,
      },
      {
        label: t('restriction.selfIsolation.label'),
        value:
          props.restriction.selfIsolation > 0
            ? t('restriction.selfIsolation.days', {
                number: props.restriction.selfIsolation,
              })
            : t('restriction.selfIsolation.staticValue.false'),
        caption: 'No additional requirements at the border',
        icon: houseIcon,
        valueClasses:
          props.restriction.selfIsolation > 0 ? 'text-negative' : 'text-info',
      },
    ])

    return {
      properties,
    }
  },
})
</script>
