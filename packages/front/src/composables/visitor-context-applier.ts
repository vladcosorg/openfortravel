import pick from 'lodash/pick'

import { useRootStore } from '@/shared/src/composables/use-plugins'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

type ContextProps = 'originSlug' | 'citizenship' | 'vaccinated'
export function applyContextFromProps(
  props: Partial<Record<ContextProps, any>>,
): void {
  useRootStore().mutations.replaceVisitorContext({
    context: Object.assign(
      {
        [RestrictionNodeType.ORIGIN]: props['originSlug'],
      },
      pick(props, [
        RestrictionNodeType.CITIZENSHIP,
        RestrictionNodeType.VACCINATED,
      ]),
    ),
  })
}
