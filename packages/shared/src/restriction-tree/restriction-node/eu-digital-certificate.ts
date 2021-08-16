import { AbstractRestrictionNode } from '@/shared/src/restriction-tree/abstract-restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

type DefaultOptions = typeof EuDigitalCertificate.defaultOptions
export class EuDigitalCertificate extends AbstractRestrictionNode<DefaultOptions> {
  static defaultOptions = {
    issuer: [] as string[],
    ...AbstractRestrictionNode.defaultOptions,
  }

  matches(): boolean {
    return true
  }

  id(): RestrictionNodeType {
    return RestrictionNodeType.EU_DIGITAL_CERTIFICATE
  }
}
