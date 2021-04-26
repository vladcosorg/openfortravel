import {
  RestrictionInstruction,
  RestrictionNode,
} from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export class RecoveryCertificate extends RestrictionNode {
  constructor(protected options: { daysAtLeast: number; daysAtMost: number }) {
    console.log(options)
    super()
  }

  penaltyScore(): number {
    return 1
  }

  instruction(): RestrictionInstruction {
    const title = 'Provide a certificate of having recovered from COVID-19'
    const subtitle = `<p>If you have recovered from coronavirus recently and immune to the infection due to antibodies,
      you can present proof at the border control, such as a positive RT-PCR test, hospital discharge ticket, or test that proves the presence of IgG antibodies.</p>
      <p class="text-accent">The certificate must be issued at least <b>${this.options.daysAtLeast} days</b> and at most <b>${this.options.daysAtMost} days</b> before arrival.</p>`

    return {
      title,
      subtitle,
    }
  }

  id(): RestrictionNodeType {
    return RestrictionNodeType.RECOVERY
  }
}
