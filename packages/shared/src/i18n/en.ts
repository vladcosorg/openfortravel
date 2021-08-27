import components from './en/components'
import faq from './en/faq'
import misc from './en/misc'
import page from './en/page'
import restriction from './en/restriction'
import rt from './en/rt'

export default {
  status: {
    allowed: 'Allowed',
    forbidden: 'Forbidden',
    conditional: 'Conditional',
  },

  intro: {
    title: 'I want to travel',
    btn: 'Search',
  },
  description: {
    intro: {
      travel: 'Travel from {origin} to {destination}',
      return: 'Returning from <b>{origin}</b> to <b>{destination}</b>',
    },
    status: {
      allowed: 'is allowed without any restrictions. ',
      forbidden:
        'is forbidden with some exceptions. Please consult the country page for more info. ',
      conditional:
        'is allowed with some conditions. Please consult the country page for more info.',
    },
    testing: {
      true: 'COVID test is required at entry.',
      false: 'COVID test is not required.',
    },
    insurance: {
      true: 'Purchasing or owning an insurance that would cover COVID-19 treatment is necessary.',
      false: '',
    },
  },
  restriction,
  meta: {
    title: 'updated {date}',
    titleSuffix: 'COVID-19 flight & travel bans to foreign countries',
    description:
      'Get the latest recommendations for international travel from {country}. We provide info on all travel warnings, exceptions, lifted bans, closed borders and temporary flight restriction end dates. Be aware of any PCR tests and COVID-19 vaccine passports that may be required at the border.',
  },
  page,
  components,
  misc,
  faq,
  rt,
}
