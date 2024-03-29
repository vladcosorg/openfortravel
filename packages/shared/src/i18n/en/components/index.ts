export default {
  sharing: {
    title: 'Tell your friends about us',
    prefix: 'Share with',
  },
  drawer: {
    darkMode: 'Dark mode',
  },
  breadcrumbs: {
    homeLabel: 'Homepage',
  },
  requiredLanguages: {
    languageList:
      'This document must be presented in <i id="langs">English and Romanian</i>.',
    noInfo: `Currently there is no info if the document has to be presented in original
    or has to be translated to the local language. Please check with the
    embassy.`,
  },
  issuerSection: {
    yes: `Currently, <i id="country">Austria</i> accepts this document,
          if it is issued by <i id="issuers">Austria and Bulgaria</i>`,
    no: 'It is not specified whether <i id="country">Austria</i> has any requirements regarding the issuing country of this document.',
  },
  form: {
    input: {
      emptyField: 'This field should not be empty',
    },
    email: {
      placeholder: 'Your email',
      invalidEmail: 'Please provide a valid email',
    },
  },
  theCountryList: {
    title: 'I want to travel',
    titleIntro: 'Or try another country',
    from: 'From',
    to: 'To',
    btn: 'Search',
    placeholder: 'Please select a country from the list',
  },
  subscribe: {
    action: 'Subscribe',
    actionDone: 'Subscribed',
    notification: 'You have been successfully subscribed',
    title: 'Subscribe for notifications',

    subtitle: {
      origin:
        'Get notified when any restrictions are added or liften to any destinations from {origin}',
      destination: {
        isForbidden:
          'Get notified once the restrictions are lifted on the route {origin} → {destination}',
        isAllowed:
          'Get notified in case of any travel restrictions on the route {origin} → {destination}',
      },
    },

    close: 'Close',
  },
  destinationItem: {
    titleWithDirection: '{from} → {to}',
    readMore: 'Read more',
    ssrAttrTitle: 'See COVID-19 travel restrictions to {to}',
    ssrTitle: 'Travel restrictions for travel from {from} to {to}',
    riskLevel: {
      title: 'Infection risk',
      values: {
        'no-data': 'No data',
        low: 'Low',
        moderate: 'Moderate',
        high: 'High',
        'very-high': 'Very high',
      },
    },
  },
  footer: {
    languages: 'Languages',
    lastUpdated: 'Last updated on <br><b>{date}</b>',
    disclaimer:
      'Our website offers up-to-date information on flight restrictions,  travel bans, quarantine measures,  COVID-19 vaccine passport and other entry requirements, border closures due to coronavirus pandemic. We do our best to keep the information update but let us know if something needs correction.  Wherever you’re flying from, please always check government advice before booking.',
  },
}
