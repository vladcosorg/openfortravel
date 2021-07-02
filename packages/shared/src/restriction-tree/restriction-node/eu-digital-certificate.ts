import { RestrictionNode } from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

type DefaultOptions = typeof EuDigitalCertificate.defaultOptions
export class EuDigitalCertificate extends RestrictionNode<DefaultOptions> {
  static defaultOptions = {
    issuer: [] as string[],
    ...RestrictionNode.defaultOptions,
  }

  matches(): boolean {
    return true
  }

  id(): RestrictionNodeType {
    return RestrictionNodeType.EU_DIGITAL_CERTIFICATE
  }
}
