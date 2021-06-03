import type { ComponentOptions } from 'vue'
import Vue from 'vue'
import LazyHydrate from 'vue-lazy-hydration'
import VueSocialSharing from 'vue-social-sharing'

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
Vue.prototype.$isDev = process.env.DEV
Vue.component('LazyHydrate', LazyHydrate as ComponentOptions<Vue>)
Vue.use(VueSocialSharing)
