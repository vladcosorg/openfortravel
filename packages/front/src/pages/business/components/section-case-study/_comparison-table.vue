<template>
  <q-markup-table flat separator="vertical" class="bg-elevation-1 table">
    <thead>
      <tr>
        <th />
        <th>
          <span class="text-subtitle1">Before</span>
        </th>
        <th>
          <span class="text-subtitle1">After</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="bg-elevation-1">
        <td />
        <td>
          <div class="text-subtitle1 text-center">An in-house department</div>
        </td>
        <td>
          <div class="text-subtitle1 text-center">
            Openfortravel Advisory Platform
          </div>
        </td>
      </tr>
      <item-row>
        <template #label> Reccuring Expenses </template>
        <template #before-primary> $$$$$ </template>
        <template #before-secondary> ~$35,000 annualy / employee </template>
        <template #after-primary> $ </template>
        <template #after-secondary>~70x cheaper</template>
      </item-row>
      <item-row>
        <template #label> Customer service workload </template>
        <template #before-primary> High </template>
        <template #before-secondary
          >~48 travel restriction-related requests / 24h
        </template>
        <template #after-primary> Low/None </template>
        <template #after-secondary>
          ~2 travel restriction-related requests / 24h</template
        >
      </item-row>

      <item-row>
        <template #label>Upfont cost</template>
        <template #before-primary> $$$$$ </template>
        <template #before-secondary
          >Including development time and training
        </template>
        <template #after-primary> Free </template>
        <template #after-secondary>
          No setup fees / No training necessary</template
        >
      </item-row>
      <item-row>
        <template #label>Accuracy and completeness</template>
        <template #before-primary> Low </template>
        <template #before-secondary
          >According to their customers, the information was incomplete, missing
          crucial elements and would often contradict official travel
          restrictions.
        </template>
        <template #after-primary> Very high </template>
        <template #after-secondary
          >Thanks to our AI bot algorythms and multi-tiers verification system,
          we are able to provide very accurate restriction
          information.</template
        >
      </item-row>
      <item-row>
        <template #label>Update frequency</template>
        <template #before-primary> Low </template>
        <template #before-secondary>At most once per 3d per country </template>
        <template #after-primary> Very high </template>
        <template #after-secondary
          >We perform at least 8-10 verifications and updates (if necessary) for
          each country every day.</template
        >
      </item-row>
    </tbody>
  </q-markup-table>
</template>

<style lang="scss" scoped>
.table {
  @media (max-width: $breakpoint-xs-max) {
    $pad: map-get($space-md, 'x');
    margin-left: -$pad;
    margin-right: -$pad;
  }

  &::v-deep th,
  &::v-deep td {
    vertical-align: top;
    display: table-cell;
    white-space: normal !important;
    font-size: inherit;
    text-align: center;

    @media (max-width: $breakpoint-xs-max) {
      padding-left: 8px;
      padding-right: 8px;
    }
  }

  @media (max-width: $breakpoint-xs-max) {
    $pad: map-get($space-md, 'x');
    margin-left: -$pad;
    margin-right: -$pad;
  }
}
</style>

<script lang="ts" setup>
import ItemRow from '@/front/src/pages/business/components/section-case-study/_item-row.vue'
</script>
