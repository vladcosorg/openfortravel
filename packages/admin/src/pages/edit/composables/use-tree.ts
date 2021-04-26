import {
  computed,
  ComputedRef,
  defineComponent,
  PropType,
  Ref,
  SetupContext,
  toRef,
  WritableComputedRef,
} from '@vue/composition-api'
import omit from 'lodash/omit'
import Vue, { ComponentOptions } from 'vue'

import {
  QuasarLogicTreeNode,
  QuasarTreeNode,
} from '@/admin/src/pages/edit/components/restriction-tree.vue'
import { Destination } from '@/shared/src/api/destinations/models'
import {
  EncodedLogicNode,
  EncodedNode,
} from '@/shared/src/restriction-tree/converter'
import { LogicNodeType } from '@/shared/src/restriction-tree/types'

type ExtractType<T> = T extends ComputedRef<infer InnerType> ? InnerType : never

export type ExtractRestrictionOptions<
  T extends { new (...args: any): any }
> = ConstructorParameters<T>[0]

export function createOptionSetup<T extends { new (...args: any): any }>(
  optionDefaults: ExtractRestrictionOptions<T>,
  components?: ComponentOptions<Vue>['components'],
): ReturnType<typeof defineComponent> {
  return defineComponent(getCompomentDefaults(optionDefaults))
}

export function getCompomentDefaults<T extends { new (...args: any): any }>(
  optionDefaults: ExtractRestrictionOptions<T>,
): Parameters<typeof defineComponent>[0] {
  return {
    model: {
      prop: 'nodeOptions',
    },
    props: {
      nodeOptions: {
        type: Object as PropType<ExtractRestrictionOptions<T>>,
        required: true,
      },
    },
    setup(props, { emit }) {
      const options = toRef(props, 'nodeOptions')
      const setters = createSetterCollection(options, optionDefaults, emit)
      return { ...setters }
    },
  }
}

export function createSetterCollection<
  A extends Ref,
  K extends keyof T,
  T extends ExtractType<A>
>(
  currentOptions: A,
  optionDefaults: Required<T>,
  emit: SetupContext['emit'],
): Record<K, WritableComputedRef<T[K]>> {
  const out: ReturnType<typeof createSetterCollection> = {}

  for (const optionID of Object.keys(optionDefaults)) {
    out[optionID] = computed({
      get() {
        if (currentOptions.value[optionID] !== undefined) {
          return currentOptions.value[optionID]
        }
        return (out[optionID].value = optionDefaults[optionID])
      },
      set(value) {
        emit(
          'input',
          Object.assign({}, currentOptions.value, { [optionID]: value }),
        )
      },
    })
  }

  return out
}

export const createSetter = <
  T extends ComputedRef,
  K extends keyof A,
  A = ExtractType<T>
>(
  optionID: K,
  options: T,
  emit: SetupContext['emit'],
): WritableComputedRef<A[K]> =>
  computed({
    get() {
      return options.value[optionID]
    },
    set(value) {
      emit('input', Object.assign({}, options.value, { [optionID]: value }))
    },
  })

export function createDefaults<T>(
  defaults: T,
  currentValues: Ref<Partial<T>>,
): ComputedRef<T> {
  return computed<T>(() => Object.assign({}, defaults, currentValues.value))
}

export function indexTheTree(
  nodes: EncodedNode[],
  getNextUID: () => number,
): QuasarTreeNode[] {
  const index = (nodes: EncodedNode[]): QuasarTreeNode[] =>
    nodes.map((node) => {
      const out: QuasarTreeNode = {
        ...node,
        UID: getNextUID(),
        showCustom: false,
      }

      if ('children' in node) {
        ;(out as QuasarTreeNode & EncodedLogicNode).children = index(
          node.children,
        )
      }

      return out
    })

  return index(nodes)
}

export function prepareForStorage(
  indexedTree: QuasarTreeNode[],
): EncodedNode[] {
  const rootNode = indexedTree[0] as QuasarLogicTreeNode

  if (!rootNode || !rootNode.children) {
    return []
  }

  return cleanObjectRecursive(rootNode.children)
}

function cleanObjectRecursive(indexedTree: QuasarTreeNode[]): EncodedNode[] {
  const out: EncodedNode[] = []

  for (const node of indexedTree) {
    out.push(
      omit(
        Object.assign(
          {},
          node,
          'children' in node
            ? {
                children: cleanObjectRecursive(node.children),
              }
            : {},
        ),
        ['UID', 'showCustom'],
      ) as EncodedNode,
    )
  }

  return out
}

export function createIndexedTree(
  destination: Destination,
  getNextUID: () => number,
): QuasarTreeNode[] {
  console.log(destination.restrictionTree)
  return indexTheTree(
    [
      {
        type: LogicNodeType.OR,
        children: destination.restrictionTree,
      },
    ],
    getNextUID,
  )
}
