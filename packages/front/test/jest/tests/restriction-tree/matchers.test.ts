import { And } from '@/shared/src/restriction-tree/logic-node/and'
import { Or } from '@/shared/src/restriction-tree/logic-node/or'
import { Matcher } from '@/shared/src/restriction-tree/matcher'
import { AntigenTest } from '@/shared/src/restriction-tree/restriction-node/antigen-test'
import { Origin } from '@/shared/src/restriction-tree/restriction-node/origin'
import { PcrTest } from '@/shared/src/restriction-tree/restriction-node/pcr-test'
import { Quarantine } from '@/shared/src/restriction-tree/restriction-node/quarantine'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

const originCriteria = new Origin({ allowedOrigins: ['ru'] })
const pcrCriteria = new PcrTest({ hours: 48 })
const antigenCriteria = new AntigenTest({ hours: 10 })
const quarantine = new Quarantine({ days: 10 })

const combinations = new Or([
  new And([originCriteria, new Or([pcrCriteria, antigenCriteria])]),
  quarantine,
]).resolveTreeNodes()

describe('Matcher', () => {
  const matcher = new Matcher(combinations)

  test('Filter by optional restriction value', () => {
    const results = [...matcher.withOptional(RestrictionNodeType.ORIGIN, 'ru')]
    expect(results).toHaveLength(3)
    expect(results[0]).toEqual([originCriteria, pcrCriteria])
    expect(results[1]).toEqual([originCriteria, antigenCriteria])
    expect(results[2]).toEqual([quarantine])
  })

  test('Filter by required restriction value', () => {
    const results = [...matcher.withRequired(RestrictionNodeType.ORIGIN, 'ru')]
    expect(results).toHaveLength(2)
    expect(results[0]).toEqual([originCriteria, pcrCriteria])
    expect(results[1]).toEqual([originCriteria, antigenCriteria])
  })

  test('Filter by required restriction presence', () => {
    const results = [...matcher.withPresenceOf(RestrictionNodeType.PCR_TEST)]
    expect(results).toHaveLength(1)
    expect(results[0]).toEqual([originCriteria, pcrCriteria])
  })

  test('Filter by required restriction absence', () => {
    const results = [
      ...matcher
        .withAbsenceOf(RestrictionNodeType.PCR_TEST)
        .withRequired(RestrictionNodeType.ORIGIN, 'ru'),
    ]
    expect(results).toHaveLength(1)
    expect(results[0]).toEqual([originCriteria, antigenCriteria])
  })

  test('Exclude by type', () => {
    const results = [...matcher.excludeCriterionByType(RestrictionNodeType.ORIGIN)]
    expect(results).toHaveLength(3)
  })
})
