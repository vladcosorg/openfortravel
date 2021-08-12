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
  restriction: {
    updated: {
      label: 'Updated {days} days ago',
    },
    travel: {
      label: 'Travel',
      value: {
        allowed: 'No restrictions',
        allowedSoon: 'Reopening soon',
        forbidden: 'Completely closed',
        conditional: 'Partially open',
      },
      caption: {
        intro: {
          forbidden: 'Some exceptions apply',
          allowed:
            'You might have to follow some procedures in order to cross the border. Please read below to inform yourself.',
          allowedSoon: '',
          conditional:
            'Please read carefully the information below in order to understant if you meet the requirements.',
        },
        relatedRestrictions:
          'You may be denied entry if you have been to one of the <a href="{url}">following</a> countries in the last {days} days.',
      },
      badgeValue: {
        allowed: 'Entry Allowed',
        forbidden: 'Entry Forbidden',
        conditional: 'Entry Conditional',
      },
    },
    testing: {
      label: 'Testing Required',
      extendedLabel: {
        pcrTest: 'Negative COVID-19 viral test',
        orRecoveryProof: ' or Recovery Proof',
      },
      value: {
        true: 'Required',
        false: 'Not needed',
      },
      caption: {
        pcr: {
          true: 'COVID-19 PCR, LAMP or antigent test result issued within <b>{hrs} hours</b> prior to arrival.',
          false:
            'At this time you are not required to bring a COVID-19 PCR test certificate with you.',
        },
        proof:
          'Alternatively, proof of having recovered from COVID-19 in the {days} days preceding travel is also accepted.',
        testOnArrival:
          'The test can be taken on arrival for an additional fee and quarantine awaiting for results. ',
      },
      badges: {
        onArrival: 'Test on arrival',
        recoveryCertificate: 'COVID-19 recovery certificate',
      },
    },
    insurance: {
      label: 'Additional Health Insurance',
      value: {
        true: 'Required',
        false: 'Not needed',
      },
    },
    selfIsolation: {
      label: 'Self-isolation',
      days: '{number} days',
      staticValue: {
        true: 'Required',
        false: 'Not needed',
      },
    },
    healthDeclaration: {
      label: 'Health Declaration',
      // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
      value: {
        online: 'Completed online before arrival',
        true: 'Yes',
        false: 'Not needed',
      },
      caption: {
        true: 'A completed Passenger Information Form must be presented upon arrival. Usually it is provided by the airlines upon boarding.',
        false:
          'At this time the authorities are not requesting that you provide any additional health information upon arrival.',
        online:
          'You must complete this form online before you arrive. <a target="_blank" href="{url}">Click here</a> to view the form.',
      },
    },
  },
  meta: {
    title: 'updated {date}',
    titleSuffix: 'COVID-19 flight & travel bans to foreign countries',
    description:
      'Get the latest recommendations for international travel from {country}. We provide info on all travel warnings, exceptions, lifted bans, closed borders and temporary flight restriction end dates. Be aware of any PCR tests and COVID-19 vaccine passports that may be required at the border.',
  },
  page: {
    index: {
      link: 'Home',
      route: 'from',
      sections: {
        hero: {
          title: 'COVID-19 travel ban info <br> for travellers from',
          subtitle: `Where can I travel during pandemic as a {country} citizen?<br> Do I
            need a COVID-19 vaccine passport at the border control?<br/> You’ve got
            questions - we’ve got answers!`,
          button: 'Explore destinations',
        },
        stats: {
          title: 'Destination statistics',
          types: {
            allowed: {
              title: '@:restriction.travel.value.allowed',
              valueSuffix:
                'countries have no travel restrictions <br> for <b>{nationality}</b>',
              description:
                'The country has no formal restrictions on entry by air, but is still monitoring the situation and may have other travel policies in place like mandatory testing or quarantines upon arrival.',
            },
            allowed_soon: {
              title: '@:restriction.travel.value.allowedSoon',
              valueSuffix:
                'countries are opening soon <br> for <b>{nationality}</b>',
              description:
                'The country has announced a specific date for reopening, but certain entry requirements may still apply.',
            },
            forbidden: {
              title: '@:restriction.travel.value.forbidden',
              valueSuffix:
                'countries are completely closed <br> for <b>{nationality}</b>',
              description:
                'Only citizens, residents returning home, or people in other special circumstances may enter the country.',
            },
            conditional: {
              title: '@:restriction.travel.value.conditional',
              valueSuffix:
                'countries are partially open <br> for <b>{nationality}</b>',
              description:
                'Entrance into the country may depend on the traveler’s citizenship, point of origin, or other specific regulations.',
            },
          },
          noChanges: 'no change from yesterday',
        },
        countries: {
          title: 'Explore restrictions from other countries',
        },
      },
      meta: {
        title:
          'COVID-19 flight & travel bans to foreign countries for {nationality}',
      },
    },
    privacy: {
      link: 'Privacy Policy',
      meta: {
        title: '@:page.privacy.link',
      },
    },
    terms: {
      link: 'Terms and Conditions',
      meta: {
        title: '@:page.terms.link',
      },
    },
    contact: {
      link: 'Contact Us',
      pageTitle: '@:page.contact.link',
      meta: {
        title: '@:page.contact.link',
      },
      messageField: 'Your message *',
      sendButton: 'Send message',
      messageSent: 'The message has been sent successfully',
    },
    country: {
      link: 'Destinations',
      route: 'travel/from',
      meta: {
        title:
          '{origin} COVID-19 Travel Restrictions and Bans Listed By Destination',
      },
      breadcrumb: 'From {country}',
      quickSearch: 'Quick country search',
      tab: {
        all: 'All regions',
      },
    },
    destination: {
      route: 'to',
      meta: {
        title:
          '{destination} travel restrictions from {origin}: flight restrictions, quarantine measures,  COVID-19 vaccine passport  and other entry requirements',
      },
      heading:
        'Travel restrictions for travelling from <b>{origin}</b> to <b>{destination}</b>',
      breadcrumb: 'To {country}',
      title: 'Latest information on travelling from {origin} to {destination}',
      seeReturnPage: 'See return travel',
      backToList: 'Back to list',
      returnWay: 'Return way',
      fillDeclaration: 'Fill online',
      widgets: {
        info: {
          title: 'Outgoing country resouces',
          returnTitle: 'Return country resouces',
          subtitle:
            '{country} official and non-official sources and references',
          none: 'No resources at the moment',
        },
        entryRequirements: {
          title: 'Personalized entry requirements',
          subtitle:
            'These restrictions are generated based on the information entered above.',
        },
        summary: {
          title: 'Summary',
          subtitle:
            'Make sure to read all the additional information listed on the page before making a decision',
        },
        faqIndex: { title: 'F.A.Q.' },
        faq: {
          title: 'Questions & Answers',
          subtitle: 'Got more questions? Contact us!',
        },
        stats: {
          title: 'COVID-19 confirmed cases',
          subtitle: 'in {country}',
          casesThisWeek: {
            title: 'new cases this week',
            subtitle: 'per 100.000 people',
          },
          trend: {
            title: {
              up: 'Up',
              down: 'Down',
              noChange: 'No change',
            },
            subtitle: 'from {count} per 100.000 people since last week',
          },
          riskLevel: {
            title: 'Infection risk',
            subtitle: 'according to Risk Assessment Level data from',
          },
        },
      },
    },
    notFound: {
      title: '404',
      subtitle: 'Oops. Nothing here...',
    },
  },
  components: {
    sharing: {
      title: 'Tell your friends about us',
      prefix: 'Share with',
    },
    drawer: {
      darkMode: 'Dark mode',
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
        title: 'COVID-19 Risk Level',
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
  },
  misc: {
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
  },
  faq: {
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
  },
  rt: {
    origin: {
      instruction: {
        heading: 'You must arrive to your destination from <b>{origin}</b>',
        subtitle: 'Alternatively, you can arrive from {sequence}',
      },
    },
    pcrTest: {
      instruction: {
        heading: 'Get a negative COVID-19 PCR test certificate',
        subtitle:
          'The test has to be issued within {hours} hours prior to arrival',
      },
    },
    didNotVisitCountries: {
      instruction: {
        heading:
          'Make sure that in the last {days} days you did not visit the countries from the red list',
        subtitle:
          "If you have been in or through any of the countries listed below in the previous {days} days, you don't meet the entry requirements from this section. <br><br> Banned countries: {sequence} ",
      },
    },
    onlineApplication: {
      instruction: {
        heading:
          'Fill an online-application prior to entry to your destination',
        subtitle:
          'Please <a target="_blank" href="{url}">follow this link</a> to complete the registration form and follow further instructions from that page',
      },
    },
    vaccinated: {
      instruction: {
        heading: 'Bring your certificate of vaccination',
        subtitle:
          'You must present at the border the certificate for full vaccination with an approved vaccine against COVID-19 ',
      },
    },
    citizenship: {
      instruction: {
        heading: 'You are a national or a resident of <b>{country}</b>',
        subtitle: '{sequence}',
      },
    },
  },
}
