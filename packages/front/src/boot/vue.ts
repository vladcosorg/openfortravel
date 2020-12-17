import Vue, { ComponentOptions } from 'vue'
import LazyHydrate from 'vue-lazy-hydration'

import { lol } from '@/shared'

Vue.component('LazyHydrate', LazyHydrate as ComponentOptions<Vue>)

export const eventBus = new Vue()
console.log(lol())
