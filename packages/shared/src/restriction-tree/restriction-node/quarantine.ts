import {
  RestrictionCategory,
  RestrictionInstruction,
  RestrictionNode,
} from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export class Quarantine extends RestrictionNode {
  constructor(protected readonly options: { days: number; earlyReleaseDays: number }) {
    super()
  }

  id(): RestrictionNodeType {
    return RestrictionNodeType.QUARANTINE
  }

  instruction(): RestrictionInstruction {
    const days = this.options.earlyReleaseDays
      ? `${this.options.earlyReleaseDays}-${this.options.days}`
      : this.options.days

    const title = `Self-isolate for <b>${days}</b> days upon arrival`
    let subtitle = `<p>Travelers are subject to <b>${days}</b> days of mandatory self-isolation at home,
      declared location or location designated by authorities.</p>`

    subtitle += this.options.earlyReleaseDays
      ? `<p>The quarantine period may be shortened by taking another test during the self-isolation.
       If the result of this test is negative, <b>the period of quarantine can end on day ${this.options.earlyReleaseDays}.</b></p>`
      : '<p><b>The duration is mandatory regardless of the result of the test.</b></p>'

    return {
      title,
      subtitle,
    }
  }

  category(): RestrictionCategory {
    return RestrictionCategory.ACTION
  }

  displayOrder(): number {
    return 100
  }

  penaltyScore(): number {
    return 10
  }
}
