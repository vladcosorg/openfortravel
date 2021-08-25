import { ProfileContext } from '@/shared/src/models/profile-context/profile-context'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export function createProfileContext(
  context: Partial<ProfileContext>,
): ProfileContext {
  const origin = context[RestrictionNodeType.ORIGIN] ?? 'us'
  return Object.assign({}, context, {
    [RestrictionNodeType.ORIGIN]: origin,
    [RestrictionNodeType.CITIZENSHIP]: context[
      RestrictionNodeType.CITIZENSHIP
    ] ?? [origin],
    [RestrictionNodeType.DID_NOT_VISIT_COUNTRIES]: [
      origin,
      ...(context[RestrictionNodeType.DID_NOT_VISIT_COUNTRIES] || []),
    ],
  })
}
