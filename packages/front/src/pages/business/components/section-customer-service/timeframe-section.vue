<template>
  <div
    :class="[
      'col-12 col-sm-6 q-pa-lg panel',
      {
        'bg-elevation-1': currentId === id,
      },
    ]"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div>
      <div class="text-primary-subtle text-subtitle1 q-mb-xl">
        <slot name="title" />
      </div>
    </div>
    <div class="q-gutter-y-md">
      <slot name="content" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ id: string; currentId: string }>()
const emit = defineEmits<{
  (e: 'activation', id: string): void
  (e: 'deactivation'): void
}>()

const onMouseEnter = () => {
  emit('activation', props.id)
}

const onMouseLeave = () => emit('deactivation')
</script>
