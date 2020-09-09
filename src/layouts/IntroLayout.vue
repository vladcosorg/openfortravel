<template>
  <q-layout view="hhr lpr ffr">
    <!--    <q-header reveal style="background-color: #222930">-->
    <!--      <q-toolbar class=" q-px-md q-py-md">-->
    <!--        <q-icon :name="`img:${logo}`" style=" height: auto; width: 100px"/>-->
    <!--        <q-space />-->
    <!--        <language-switcher/>-->
    <!--      </q-toolbar>-->
    <!--    </q-header>-->
    <q-page-container
      :class="[$style.container, 'window-height', 'montserrat',  'column',  'text-center', 'justify-between']">

      <div :class="['col-auto relative-position']">
        <div :class="[$style.logoBg, 'col-auto relative-position']"></div>
        <div :class="$style.logoBg"></div>
        <q-icon :class="$style.logo" :name="`img:${logo}`"/>
        <language-switcher :class="[$style.lang, 'q-pr-lg']"/>
      </div>

      <div class="col-3  text-h5 row items-center q-px-lg">
        Find out which destinations are open or reopening soon
      </div>
      <div class="col-3  column items-center position-relative">
        <animated-arrow/>
        <q-icon :class="[$style.boy]" :name="`img:${boy}`"/>
      </div>

      <div class="col-3 column justify-end q-mb-xl q-px-lg">
        <div :class="[$style.intro, 'q-mb-md']">{{ $t('intro.title') }}</div>
        <country-list/>
      </div>
      <!--      <router-view/>-->
    </q-page-container>

  </q-layout>
</template>

<style lang="scss" module>
.container {
  background-color: #222930;
  color: white;
}

.lang {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%)
}

.boy {
  height: auto;
  width: 80%;
}

@keyframes:global(slideInFromLeft) {
  0% {
    width: 100vw;
  }
  100% {
    width: 140px;
  }
}

.logo {
  height: auto;
  width: 140px;
}

.logoBg {
  background-color: $secondary;
  position: absolute;
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;

  :global {
    animation: 1s ease-out 1s 1 normal forwards running slideInFromLeft;
  }
}

.intro {
  font-weight: bold;
  font-size: 1.3rem;
  color: $secondary
}

</style>

<script lang="ts">
import LanguageSwitcher from 'components/LanguageSwitcher.vue'
import CountryList from 'components/CountryList.vue'
import AnimatedArrow from 'components/AnimatedArrow.vue'
import { defineComponent } from '@vue/composition-api'
import logo from 'src/assets/logo.svg'
import boy from 'src/assets/boy.svg'
import arrow from 'src/assets/arrow.svg'

export default defineComponent({
  name: 'MainLayout',
  components: { LanguageSwitcher, CountryList, AnimatedArrow },

  setup () {
    return { logo, boy, arrow }
  }
})
</script>
