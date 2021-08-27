export default {
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
}
