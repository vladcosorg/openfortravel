<template>
  <section class="" style="background-color: var(--q-primary-inverse)">
    <div class="container-roomy">
      <div>
        <div class="text-h6 text-uppercase text-primary-subtle q-mb-sm">
          <span class="bg-elevation-1 q-pa-sm rounded-borders"
            >DON'T TRY THIS AT WORK!</span
          >
        </div>
        <div class="text-h2" style="font-weight: bold">
          Top 5 <span class="text-negative">mistakes</span> that drive down the
          engagement or why it is not going to be the same
        </div>
        <div class="text-h4 text-primary-subtle">
          Free integration by our specialists in under 1 day.
        </div>
      </div>
      <div class="row q-col-gutter-xl">
        <div />
        <div class="col">
          Method 1. 2Avoid publishing any COVID-related travel information on
          your website, hoping that your customers would google it and pretend
          the pandemic does not exist.
          <br />
          Method 2. Refer customers to the countrie's embassy website's and ask
          them to read it themselves.
          <br />
          Method 32. Copy-paste relevant information for your customers from the
          embasy website periodically.
          <br />
          Method 4. Invest significan financial and time resources in order to
          maintain a database of relevant information for your customers.
        </div>
        <q-icon class="col-3" color="negative" :name="icon" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { matWarning as icon } from '@quasar/extras/material-icons'
</script>
