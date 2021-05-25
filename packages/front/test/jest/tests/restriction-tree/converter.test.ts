import { QuarantineWithTesting } from '@/shared/src/restriction-tree/restriction-node/quarantine-with-testing'

import type { EncodedNode } from '@/shared/src/restriction-tree/converter'
import { convertFromStorageFormat } from '@/shared/src/restriction-tree/converter'
import { And } from '@/shared/src/restriction-tree/logic-node/and'
import { Or } from '@/shared/src/restriction-tree/logic-node/or'
import { OnlineApplication } from '@/shared/src/restriction-tree/restriction-node/online-application'
import { Origin } from '@/shared/src/restriction-tree/restriction-node/origin'
import { PcrTest } from '@/shared/src/restriction-tree/restriction-node/pcr-test'
import { Quarantine } from '@/shared/src/restriction-tree/restriction-node/quarantine'
import { Vaccinated } from '@/shared/src/restriction-tree/restriction-node/vaccinated'
import {
  LogicNodeType,
  RestrictionNodeType,
} from '@/shared/src/restriction-tree/types'

const combinations = new Or([
  new And([
    new Origin({ allowedOrigins: ['us', 'md', 'ru'] }),
    new Or([
      new PcrTest({ hours: 48 }),
      new QuarantineWithTesting({ days: 14 }),
      new Quarantine({ days: 14 }),
    ]),
    new OnlineApplication({ url: 'dawdaw' }),
  ]),
  new Or([new Vaccinated({ daysAgo: 11 })]),
])

const storageFormat: EncodedNode = {
  type: LogicNodeType.OR,
  children: [
    {
      type: LogicNodeType.AND,
      children: [
        {
          type: RestrictionNodeType.ORIGIN,
          options: { allowedOrigins: ['us', 'md', 'ru'] },
        },
        {
          type: LogicNodeType.OR,
          children: [
            { type: RestrictionNodeType.PCR_TEST, options: { hours: 48 } },
            {
              type: RestrictionNodeType.QUARANTINE_WITH_TEST,
              options: { days: 14 },
            },
            { type: RestrictionNodeType.QUARANTINE, options: { days: 14 } },
          ],
        },
        {
          type: RestrictionNodeType.ONLINE_APPLICATION,
          options: { url: 'dawdaw' },
        },
      ],
    },
    {
      type: LogicNodeType.OR,
      children: [
        { type: RestrictionNodeType.VACCINATED, options: { daysAgo: 11 } },
      ],
    },
  ],
}

test('Encode', () => {
  expect(combinations.toStorageFormat()).toEqual(storageFormat)
})

test('Decode', () => {
  expect(convertFromStorageFormat(storageFormat)).toEqual(combinations)
})
