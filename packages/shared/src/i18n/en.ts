import components from './en/components'
import faq from './en/faq'
import misc from './en/misc'
import page from './en/page'
import restriction from './en/restriction'
import rt from './en/rt'

export default {
  rs: {
    forbidden: [
      'Tourists arriving from <i id="origin">Moldova</i>, are prohibited from entering.',
    ],
    noRestrictions: [
      'Tourists arriving from <i id="origin">Moldova</i> are allowed to enter without restriction, according to the embassy.',
      'For now, the country is open without restrictions.',
      'The citizens  are allowed to enter without restriction, according to the U.S. Embassy in Colombia.',
      'The country is open with no testing and no quarantine mandate.',
    ],
    onlyVaccinated: [
      'Visitors to the <i id="destination">Moldova</i> who have been vaccinated can enter without restriction, but may be selected for random testing on arrival. ',
      'The country is open to <i id="origin">Moldova</i> citizens and permanent residents who currently reside in <i id="origin">Moldova</i> if they have proof of full vaccination.',
      'Travelers with proof of vaccination may enter without restriction. ',
      'Those with proof of full vaccination  do not need to be tested or quarantined.',
      'Travelers with proof of vaccination may enter without restriction.',
      'People who have been vaccinated do not need to test. No other restrictions upon arrival.',
      'Travelers are asked to present proof of being vaccinated, no other restrictions are in force.',
      'Vaccinated passengers who have completed their full vaccinations before traveling, may enter without testing or quarantine.',
    ],
    onlyVaccinatedAndTestedBeforeFlight: [
      'Those who are fully vaccinated need to provide either a negative test taken before arrival.',
      'Adult visitors may enter with proof of full vaccination and a coronavirus test taken before the flight.',
      'Vaccinated tourists traveling to <i id="destination">Moldova</i> will need proof of a negative pretest before arrival.',
      'Vaccinated citizens of <i id="destination">Moldova</i> are allowed to enter by air with proof of a negative test performed before arrival. ',
    ],
    onlyVaccinatedAndTestedAfterFlightWithQuarantine: [
      'Those who are fully vaccinated need to provide either a negative test taken before arrival. They will be given a test upon arrival, and need to quarantine until a negative result is received.',
    ],
    onlyVaccinatedAndTestedBeforeAfterFlightWithQuarantine: [
      'Travelers need a negative test taken before arrival, and an additional test will be given on arrival. Travelers must stay on the property of their accommodation until they receive a negative result.',
    ],
    onlyVaccinatedAndQuarantine: ['onlyVaccinatedAndQuarantine'],
    onlyTestedBeforeFlight: [
      '<i id="destination">Moldova</i> is requiring all visitors, whether they are vaccinated or not, to have a negative result to a coronavirus test before departure',
      'Entry by air is permitted and visitors are required to present a negative test taken before arrival.',
      'Visitors must present a negative test upon arrival, regardless of vaccination status.',
      'Passengers must have a negative laboratory test taken before their flight.',
      'Adults traveling to <i id="destination">Moldova</i>, whether fully vaccinated or not, will need proof of a negative pretest before arrival.',
      'Air travelers must provide a certificate of a negative test taken before arrival',
      'Before departure for <i id="destination">Moldova</i>, passengers must peform a coronavirus test with a negative result. ',
      'Regardless of vaccination status, visitors must show a negative test taken before travel.',
    ],
    onlyTestedBeforeFlightWithQuarantine: [
      'A negative coronavirus test is required to enter, followed by a quarantine for tourists.',
      'Visitors must have a negative PCR test taken before departure. A mandatory quarantine is required after arrival.',
    ],
    onlyTestedAfterFlightWithQuarantine: [
      'No coronavirus pretest is required for entry, but a rapid test will be given upon arrival.',
    ],
    onlyTestedBeforeAndAfterFlightWithQuarantine: [
      'Travelers must arrive with proof of a negative coronavirus test. Another test will be given at the airport and people must self-quarantine until they receive a negative result.',
      'Visitors from <i id="destination">Moldova</i> may enter with proof of a negative test taken before departure, and will also be given a test upon landing.',
      'Visitors must have proof of a negative virus test taken before boarding their flight for <i id="destination">Moldova</i>. Upon landing, travelers are given another test. ',
    ],
    onlineApplication: [
      'Additionally, they will have to complete a Passenger Locator Form and submit to health screenings at the airport.',
      'Travelers must also fill out a Travel Registration Form and abide by screenings to enter.',
    ],
    insurance: {
      vaccinated: [],
      unvaccinated: [
        'All visitors must purchase mandatory insurance.',
        'Proof of health insurance is required.',
        'Visitors must have health insurance that covers illness from the coronavirus.',
        'Mandatory insurance that covers medical and other expenses related to the coronavirus is required for unvaccinated tourists.',
      ],
    },

    vaccinated: {
      noRestrictions: [],
      testing: {
        true: [
          'Travelers with proof of vaccination and those who have a doctor’s certificate saying that they have recovered from Covid-19 in the previous 14 to 180 days may enter without restriction. ',
        ],
        false: [
          'Vaccinated visitors can enter with just a test taken 72 hours before arrival. ',
        ],
      },
      quarantine: {
        true: [
          'A 10-day quarantine for all arriving visitors is also required.',
        ],
        false: [
          'There are no quarantine requirements nor travel restrictions within the country.',
          'Once in <i id="destination">Moldova</i> , there are no quarantine requirements for <i id="country">Moldova</i> citizens, curfews or restrictions on interstate travel. ',
          'Vaccinated travelers can bypass quarantine',
          'Once in the country, you will be subject to temperature testing but won’t be required to quarantine.',
        ],
      },
    },

    readmore: [
      'For more information, visit the <i id="link">this page</i>.',
      'Visit this page to learn more about <i id="destination">Moldova\'s</i> entry and exit requirements.',
      'Visit the <i id="link"><i id="destination">Moldova\'s</i> travel restrictions page</i> for more information regarding traveling during the pandemic.',
      'Additional information is available on the <i id="destination">Moldova\'s</i>  <i id="link">travel restrictions page</i>, which outlines specifics for travelers.',
      'Keep tabs on updates via <i id="link">this information page</i>.',
      'For the most up to date information, visit <i id="link">this page</i>.',
      'Go to <i id="link">this page</i> for the most up-to-date information.',
      'For more information, head to <i id="link">this page</i>.',
      'Learn more by visiting <i id="link">this page</i>.',
      'The latest visitor information is available <i id="link">here</i>.',
      'Learn more about protocols in <i id="destination">Moldova</i> on <i id="link">this page</i>.',
      'Learn more about the current  <i id="destination">Moldova</i> COVID-19 protocols on <i id="link">this page</i>.',
      'Find out more on the  <i id="link"><i id="destination">Moldova</i> entry protocol page</i>.',
      'See up-to-date information on the <i id="link"><i id="destination">Moldova\'s</i> travel restriction page</i>.',
      'Learn more about the rules applying to specific travelers on <i id="link">this page</i>.',
      'For the latest information, visit <i id="link"><i id="destination">Moldova\'s</i> travel restriction page</i>.',
      'Learn more on the dedicated <i id="link"><i id="destination">Moldova\'s</i> travel restriction page</i>.',
      'Stay up to date on the regulations by visiting <i id="link">this page</i>.',
      'For more information about <i id="destination">Moldova</i> policies, visit <i id="link">this page</i>.',
      'Visit the <i id="link"><i id="destination">Moldova\'s</i> travel restriction page</i> for more travel specifics.',
      'The <i id="link"><i id="destination">Moldova\'s</i> travel restriction page</i> is frequently updated with information regarding entry.',
    ],
  },

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
      return:
        'Returning from <b id="country">{origin}</b> to <b id="country">{destination}</b>',
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
