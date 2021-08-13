import type { StoreModule } from '@/front/src/pages/destination/destination-store'

import type { InjectionKey } from 'vue'

export const StoreKey: InjectionKey<StoreModule> = Symbol('Store')
