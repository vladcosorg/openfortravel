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
    intro: 'Travel from {origin} to {destination} ',
    status: {
      allowed:
        'is <b>@.lower:restriction.travel.value.allowed</b> without any restrictions. ',
      forbidden:
        'is <b>@.lower:restriction.travel.value.forbidden</b> with some exceptions. Please consult the country page for more info. ',
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
      label: 'COVID testing',
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
      // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
      value: (context: { named: (arg0: string) => number }) =>
        context.named('days') > 0 ? `${context.named('days')}` : 'Not needed',
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
  page: {
    destination: {
      title: 'Latest information on travelling from {origin} to {destination}',
      seeReturnPage: 'See return travel',
      backToList: 'Back to list',
    },
  },
  components: {
    theCountryList: {
      title: 'I want to travel',
      from: 'From',
      to: 'To',
      btn: 'Search',
    },
  },
}
