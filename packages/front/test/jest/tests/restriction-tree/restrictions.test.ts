import { DidNotVisitCountries } from '@/shared/src/restriction-tree/restriction-node/did-not-visit-countries'
import { Origin } from '@/shared/src/restriction-tree/restriction-node/origin'
import { PcrTest } from '@/shared/src/restriction-tree/restriction-node/pcr-test'

describe('Origin', () => {
  test('Existing origin should return true', () => {
    const origin = new Origin({ allowedOrigins: ['us'] })
    expect(origin.matches('us')).toBe(true)
  })

  test('Missing origin should return false', () => {
    const origin = new Origin({ allowedOrigins: ['us'] })
    expect(origin.matches('uk')).toBe(false)
  })
})

describe('DidNotVisitCountries', () => {
  const visited = new DidNotVisitCountries({ countryCodes: ['us', 'uk', 'md'], days: 10 })
  test('Full match', () => {
    expect(visited.matches(['us', 'uk'])).toBe(false)
  })

  test('Partial match', () => {
    expect(visited.matches(['us', 'au'])).toBe(false)
  })

  test('No match', () => {
    expect(visited.matches(['au'])).toBe(true)
  })
})

describe('i18n config', () => {
  test('Restriction returns a i18n-vue compatible tuple', () => {
    const origin = new PcrTest({ hours: 1 })
    expect(origin.toI18nConfig()).toStrictEqual(['pcr-test', { hours: 1 }])
  })
})
