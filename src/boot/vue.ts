import Vue, { ComponentOptions } from 'vue'
import LazyHydrate from 'vue-lazy-hydration'

Vue.component('lazy-hydrate', LazyHydrate as ComponentOptions<Vue>)
