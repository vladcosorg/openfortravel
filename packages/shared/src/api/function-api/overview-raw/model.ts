import { EncodedRestrictionNode } from '@/shared/src/restriction-tree/converter'

export type RoundTripEncodedRestriction = {
  outgoing: EncodedRestrictionNode[]
  return: EncodedRestrictionNode[]
}
