import { Module, ModuleTree } from 'vuex'

import countryPage from '@/front/src/pages/country/country-store'
import { RootStateType, StateInterface } from '@/front/src/store/state'
import countryList, {
  CountryListState,
} from '@/shared/src/modules/country-list/country-list-store'
import nationalities, {
  NationalityState,
} from '@/shared/src/modules/nationality/nationality-store'

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
