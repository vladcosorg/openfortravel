import type { StatCategory } from '@/front/src/modules/stats/model'

export default {
  or: 'or',
  and: 'and',
  collapsedSequence: 'other {count} countries',
  countryCitizen: '{country} citizens',
  continents: {
    na: 'North America',
    eu: 'Europe',
    as: 'Asia',
    sa: 'South America',
    oc: 'Australia & Oceania',
    af: 'Africa',
    an: 'Antarctica',
  },
  zones: {
    eea: 'EEA',
    schengen: 'SCHENGEN',
    eu: 'EU',
  },
  stats: {
    suffix: 'countries',
    categories: {
      open: {
        title: 'No restrictions',
        shortSubtitle: 'No COVID test or quarantine upon arrival',
        longSuffix: 'countries that have no COVID-related restrictions',
        longSubtitle:
          'These countries have no formal restrictions on entry but may perfrom random temperature checks and other tests on entry.',
      },
      quarantine: {
        title: 'Quarantine Required',
        shortSubtitle: 'You have to self-isolate for a number of days.',
        longSuffix: 'countries where you have to self-isolate upon arrival',
        longSubtitle:
          'This group of countries requires all arriving passengers to self-isolate for a certain number of days. Visit the country page to find out how many days and if you can shorten the quarantine period.',
      },
      test: {
        title: 'COVID Test Required',
        shortSubtitle: 'You need to take a COVID test before arrival.',
        longSuffix: 'countries that require COVID test upon arrival',
        longSubtitle:
          'These destination require that you provide proof of having taken a COVID test that shows negative result. Find out about the types of allowed tests, if you can take it upon arrival and other rules on the country page.',
      },
      forbidden: {
        title: 'Completely closed',
        shortSubtitle: 'No COVID test or quarantine upon arrival',
        longSuffix:
          'countries that forbid entry for your category of passengers',
        longSubtitle:
          'Only citizens, residents returning home, or people in other special circumstances may enter the country.',
      },
    } as { [K in StatCategory]: unknown },
  },
}
