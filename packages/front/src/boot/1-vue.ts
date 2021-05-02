import type { ComponentOptions } from 'vue';
import Vue from 'vue'
import LazyHydrate from 'vue-lazy-hydration'
import VueSocialSharing from 'vue-social-sharing'

Vue.component('LazyHydrate', LazyHydrate as ComponentOptions<Vue>)
Vue.use(VueSocialSharing)
