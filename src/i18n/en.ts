export default {
  status: {
    allowed: 'Allowed',
    forbidden: 'Forbidden',
    conditional: 'Conditional',
  },
  intro: {
    title: 'I want to travel from',
    btn: 'Search',
  },
  description: {
    intro: 'Travel from {origin} to {destination} ',
    status: {
      allowed: 'is <b>@.lower:status.allowed</b> without any restrictions. ',
    },
    testing: {
      true: 'COVID test is required at entry.',
      false: 'COVID test is not required.',
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
  },
}
