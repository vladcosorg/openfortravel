import type { InjectionKey } from 'vue'

import type { StoreModule } from '@/front/src/pages/destination/destination-store'

export const StoreKey: InjectionKey<StoreModule> = Symbol('Store')
