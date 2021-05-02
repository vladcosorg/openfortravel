import { QuarantineWithTesting } from '@/shared/src/restriction-tree/restriction-node/quarantine-with-testing'

import { EntryWays } from '@/shared/src/restriction-tree/entry-ways'
import { And } from '@/shared/src/restriction-tree/logic-node/and'
import { Or } from '@/shared/src/restriction-tree/logic-node/or'
import { Matcher } from '@/shared/src/restriction-tree/matcher'
import { DidNotVisitCountries } from '@/shared/src/restriction-tree/restriction-node/did-not-visit-countries'
import { OnlineApplication } from '@/shared/src/restriction-tree/restriction-node/online-application'
import { Origin } from '@/shared/src/restriction-tree/restriction-node/origin'
import { PcrTest } from '@/shared/src/restriction-tree/restriction-node/pcr-test'
import { Quarantine } from '@/shared/src/restriction-tree/restriction-node/quarantine'
import { Vaccinated } from '@/shared/src/restriction-tree/restriction-node/vaccinated'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'
import { VisitorContext } from '@/shared/src/restriction-tree/visitor-context'

const matcher = new Matcher(
  new Or([
    new And([
      new Origin({ allowedOrigins: ['us', 'ru'] }),
      new Or([new PcrTest({ hours: 48 }), new QuarantineWithTesting({ days: 14 })]),
      new OnlineApplication({ url: 'dawdaw' }),
      new DidNotVisitCountries({ countryCodes: ['cn'], days: 14 }),
    ]),
    new Vaccinated({ daysAgo: 11 }),
    new And([
      new Origin({ allowedOrigins: ['md'] }),
      new Or([new QuarantineWithTesting({ days: 14 }), new Quarantine({ days: 14 })]),
      new OnlineApplication({ url: 'dawdaw' }),
      new DidNotVisitCountries({ countryCodes: ['cn'], days: 14 }),
    ]),
  ]).resolveTreeNodes(),
)
const ways = new EntryWays(
  matcher,
  new VisitorContext({
    [RestrictionNodeType.ORIGIN]: 'us',
    [RestrictionNodeType.CITIZENSHIP]: 'us',
  }),
)

test('Restrictions should be sorted according to the display order value', () => {
  const groups = ways.getGroups().available
  const group = groups[0].group
  expect(group[0]).toBeInstanceOf(Origin)
  expect(group[1]).toBeInstanceOf(DidNotVisitCountries)
  expect(group[2]).toBeInstanceOf(OnlineApplication)
  expect(group[3]).toBeInstanceOf(Array)
})

test('Visitor context is applied', () => {
  expect(
    new EntryWays(
      matcher,
      new VisitorContext({
        [RestrictionNodeType.ORIGIN]: 'us',
        [RestrictionNodeType.CITIZENSHIP]: 'us',
      }),
    ).getGroups().available,
  ).toHaveLength(1)
})

test('The restrictions are separated into available and unavailable', () => {
  const groups = ways.getGroups()
  expect(groups).toHaveProperty('available')
  expect(groups).toHaveProperty('unavailable')
})

describe('Scoring', () => {
  test('Scores are generated', () => {
    const groups = ways.getGroups()
    const group = groups.available[0]
    expect(group).toHaveProperty('score')
  })

  test('Scores are sorted in ascending order', () => {
    expect.hasAssertions()
    const ways = new EntryWays(
      matcher,
      new VisitorContext({
        [RestrictionNodeType.ORIGIN]: 'us',
        [RestrictionNodeType.CITIZENSHIP]: 'us',
        [RestrictionNodeType.VACCINATED]: true,
      }),
    )
    const groups = ways.getGroups()

    let prevScore = 0
    for (const group of groups.available) {
      expect(group.score).toBeGreaterThanOrEqual(prevScore)
      prevScore = group.score
    }
  })
})
