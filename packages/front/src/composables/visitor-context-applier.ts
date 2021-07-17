import { PropType } from '@vue/composition-api'

import { originParameterTransformers } from '@/front/src/router/route-builders/origin'
import { useRootStore } from '@/shared/src/composables/use-plugins'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'
import { VisitorProfile } from '@/shared/src/restriction-tree/visitor-profile'

export function applyContextFromProps(props: Record<string, any>): void {
  useRootStore().mutations.replaceVisitorContext({
    context: Object.entries(originParameterTransformers).reduce(
      (context, [parameterName, parameterTransformer]) => {
        if (
          parameterTransformer.contextField &&
          props[parameterName] !== undefined
        ) {
          context[parameterTransformer.contextField] = props[parameterName]
        }

        return context
      },
      {},
    ),
  })
}

export const contextProps = {
  // eslint-disable-next-line vue/no-unused-properties
  originSlug: {
    type: String as PropType<VisitorProfile[RestrictionNodeType.ORIGIN]>,
  },
  // eslint-disable-next-line vue/no-unused-properties
  citizenship: {
    type: Array as PropType<VisitorProfile[RestrictionNodeType.CITIZENSHIP]>,
  },
  // eslint-disable-next-line vue/no-unused-properties
  vaccinated: {
    type: Object as PropType<VisitorProfile[RestrictionNodeType.VACCINATED]>,
  },
  recovered: {
    type: Number as PropType<VisitorProfile[RestrictionNodeType.RECOVERY]>,
  },
  visited: {
    type: Array as PropType<
      VisitorProfile[RestrictionNodeType.DID_NOT_VISIT_COUNTRIES]
    >,
  },
}
