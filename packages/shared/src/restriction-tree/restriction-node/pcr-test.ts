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
    beforeArrival: true,
    hoursBeforeArrival: 72,
    languages: [] as string[],
    types: [] as TestType[],
    issuer: [] as string[],
    ...RestrictionNode.defaultOptions,
  }

  getFormattedTypes(): TestType[] {
    return this.options.types?.length >= 1
      ? this.options.types
      : Object.values(TestType)
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

  testAfterArrivalAndQuarantine() {
    return this.options.beforeArrival === false
  }

  penaltyScore(): number {
    if (this.testAfterArrivalAndQuarantine()) {
      return 5
    }

    return 2
  }
}
