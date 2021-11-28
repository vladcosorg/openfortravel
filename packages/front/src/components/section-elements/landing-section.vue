<template>
  <section class="relative-positions">
    <slot name="root" />
    <div class="container-roomy">
      <div class="row q-col-gutter-xl">
        <div class="col-12 col-sm q-gutter-y-xl">
          <div class="q-gutter-sm">
            <div
              v-if="$slots.badge"
              class="text-h6 text-uppercase text-primary-subtle"
            >
              <slot name="badge" />
            </div>
            <h2
              :class="[
                ' text-capitalize',
                thinTitle ? 'text-normal' : 'text-bold',
              ]"
            >
              <slot name="title" />
            </h2>
            <h5
              v-if="$slots.subtitle"
              class="text-primary-subtle text-normal lh-base"
            >
              <slot name="subtitle" />
            </h5>
          </div>
          <slot name="content" />
        </div>
        <div
          v-if="$slots['featured-content']"
          :class="[
            'col-12',
            'column',
            `col-sm-${featuredContentColSize}`,
            {
              'order-first': opposite,
            },
          ]"
        >
          <slot name="featured-content" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    featuredContentColSize?: number
    thinTitle?: boolean
    opposite?: boolean
  }>(),
  { featuredContentColSize: 6 },
)
</script>
