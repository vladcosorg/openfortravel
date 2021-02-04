module.exports = {
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
      travel: 'Travel from {origin} to {destination} ',
      return: 'Returning from <b>{origin}</b> to <b>{destination}</b>',
    },
    status: {
      allowed:
        'is <b translate="no">@.lower:restriction.travel.value.allowed</b> without any restrictions. ',
      forbidden:
        'is <b translate="no">@.lower:restriction.travel.value.forbidden</b> with some exceptions. Please consult the country page for more info. ',
      conditional:
        'is allowed with some conditions. Please consult the country page for more info.',
    },
    testing: {
      true: 'COVID test is required at entry.',
      false: 'COVID test is not required.',
    },
    insurance: {
      true:
        'Purchasing or owning an insurance that would cover COVID-19 treatment is necessary.',
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
      badgeValue: {
        allowed: 'Entry Allowed',
        forbidden: 'Entry Forbidden',
        conditional: 'Entry Conditional',
      },
    },
    testing: {
      label: 'COVID test',
      value: {
        true: 'Required',
        false: 'Not needed',
      },
      caption: {
        pcr: {
          true:
            'Medical certificate with a negative COVID-19 PCR test result issued within {hrs} hours prior to arrival.',
          false:
            'At this time you are not required to bring a COVID-19 PCR test certificate with you.',
        },
        proof: {
          true:
            'Alternatively, proof of having recovered from COVID-19 in the {days} days preceding travel is also accepted.',
        },
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
        true: 'Required',
        false: 'Not needed',
      },
      caption: {
        true:
          'You will have to fill and sign a declaration form upon arrival. It contains your contact information and your health indicators at the time of travel',
        false:
          'At this time the authorities are not requesting that you provide any additional health information upon arrival.',
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
          button: 'Show me destinations',
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
      destinations: 'To Destinations',
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
      breadcrumb: 'To {country}',
      title: 'Latest information on travelling from {origin} to {destination}',
      seeReturnPage: 'See return travel',
      backToList: 'Back to list',
      returnWay: 'Return way',
      fillDeclaration: 'Fill online',
    },
    notFound: {
      title: 404,
      subtitle: 'Oops. Nothing here...',
    },
  },
  components: {
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
      placeholder: 'Please select a country',
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
    countryCitizen: '{country} citizens',
    continents: {
      na: 'North America',
      eu: 'Europe',
      as: 'Asia',
      sa: 'South America',
      oc: 'Australia & Oceania',
      af: 'Africa',
    },
  },
  faq: {
    canITravelToCountry: {
      question: 'Can I travel from {origin} to {destination}?',
      answer: {
        allowed: `Yes, leisure travel from <strong>{origin}</strong> to <strong>{destination}</strong> is permitted .
          No PCR test or COVID-19 vaccine passport is needed upon arrival.
          <br><br>However please note that you may be required to abide some other regulations unrelated
          to coronavirus pandemic.<br>
          `,
        allowedSoon: 'Reopening soon',
        forbidden:
          'No, entering the country by travellers from {origin} is not allowed.  The only exceptions are <strong>{nationality}</strong> or permanent residents.',
        conditional: {
          intro:
            'Yes, you can travel for leisure from <strong>{origin}</strong> to <strong>{destination}</strong>',
          testRequired: ' but you need to present a negative PCR test.',
          quarantine:
            ' but you are required to self-isolate for {quarantine} days.',
          testOrQuarantine:
            ' but you need to provide a negative PCR test or self-isolate for {quarantine} days.',
        },
      },
    },
  },
}
