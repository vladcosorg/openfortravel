import { And } from '@/shared/src/restriction-tree/logic-node/and'
import { Or } from '@/shared/src/restriction-tree/logic-node/or'
import { Matcher } from '@/shared/src/restriction-tree/matcher'
import { Responder } from '@/shared/src/restriction-tree/responder'
import { OnlineApplication } from '@/shared/src/restriction-tree/restriction-node/online-application'
import { Origin } from '@/shared/src/restriction-tree/restriction-node/origin'
import { PcrTest } from '@/shared/src/restriction-tree/restriction-node/pcr-test'
import { Quarantine } from '@/shared/src/restriction-tree/restriction-node/quarantine'
import { QuarantineWithTesting } from '@/shared/src/restriction-tree/restriction-node/quarantine-with-testing'
import { Vaccinated } from '@/shared/src/restriction-tree/restriction-node/vaccinated'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

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
  new And([
    new Origin({ allowedOrigins: ['uk', 'sa'] }),
    new Or([new QuarantineWithTesting({ days: 14 })]),
    new OnlineApplication({ url: 'dawdaw' }),
  ]),
  new And([
    new Origin({ allowedOrigins: ['au'] }),
    new Or([new PcrTest({ hours: 14 })]),
    new OnlineApplication({ url: 'dawdaw' }),
  ]),
  new And([new Origin({ allowedOrigins: ['de'] })]),
  new And([new Vaccinated({ daysAgo: 11 })]),
]).resolveTreeNodes()

describe('Entry allowed check', () => {
  test('Should allow entry', () => {
    const responder = new Responder(
      new Matcher(combinations)
        .withOptional(RestrictionNodeType.ORIGIN, 'us')
        .withOptional(RestrictionNodeType.CITIZENSHIP, 'us')
        .withAbsenceOf(RestrictionNodeType.VACCINATED),
    )

    expect(responder.isEntryAllowed()).toBe(true)
  })

  test('Should forbid entry', () => {
    const responder = new Responder(
      new Matcher(combinations)
        .withOptional(RestrictionNodeType.ORIGIN, 'cn')
        .withOptional(RestrictionNodeType.CITIZENSHIP, 'cn')
        .withAbsenceOf(RestrictionNodeType.VACCINATED),
    )

    expect(responder.isEntryAllowed()).toBe(false)
  })
})

describe('Quarantine check', () => {
  test('Should not require quarantine', () => {
    const responder = new Responder(
      new Matcher(combinations)
        .withOptional(RestrictionNodeType.ORIGIN, 'us')
        .withOptional(RestrictionNodeType.CITIZENSHIP, 'us')
        .withAbsenceOf(RestrictionNodeType.VACCINATED),
    )

    expect(responder.isQuarantineRequired()).toBe(false)
  })

  test('Should require quarantine', () => {
    const responder = new Responder(
      new Matcher(combinations)
        .withOptional(RestrictionNodeType.ORIGIN, 'uk')
        .withOptional(RestrictionNodeType.CITIZENSHIP, 'uk')
        .withAbsenceOf(RestrictionNodeType.VACCINATED),
    )

    expect(responder.isQuarantineRequired()).toBe(true)
  })
})

describe('Test check', () => {
  test('Should not require test', () => {
    const responder = new Responder(
      new Matcher(combinations)
        .withOptional(RestrictionNodeType.ORIGIN, 'de')
        .withOptional(RestrictionNodeType.CITIZENSHIP, 'de')
        .withAbsenceOf(RestrictionNodeType.VACCINATED),
    )

    expect(responder.isTestRequired()).toBe(false)
  })

  test('Should require test', () => {
    const responder = new Responder(
      new Matcher(combinations)
        .withOptional(RestrictionNodeType.ORIGIN, 'au')
        .withOptional(RestrictionNodeType.CITIZENSHIP, 'au')
        .withAbsenceOf(RestrictionNodeType.VACCINATED),
    )

    expect(responder.isTestRequired()).toBe(true)
  })
})

describe('Vaccinated', () => {
  test('Should not require test', () => {
    const responder = new Responder(
      new Matcher(combinations)
        .withOptional(RestrictionNodeType.ORIGIN, 'us')
        .withOptional(RestrictionNodeType.CITIZENSHIP, 'us')
        .withPresenceOf(RestrictionNodeType.VACCINATED),
    )

    expect(responder.isTestRequired()).toBe(false)
    expect(responder.isEntryConditional()).toBe(false)
    expect(responder.isEntryAllowed()).toBe(true)
  })

  test('Should require test', () => {
    const responder = new Responder(
      new Matcher(combinations)
        .withOptional(RestrictionNodeType.ORIGIN, 'au')
        .withOptional(RestrictionNodeType.CITIZENSHIP, 'au')
        .withPresenceOf(RestrictionNodeType.VACCINATED),
    )

    expect(responder.isTestRequired()).toBe(false)
    expect(responder.isEntryConditional()).toBe(false)
    expect(responder.isEntryAllowed()).toBe(true)
  })
})
