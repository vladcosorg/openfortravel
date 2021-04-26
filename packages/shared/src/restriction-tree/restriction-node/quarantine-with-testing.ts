import {
  RestrictionInstruction,
  RestrictionNode,
} from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export class QuarantineWithTesting extends RestrictionNode {
  constructor(protected options: { days: number }) {
    super()
  }

  id(): RestrictionNodeType {
    return RestrictionNodeType.QUARANTINE_WITH_TEST
  }
  penaltyScore(): number {
    return 5
  }

  displayOrder(): number {
    return 10
  }

  instruction(): RestrictionInstruction {
    return {
      title:
        'Self-isolate for 14 days upon arrival <b>with possibility of shortening the period</b> ',
      subtitle:
        'Travelers are subject to a 10-day mandatory self-isolation. In some cases the period of quarantine can be shortened. Please consult the the resources in the sidebar to find out more.',
    }
  }
}
