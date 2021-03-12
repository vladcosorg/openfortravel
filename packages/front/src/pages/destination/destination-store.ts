import { CommitOptions, DispatchOptions, Module } from 'vuex'

import { useModule } from '@/front/src/composables/module'
import {
  ActionProperties,
  Actions,
} from '@/front/src/pages/destination/store/action-types'
import { actions } from '@/front/src/pages/destination/store/actions'
import {
  ContextGetters,
  getters,
} from '@/front/src/pages/destination/store/getters'
import {
  Mutations,
  mutations,
} from '@/front/src/pages/destination/store/mutations'
import { state } from '@/front/src/pages/destination/store/state'
import { StateInterface } from '@/front/src/store'
import { useStore } from '@/shared/src/composables/use-plugins'

const mod = {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
} as Module<ReturnType<typeof state>, StateInterface>
export default mod
export const MODULE_ID = 'destinationPage'

export const moduleStore = {
  state: useStore().state[MODULE_ID],
  get getters(): ContextGetters {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (this as any).getters
    const store = useStore()
    const map = {}
    for (const getter of Object.keys(getters)) {
      Object.defineProperty(map, getter, {
        get() {
          return store.getters[`${MODULE_ID}/${getter}`]
        },
      })
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return ((this as any).getters = map as ContextGetters)
  },
  get actions(): ActionProperties {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (this as any).actions
    const store = useStore()
    const map = {}
    for (const getter of Object.keys(actions)) {
      map[getter] = (payload: any): Promise<void> =>
        store.dispatch(`${MODULE_ID}/${getter}`, payload)
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return ((this as any).actions = map as ActionProperties)
  },
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions,
  ): void {
    useStore().commit(`${MODULE_ID}/${key}`, payload, options)
  },
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions,
  ): ReturnType<Actions[K]> {
    return useStore().dispatch(
      `${MODULE_ID}/${key}`,
      payload,
      options,
    ) as ReturnType<Actions[K]>
  },
  register(): void {
    useModule(MODULE_ID, mod)
  },
}
