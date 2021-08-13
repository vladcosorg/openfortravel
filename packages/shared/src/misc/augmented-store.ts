import { mapValues } from 'lodash'

import type { RootStateType, StateInterface } from '@/front/src/store/state'
import type { RootGetterAccessors } from '@/front/src/store/types/getters'

import type { Store, ActionContext, DispatchOptions } from 'vuex'

export type GetterAccessors<Getters> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [P in keyof Getters]: Getters[P] extends (...args: any) => unknown
    ? ReturnType<Getters[P]>
    : never
}

export type ActionAccessors<Actions> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [P in keyof Actions]: Actions[P] extends (...args: any) => unknown
    ? (payload: Parameters<Actions[P]>[1]) => ReturnType<Actions[P]>
    : never
}

export type MutationAccesors<Mutations> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [P in keyof Mutations]: Mutations[P] extends (...args: any) => unknown
    ? Parameters<Mutations[P]> extends [unknown, unknown]
      ? (payload: Parameters<Mutations[P]>[1]) => ReturnType<Mutations[P]>
      : () => ReturnType<Mutations[P]>
    : never
}

export type GetterContext<State, Getters> = Parameters<
  (
    state: State,
    getters: Getters,
    rootState: RootStateType,
    rootGetters: RootGetterAccessors,
  ) => void
>

export type AugmentedActionContext<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  MutationSignatures extends Record<string, (...args: any) => unknown>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ActionSignatures extends Record<string, (...args: any) => unknown>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  RootActionSignatures extends Record<string, (...args: any) => unknown>,
  State,
> = {
  commit<K extends keyof MutationSignatures>(
    key: K,
    payload: Parameters<MutationSignatures[K]>[1],
  ): ReturnType<MutationSignatures[K]>
  dispatch<
    T extends DispatchOptions,
    K extends keyof ActionSignatures,
    R extends keyof RootActionSignatures,
  >(
    key: T extends { root: true } ? R : K,
    payload?: Parameters<
      T extends { root: true } ? RootActionSignatures[R] : ActionSignatures[K]
    >[1],
    options?: T,
  ): ReturnType<
    T extends { root: true } ? RootActionSignatures[R] : ActionSignatures[K]
  >
} & Omit<ActionContext<State, StateInterface>, 'commit' | 'dispatch'>

type MaybeNestedState<State, Module> = Module extends keyof State
  ? State[Module]
  : State

export class AugmentedStore<
  State,
  Getters,
  Actions,
  Mutations,
  Module extends string | undefined,
> {
  public readonly state: MaybeNestedState<State, Module>

  constructor(private store: Store<State>, private moduleId?: Module) {
    this.state = !this.moduleId
      ? (store.state as MaybeNestedState<State, Module>)
      : ((store.state as any)[moduleId] as MaybeNestedState<State, Module>)
  }

  get getters(): GetterAccessors<Getters> {
    const store = this.store
    const map = {}
    const names = this.getMappedNames(Object.keys(store.getters))
    for (const shortGetterName of Object.keys(names)) {
      Object.defineProperty(
        map,
        shortGetterName,
        Object.getOwnPropertyDescriptor(
          store.getters,
          names[shortGetterName],
        ) as PropertyDescriptor,
      )
    }

    Object.defineProperty(this, 'getters', { value: map, writable: false })
    return this.getters
  }

  get actions(): ActionAccessors<Actions> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const names = this.getMappedNames(Object.keys((this.store as any)._actions))
    const store = this.store

    Object.defineProperty(this, 'actions', {
      value: mapValues(
        names,
        (fullActionID) =>
          (payload: unknown): Promise<void> =>
            store.dispatch(fullActionID, payload),
      ),
      writable: false,
    })

    return this.actions
  }

  get mutations(): MutationAccesors<Mutations> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const names = this.getMappedNames(
      Object.keys((this.store as any)._mutations),
    )
    const store = this.store

    Object.defineProperty(this, 'mutations', {
      value: mapValues(
        names,
        (fullMutationID) =>
          (payload: unknown): void =>
            store.commit(fullMutationID, payload),
      ),
      writable: false,
    })

    return this.mutations
  }

  private getMappedNames(names: string[]): Record<string, string> {
    const out: Record<string, string> = {}
    for (const fullGetterName of names) {
      if (this.moduleId === undefined && fullGetterName.includes('/')) {
        continue
      }
      let shortGetterName = fullGetterName

      if (this.moduleId !== undefined) {
        if (fullGetterName.indexOf(this.moduleId) !== 0) {
          continue
        }
        shortGetterName = fullGetterName.slice(this.moduleId.length + 1)
      }

      out[shortGetterName] = fullGetterName
    }

    return out
  }
}
