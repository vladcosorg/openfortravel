import { AndNode } from '@/shared/src/decision/AndNode'
import { Matcher } from '@/shared/src/decision/Matcher'
import { OrNode } from '@/shared/src/decision/OrNode'
import { RootNode } from '@/shared/src/decision/RootNode'
import { AccessDenied } from '@/shared/src/decision/criteria/AccessDenied'
import { AntigenTest } from '@/shared/src/decision/criteria/AntigenTest'
import { OriginCriteria } from '@/shared/src/decision/criteria/Origin'
import { PCRTest } from '@/shared/src/decision/criteria/PCRTest'
import { Quarantine } from '@/shared/src/decision/criteria/Quarantine'

const austriaDestination = new RootNode([
  new AndNode([
    new OrNode([new OriginCriteria(['au', 'ru'])]),
    new OrNode([new PCRTest(48), new AntigenTest(10)]),

    new AndNode([new PCRTest(1), new Quarantine(1)]),
  ]),
  // new OriginCriteria(['ge']),
  new Quarantine(10),
])

const originCriteria = new OriginCriteria(['ru'])
const deniedOriginCriteria = new OriginCriteria(['md'])
const accessDenied = new AccessDenied()
const pcrCriteria = new PCRTest(48)
const antigenCriteria = new AntigenTest(10)
const quarantine = new Quarantine(10)

const otherDesti = new RootNode([
  new AndNode([originCriteria, new OrNode([pcrCriteria, antigenCriteria])]),
  new AndNode([deniedOriginCriteria, accessDenied]),
  quarantine,
])
const combinations = otherDesti.generateCombinations()

const otherDesti1 = new RootNode([
  new AndNode([
    new OriginCriteria(['au']),
    new OrNode([new PCRTest(48), new AntigenTest(10)]),
  ]),
  new AndNode([new OriginCriteria(['ru']), new Quarantine(10)]),
])

// test.skip('Can I travel from Russia to Australia', () => {
//   const data = new Map([[OriginCriteria, 'ru']])
//   const result = austriaDestination.resolveWithData(data)
//   expect(result).toBe(true)
// })
//
// test('Get soemthign', () => {
//   const data = new Map<Criteria, string | boolean>([
//     [PCRTestCriteria, true],
//     [OriginCriteria, 'ru'],
//   ])
//   const result = austriaDestination.resolveWithData(data)
//   console.log(result)
//   expect(result).toBe(false)
// })
//
// test('Do I need to have a PCR test', () => {
//   console.log(otherDesti.generateCombinations())
//   // console.log(austriaDestination.generateCombinations())
//   // expect(austriaDestination.generateCombinations()).toBe(true)
// })

test('Combinations are converted from sets to arrays', () => {
  const combinations = new RootNode([new OriginCriteria(['au'])]).generateCombinations()
  expect.hasAssertions()
  for (const combination of combinations) {
    expect(combination).toBeInstanceOf(Array)
  }
})

describe('Matcher', () => {
  const matcher = new Matcher(combinations)

  test('Filter by optional restriction value', () => {
    const results = [...matcher.withOptionalCriterion(OriginCriteria, 'ru')]
    expect(results).toHaveLength(3)
    expect(results[0]).toEqual([originCriteria, pcrCriteria])
    expect(results[1]).toEqual([originCriteria, antigenCriteria])
    expect(results[2]).toEqual([quarantine])
  })

  test('Filter by required restriction value', () => {
    const results = [...matcher.withRequiredCriterion(OriginCriteria, 'ru')]
    expect(results).toHaveLength(2)
    expect(results[0]).toEqual([originCriteria, pcrCriteria])
    expect(results[1]).toEqual([originCriteria, antigenCriteria])
  })

  test('Filter by required restriction presence', () => {
    const results = [...matcher.withRequiredCriterion(PCRTest, true)]
    expect(results).toHaveLength(1)
    expect(results[0]).toEqual([originCriteria, pcrCriteria])
  })

  test('Filter by required restriction absence', () => {
    const results = [
      ...matcher
        .withRequiredCriterion(PCRTest, false)
        .withRequiredCriterion(OriginCriteria, 'ru'),
    ]
    expect(results).toHaveLength(1)
    expect(results[0]).toEqual([originCriteria, antigenCriteria])
  })

  test('Filter by required restriction absenced', () => {
    const results = [...matcher.withRequiredCriterion(OriginCriteria, 'md')]
    expect(results).toHaveLength(1)
    expect(results[0]).toEqual([deniedOriginCriteria, accessDenied])
  })

  test('Exclude by type', () => {
    const results = [
      ...matcher
        .withRequiredCriterion(OriginCriteria, 'md')
        .excludeCriterionByType(OriginCriteria),
    ]
    expect(results).toHaveLength(1)
    expect(results[0]).toEqual([accessDenied])
  })
})

describe('Verbalizer', () => {
  const matcher = new Matcher(
    new RootNode([
      new AndNode([
        new OriginCriteria(['au']),
        new OrNode([new PCRTest(48), new AntigenTest(10), new Quarantine(10)]),
      ]),
      new AndNode([new OriginCriteria(['ru']), new Quarantine(10)]),
    ]).generateCombinations(),
  )
  test.only('Exclude by type', () => {
    const results = [
      ...matcher
        .withRequiredCriterion(OriginCriteria, 'au')
        .excludeCriterionByType(OriginCriteria),
    ]
    expect(results).toHaveLength(1)
    expect(results[0]).toEqual([accessDenied])
  })
})
