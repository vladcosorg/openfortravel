<template>
  <tr class="table-row">
    <td class="table-row-label">
      <span class="text-subtitle2 text-bold text-capitalize"
        ><slot name="label"
      /></span>
    </td>
    <td class="text-center">
      <div class="before-criteria text-negative text-subtitle1">
        <slot name="before-primary" />
      </div>

      <div class="text-primary-subtle"><slot name="before-secondary" /></div>
    </td>
    <td class="text-center">
      <div class="after-criteria text-positive text-subtitle1">
        <slot name="after-primary" />
      </div>
      <div class="text-primary-subtle"><slot name="after-secondary" /></div>
    </td>
  </tr>
</template>

<style lang="scss" scoped>
.table-row-label {
  text-align: left !important;
}
.after-criteria,
.before-criteria {
  font-weight: bold !important;
}
</style>
