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
    travel: {
      label: 'Travel',
      value: {
        allowed: 'Allowed',
        forbidden: 'Forbidden',
        conditional: 'Conditional',
      },
    },
    testing: {
      label: 'COVID test',
      value: {
        true: 'Required',
        false: 'Not needed',
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
    },
  },
  meta: {
    title: 'Travel destinations during COVID-19 pandemic',
  },
  page: {
    index: {
      hero: 'Find out which destinations are open or reopening soon',
    },
    country: {
      route: 'travel/from',
      meta: {
        title: 'Travel destinations from {origin}',
      },
      quickSearch: 'Quick country search',
      destinations: 'Destinations',
      stats: {
        header: 'Quick stats',
        country: 'country|countries',
        values: {
          allowed: 'No limitations',
          conditional: 'Some limitations',
          forbidden: 'Entry forbidden',
        },
      },
    },
    destination: {
      route: 'to',
      meta: {
        title:
          'Latest information on travelling from {origin} to {destination}',
      },
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
    theCountryList: {
      title: 'I want to travel',
      titleIntro: 'I want to travel from',
      from: 'From',
      to: 'To',
      btn: 'Search',
    },
    subscribe: {
      action: 'Subscribe',
      actionDone: 'Subscribed',
      notification: 'You have been successfully subscribed',
      invalidEmailWarning: 'Please provide a valid email',
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
      placeholder: 'Please enter your email',
      close: 'Close',
    },
    destinationItem: {
      titleWithDirection: '{from} → {to}',
    },
    footer: {
      languages: 'Languages',
      copyright: 'Copyright 2020',
    },
  },
}
