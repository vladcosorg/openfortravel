import type { Module, ModuleTree } from 'vuex'

import countryPage from '@/front/src/pages/country/country-store'
import type { RootStateType, StateInterface } from '@/front/src/store/state'
import type {
  CountryListState,
} from '@/shared/src/modules/country-list/country-list-store';
import countryList from '@/shared/src/modules/country-list/country-list-store'
import type {
  NationalityState,
} from '@/shared/src/modules/nationality/nationality-store';
import nationalities from '@/shared/src/modules/nationality/nationality-store'

export const modules: ModuleTree<RootStateType> = {
  countryPage,
  modules: {
    namespaced: true,
    modules: {
      countryList: countryList as Module<CountryListState, StateInterface>,
      nationalities: nationalities as Module<NationalityState, StateInterface>,
    },
  },
}
