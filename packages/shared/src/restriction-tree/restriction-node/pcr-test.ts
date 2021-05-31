import {
  RestrictionCategory,
  RestrictionNode,
} from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export enum TestType {
  ANTIGEN = 'antigen',
  LAMP = 'lamp',
  PCR = 'pcr',
  TMA = 'tma',
}

export const testLabels = {
  [TestType.PCR]: 'PCR',
  [TestType.ANTIGEN]: 'Antigen',
  [TestType.LAMP]: 'LAMP',
  [TestType.TMA]: 'TMA',
}

export class PcrTest extends RestrictionNode<typeof PcrTest.defaultOptions> {
  public static defaultOptions = {
    hoursBeforeArrival: 72,
    hoursAfterArrival: 0 as number | undefined,
    languages: ['en'] as string[],
    types: [] as TestType[],
    ...RestrictionNode.defaultOptions,
  }

  id(): RestrictionNodeType {
    return RestrictionNodeType.PCR_TEST
  }

  category(): RestrictionCategory {
    return RestrictionCategory.ACTION
  }

  displayOrder(): number {
    return 3
  }

  penaltyScore(): number {
    return 2
  }
}
