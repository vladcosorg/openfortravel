export default {
  title: 'Questions & Answers',
  recentlyVisited: {
    question:
      "Can I be quarantined or denied entry to {destination} if I've been to other countries recently?",
    answer: {
      yes: "Yes, if you've visited {countries} in the last {days} days, you may be quarantined or denied entry to {destination}.",
      no: 'No, the {destination} authorities are not imposing any restrictions for the passengers, that have visited other countries recently.',
    },
  },
  canITravelToCountry: {
    question: 'Can I travel from {origin} to {destination}?',
    answer: {
      status: {
        allowed: `Yes, leisure travel from <strong>{origin}</strong> to <strong>{destination}</strong> is permitted .
          No PCR test or COVID-19 vaccine passport is needed upon arrival.
          `,
        forbidden:
          'No, entering the country by travellers from {origin} is not allowed.  The only exceptions are <strong>{nationality}</strong> or permanent residents.',
        conditional: {
          intro:
            'Yes, leisure travel from <strong>{origin}</strong> to <strong>{destination}</strong> is permitted ',
          testRequired: {
            true: ' but you need to present a negative PCR test.',
            false:
              ' and no PCR test or COVID-19 vaccine passport is needed upon arrival.',
          },
          quarantine:
            ' but you are required to self-isolate for {quarantine} days.',
          testOrQuarantine:
            ' but you need to provide a negative PCR test or self-isolate for {quarantine} days.',
        },
      },
      relatedRestrictions:
        'You may be denied entry if you have been to one of the <a href="{url}">following</a> countries in the last {days} days',
    },
  },
  return: {
    question:
      'Will I be able to return from <strong>{destination}</strong> to <strong>{origin}</strong> without any restrictions or quarantine?',
    answer: {
      yes: 'Yes, provided that you will be returning back to the <strong>{origin}</strong> with a direct flight from <strong>{destination}</strong>, you will not be denied entry or quarantined. ',
      no: 'No, you may have to quarantine yourself or pass a test upon returning regardless if you are a foreigner or a national.',
    },
  },
}
