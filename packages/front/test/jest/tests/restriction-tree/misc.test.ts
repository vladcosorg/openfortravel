import { getCountryList } from '@/front/test/jest/tests/helpers'
import { generateCountryAndAreaSequence } from '@/shared/src/restriction-tree/misc'

describe('Country sequence generation', () => {
  test('A list of countries should return a normal comma separated sequence', () => {
    expect(
      generateCountryAndAreaSequence(['fr', 'it', 'ro'], getCountryList()),
    ).toStrictEqual('France, Italy and Romania')
  })
  test('A list with a single item should return plain label', () => {
    expect(
      generateCountryAndAreaSequence(['fr'], getCountryList()),
    ).toStrictEqual('France')
  })
  test('A list with no items should return an empty string', () => {
    expect(generateCountryAndAreaSequence([], getCountryList())).toStrictEqual(
      '',
    )
  })
  test('A large list should get truncated', () => {
    expect(
      generateCountryAndAreaSequence(
        Object.keys(getCountryList()),
        getCountryList(),
        {
          compact: false,
        },
      ),
    ).toStrictEqual(
      'Afghanistan, Albania, Algeria, American Samoa, Andorra, Angola, Anguilla, Antarctica, Antigua and Barbuda, Argentina and 240 more countries',
    )
  })
  test('A large list with compactable codes should get truncated and compacted', () => {
    expect(
      generateCountryAndAreaSequence(
        Object.keys(getCountryList()),
        getCountryList(),
      ),
    ).toStrictEqual(
      'eea, schengen, eu, Afghanistan, Albania, Algeria, American Samoa, Andorra, Angola, Anguilla, Antarctica and 211 more countries',
    )
  })
})
