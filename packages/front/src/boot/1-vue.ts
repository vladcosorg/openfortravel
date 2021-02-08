import Vue, { ComponentOptions } from 'vue'
import LazyHydrate from 'vue-lazy-hydration'

Vue.component('LazyHydrate', LazyHydrate as ComponentOptions<Vue>)
