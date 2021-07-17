import { InjectionKey } from 'vue'
import Vue from 'vue'

import { TreeManager } from '@/admin/src/pages/edit/modules/tree-manager'

export const TreeManagerStoreKey: InjectionKey<TreeManager> =
  Symbol('TreeManager')
export const EventBus: InjectionKey<Vue> = Symbol('EventBus')
