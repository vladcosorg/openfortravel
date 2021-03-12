import { InjectionKey } from '@vue/composition-api'

import { StoreModule } from '@/front/src/pages/destination/destination-store'

export const StoreKey: InjectionKey<StoreModule> = Symbol('Store')
