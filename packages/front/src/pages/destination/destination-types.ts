import type { InjectionKey } from '@vue/composition-api'

import type { StoreModule } from '@/front/src/pages/destination/destination-store'

export const StoreKey: InjectionKey<StoreModule> = Symbol('Store')
