import { QuarantineWithTesting } from '@/shared/src/restriction-tree/restriction-node/quarantine-with-testing'
import Vue from 'vue'
import VueI18n from 'vue-i18n'

import messages from '@/shared/src/i18n/en'
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
import { Verbaliser } from '@/shared/src/restriction-tree/verbaliser'

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en',
  messages: {
    en: messages,
  },
})

const matcher = new Matcher(
  new Or([
    new And([
      new Origin({ allowedOrigins: ['us', 'ru'] }),
      new Or([
        new PcrTest({ hours: 48 }),
        new QuarantineWithTesting({ days: 14 }),
        new Quarantine({ days: 14 }),
      ]),
      new OnlineApplication({ url: 'dawdaw' }),
      new DidNotVisitCountries({ countryCodes: ['cn'], days: 14 }),
    ]),
    new And([
      new Origin({ allowedOrigins: ['md'] }),
      new Or([
        new QuarantineWithTesting({ days: 14 }),
        new Quarantine({ days: 14 }),
      ]),
      new OnlineApplication({ url: 'dawdaw' }),
      new DidNotVisitCountries({ countryCodes: ['cn'], days: 14 }),
    ]),
    new Or([new Vaccinated({ daysAgo: 11 })]),
  ]).resolveTreeNodes(),
)
  .withOptional(RestrictionNodeType.ORIGIN, 'us')
  .withOptional(RestrictionNodeType.CITIZENSHIP, 'us')
  .withAbsenceOf(RestrictionNodeType.VACCINATED)

test.only('Verb', () => {
  const i18n = new VueI18n({})
  const verbaliser = new Verbaliser([...matcher], i18n)
  console.log([...matcher])
  expect(verbaliser.narrate()).toBe('')
})

test('Verb', () => {
  const restriction = new OnlineApplication({ url: 'dadwa' })
  console.log(restriction.verbalize(i18n))
  expect(restriction.verbalize(i18n)).toBe('')
})
