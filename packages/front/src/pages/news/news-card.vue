<template>
  <div>
    <q-card class="card" flat tag="a" :href="to">
      <q-img
        width="900"
        height="600"
        :src="`https://images.unsplash.com/photo-${unsplashId}?auto=format&fit=crop&w=700&q=80`"
      >
        <div class="absolute-full flex">
          <div class="self-end">
            <div class="text-h6 text-capitalize">
              <span class="bg-primary-inverse">
                <slot name="title" />
              </span>
            </div>
          </div>
        </div>
      </q-img>
    </q-card>
  </div>
</template>

<style lang="sass" scoped>
.card:hover
  filter: contrast(80%)
</style>

<script lang="ts" setup>
defineProps({
  to: {
    type: String,
  },
  unsplashId: {
    type: String,
    required: true,
  },
})
</script>
